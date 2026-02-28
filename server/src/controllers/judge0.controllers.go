package controllers

import (
	"net/http"

	"zstudio/server/src/httpx"
	"zstudio/server/src/schema"
	"zstudio/server/src/services"
)

type Judge0Controller struct {
	Service *services.Judge0Service
}

func NewJudge0Controller(service *services.Judge0Service) *Judge0Controller {
	return &Judge0Controller{Service: service}
}

func (c *Judge0Controller) CompileCode(w http.ResponseWriter, r *http.Request) {
	body, err := httpx.ReadJSONBody(r)
	if err != nil {
		httpx.WriteError(w, httpx.AppError{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	compilePayload, validationError := schema.ValidateJudge0Payload(body)
	if validationError != "" {
		httpx.WriteJSON(w, http.StatusBadRequest, map[string]any{
			"success": false,
			"error":   validationError,
		})
		return
	}

	output, err := c.Service.CompileWithJudge0(r.Context(), compilePayload)
	if err != nil {
		httpx.WriteError(w, httpx.AppError{Status: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	httpx.WriteJSON(w, http.StatusOK, map[string]any{
		"success": true,
		"output":  output,
	})
}

func (c *Judge0Controller) CheckJudge0Status(w http.ResponseWriter, r *http.Request) {
	data, err := c.Service.CheckSystemInfo(r.Context())
	if err != nil {
		httpx.WriteError(w, httpx.AppError{Status: http.StatusInternalServerError, Message: err.Error()})
		return
	}

	httpx.WriteJSON(w, http.StatusOK, map[string]any{
		"success": true,
		"data":    data,
	})
}
