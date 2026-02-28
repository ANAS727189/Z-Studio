package services

import (
	"context"
	"sync"
	"time"
)

type FixedWindowLimiter struct {
	window  time.Duration
	max     int
	mu      sync.Mutex
	entries map[string]*windowEntry
}

type windowEntry struct {
	count   int
	resetAt time.Time
}

func NewFixedWindowLimiter(window time.Duration, max int) *FixedWindowLimiter {
	if window <= 0 || max <= 0 {
		return nil
	}
	return &FixedWindowLimiter{
		window:  window,
		max:     max,
		entries: make(map[string]*windowEntry),
	}
}

func (l *FixedWindowLimiter) Allow(key string) bool {
	if l == nil {
		return true
	}

	now := time.Now()
	l.mu.Lock()
	defer l.mu.Unlock()

	entry, exists := l.entries[key]
	if !exists || now.After(entry.resetAt) {
		l.entries[key] = &windowEntry{
			count:   1,
			resetAt: now.Add(l.window),
		}
		return true
	}

	if entry.count >= l.max {
		return false
	}

	entry.count++
	return true
}

type OutboundRateLimiter struct {
	maxRequests int
	period      time.Duration
	maxRPS      int

	mu         sync.Mutex
	periodHits []time.Time
	rpsHits    []time.Time
}

func NewOutboundRateLimiter(maxRequests int, period time.Duration, maxRPS int) *OutboundRateLimiter {
	if (maxRequests <= 0 || period <= 0) && maxRPS <= 0 {
		return nil
	}

	return &OutboundRateLimiter{
		maxRequests: maxRequests,
		period:      period,
		maxRPS:      maxRPS,
		periodHits:  make([]time.Time, 0, maxRequests+1),
		rpsHits:     make([]time.Time, 0, maxRPS+1),
	}
}

func (l *OutboundRateLimiter) Wait(ctx context.Context) error {
	if l == nil {
		return nil
	}

	for {
		now := time.Now()

		l.mu.Lock()
		l.periodHits = pruneHits(l.periodHits, now.Add(-l.period))
		l.rpsHits = pruneHits(l.rpsHits, now.Add(-time.Second))

		allowed := true
		waitUntil := time.Time{}

		if l.maxRequests > 0 && l.period > 0 && len(l.periodHits) >= l.maxRequests {
			allowed = false
			waitUntil = l.periodHits[0].Add(l.period)
		}

		if l.maxRPS > 0 && len(l.rpsHits) >= l.maxRPS {
			allowed = false
			candidate := l.rpsHits[0].Add(time.Second)
			if waitUntil.IsZero() || candidate.After(waitUntil) {
				waitUntil = candidate
			}
		}

		if allowed {
			l.periodHits = append(l.periodHits, now)
			l.rpsHits = append(l.rpsHits, now)
			l.mu.Unlock()
			return nil
		}

		delay := time.Until(waitUntil)
		if delay < 10*time.Millisecond {
			delay = 10 * time.Millisecond
		}
		l.mu.Unlock()

		timer := time.NewTimer(delay)
		select {
		case <-ctx.Done():
			if !timer.Stop() {
				<-timer.C
			}
			return ctx.Err()
		case <-timer.C:
		}
	}
}

func pruneHits(times []time.Time, cutoff time.Time) []time.Time {
	index := 0
	for index < len(times) && !times[index].After(cutoff) {
		index++
	}
	if index == 0 {
		return times
	}
	return append([]time.Time(nil), times[index:]...)
}
