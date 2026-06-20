package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"zstudio/server/src/schema"
)

type Judge0Service struct {
	HTTPClient       *http.Client
	OutboundLimiter  *OutboundRateLimiter
	Judge0BaseURI    string
	RapidAPIKey      string
	RapidAPIHostName string
}

func NewJudge0Service(baseURI, apiKey, apiHost string, outboundLimiter *OutboundRateLimiter) *Judge0Service {
	return &Judge0Service{
		HTTPClient: &http.Client{
			Timeout: 60 * time.Second,
		},
		OutboundLimiter:  outboundLimiter,
		Judge0BaseURI:    baseURI,
		RapidAPIKey:      apiKey,
		RapidAPIHostName: apiHost,
	}
}

func (s *Judge0Service) CompileWithJudge0(ctx context.Context, payload schema.Judge0CompilePayload) (any, error) {
	if s.OutboundLimiter != nil {
		if err := s.OutboundLimiter.Wait(ctx); err != nil {
			return nil, err
		}
	}

	url := fmt.Sprintf("%s/submissions?base64_encoded=false&wait=true", strings.TrimRight(s.Judge0BaseURI, "/"))
	// fmt.Printf("URL: %s\n", url)
	// fmt.Printf("Payload: %+v\n", payload)
	// fmt.Printf("Host: %s\n", s.RapidAPIHostName)
	return s.doRequest(ctx, http.MethodPost, url, payload)
}

func (s *Judge0Service) CheckSystemInfo(ctx context.Context) (any, error) {
	url := fmt.Sprintf("%s/about", strings.TrimRight(s.Judge0BaseURI, "/"))
	return s.doRequest(ctx, http.MethodGet, url, nil)
}

func (s *Judge0Service) doRequest(ctx context.Context, method, url string, payload any) (any, error) {
	var body io.Reader
	if payload != nil {
		requestBody, err := json.Marshal(payload)
		if err != nil {
			return nil, err
		}
		body = bytes.NewReader(requestBody)
	}

	req, err := http.NewRequestWithContext(ctx, method, url, body)
	if err != nil {
		return nil, err
	}
	req.Header.Set("x-rapidapi-key", s.RapidAPIKey)
	req.Header.Set("x-rapidapi-host", s.RapidAPIHostName)
	req.Header.Set("Content-Type", "application/json")

	resp, err := s.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode >= http.StatusBadRequest {
	return nil, fmt.Errorf(
		"Judge0 error: status=%d body=%s",
		resp.StatusCode,
		string(responseBody),
	)
}

	if len(responseBody) == 0 {
		return map[string]any{}, nil
	}

	var data any
	if err := json.Unmarshal(responseBody, &data); err != nil {
		return string(responseBody), nil
	}
	return data, nil
}
