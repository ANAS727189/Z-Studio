package httpx

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strings"
)

type AppError struct {
	Status      int
	Message     string
	Logs        string
	Suggestions string
}

func WriteJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func WriteError(w http.ResponseWriter, appErr AppError) {
	status := appErr.Status
	if status == 0 {
		status = http.StatusInternalServerError
	}

	message := strings.TrimSpace(appErr.Message)
	if message == "" {
		message = "Internal Server Error"
	}

	WriteJSON(w, status, map[string]any{
		"success":     false,
		"error":       message,
		"logs":        appErr.Logs,
		"suggestions": appErr.Suggestions,
	})
}

func ReadJSONBody(r *http.Request) (map[string]any, error) {
	defer r.Body.Close()

	decoder := json.NewDecoder(io.LimitReader(r.Body, 2<<20))
	decoder.UseNumber()

	var body map[string]any
	if err := decoder.Decode(&body); err != nil {
		return nil, err
	}

	var extra any
	if err := decoder.Decode(&extra); !errors.Is(err, io.EOF) {
		return nil, errors.New("invalid JSON body")
	}

	if body == nil {
		body = make(map[string]any)
	}
	return body, nil
}
