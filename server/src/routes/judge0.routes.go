package routes

import (
	"net/http"

	"zstudio/server/src/controllers"
	"zstudio/server/src/middlewares"
	"zstudio/server/src/services"
)

func RegisterJudge0Routes(mux *http.ServeMux, controller *controllers.Judge0Controller, limiter *services.FixedWindowLimiter) {
	compileHandler := middlewares.Chain(
		http.HandlerFunc(controller.CompileCode),
		middlewares.RateLimit(limiter, "Too many requests, please try again later."),
	)
	mux.Handle("POST /api/judge0/compile", compileHandler)

	systemInfoHandler := middlewares.Chain(
		http.HandlerFunc(controller.CheckJudge0Status),
		middlewares.RateLimit(limiter, "Too many requests, please try again later."),
	)
	mux.Handle("GET /api/judge0/system-info", systemInfoHandler)
}
