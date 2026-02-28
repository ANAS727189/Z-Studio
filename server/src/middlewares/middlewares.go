package middlewares

import (
	"log"
	"net"
	"net/http"
	"strings"
	"time"

	"zstudio/server/src/httpx"
	"zstudio/server/src/services"
)

type Middleware func(http.Handler) http.Handler

func Chain(handler http.Handler, middlewares ...Middleware) http.Handler {
	wrapped := handler
	for i := len(middlewares) - 1; i >= 0; i-- {
		wrapped = middlewares[i](wrapped)
	}
	return wrapped
}

func Recover(logger *log.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if rec := recover(); rec != nil {
					httpx.WriteError(w, httpx.AppError{
						Status:  http.StatusInternalServerError,
						Message: "Internal Server Error",
					})
					if logger != nil {
						logger.Printf("panic: %v", rec)
					}
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func Logger(logger *log.Logger) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if logger == nil {
				next.ServeHTTP(w, r)
				return
			}

			start := time.Now()
			lrw := &loggingResponseWriter{ResponseWriter: w}
			next.ServeHTTP(lrw, r)

			status := lrw.statusCode
			if status == 0 {
				status = http.StatusOK
			}

			logger.Printf("%s %s %d %s", r.Method, r.URL.Path, status, time.Since(start).Round(time.Millisecond))
		})
	}
}

func SecurityAndCORS(corsOrigin string) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			setSecurityHeaders(w.Header())
			applyCORS(w.Header(), corsOrigin)

			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func RateLimit(limiter *services.FixedWindowLimiter, message string) Middleware {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if limiter != nil && !limiter.Allow(clientIdentifier(r)) {
				httpx.WriteJSON(w, http.StatusTooManyRequests, map[string]any{
					"success": false,
					"error":   message,
				})
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

type loggingResponseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
	lrw.statusCode = code
	lrw.ResponseWriter.WriteHeader(code)
}

func (lrw *loggingResponseWriter) Write(b []byte) (int, error) {
	if lrw.statusCode == 0 {
		lrw.statusCode = http.StatusOK
	}
	return lrw.ResponseWriter.Write(b)
}

func setSecurityHeaders(header http.Header) {
	header.Set("Cross-Origin-Opener-Policy", "same-origin")
	header.Set("Referrer-Policy", "no-referrer")
	header.Set("X-Content-Type-Options", "nosniff")
	header.Set("X-DNS-Prefetch-Control", "off")
	header.Set("X-Download-Options", "noopen")
	header.Set("X-Frame-Options", "SAMEORIGIN")
	header.Set("X-Permitted-Cross-Domain-Policies", "none")
	header.Set("X-XSS-Protection", "0")
}

func applyCORS(header http.Header, corsOrigin string) {
	allowedOrigin := strings.TrimSpace(corsOrigin)
	if allowedOrigin == "" {
		allowedOrigin = "*"
	}

	if allowedOrigin == "*" {
		header.Set("Access-Control-Allow-Origin", "*")
	} else {
		header.Set("Access-Control-Allow-Origin", allowedOrigin)
		header.Set("Vary", "Origin")
	}

	header.Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
	header.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func clientIdentifier(r *http.Request) string {
	if forwardedFor := r.Header.Get("X-Forwarded-For"); forwardedFor != "" {
		parts := strings.Split(forwardedFor, ",")
		if len(parts) > 0 {
			candidate := strings.TrimSpace(parts[0])
			if candidate != "" {
				return candidate
			}
		}
	}

	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err == nil && host != "" {
		return host
	}
	return r.RemoteAddr
}
