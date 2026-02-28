package routes

import (
	"net/http"

	"zstudio/server/src/httpx"
)

func RegisterBaseRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /health-123", func(w http.ResponseWriter, r *http.Request) {
		httpx.WriteJSON(w, http.StatusOK, map[string]any{
			"status": "ok",
		})
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		httpx.WriteJSON(w, http.StatusNotFound, map[string]any{
			"success": false,
			"error":   "Route not found",
		})
	})
}
