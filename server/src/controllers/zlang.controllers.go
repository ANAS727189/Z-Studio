package controllers

import (
	"net/http"

	"zstudio/server/src/httpx"
	"zstudio/server/src/schema"
	"zstudio/server/src/services"
)

type ZLangController struct {
	Service *services.ZLangService
}

func NewZLangController(service *services.ZLangService) *ZLangController {
	return &ZLangController{Service: service}
}

func (c *ZLangController) CompileZLang(w http.ResponseWriter, r *http.Request) {
	body, err := httpx.ReadJSONBody(r)
	if err != nil {
		httpx.WriteError(w, httpx.AppError{Status: http.StatusBadRequest, Message: err.Error()})
		return
	}

	code, validationError := schema.ValidateZLangPayload(body)
	if validationError != "" {
		httpx.WriteJSON(w, http.StatusBadRequest, map[string]any{
			"success": false,
			"error":   validationError,
		})
		return
	}

	compilerOutput, programOutput, compileErr := c.Service.Run(code)
	if compileErr != nil {
		httpx.WriteJSON(w, http.StatusBadRequest, map[string]any{
			"success":     false,
			"error":       compileErr.Message,
			"logs":        compileErr.Logs,
			"suggestions": compileErr.Suggestions,
		})
		return
	}

	httpx.WriteJSON(w, http.StatusOK, map[string]any{
		"success":        true,
		"compilerOutput": compilerOutput,
		"programOutput":  programOutput,
	})
}
