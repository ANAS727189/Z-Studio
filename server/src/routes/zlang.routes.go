package routes

import (
	"net/http"

	"zstudio/server/src/controllers"
	"zstudio/server/src/middlewares"
	"zstudio/server/src/services"
)

func RegisterZLangRoutes(mux *http.ServeMux, controller *controllers.ZLangController, limiter *services.FixedWindowLimiter) {
	compileHandler := middlewares.Chain(
		http.HandlerFunc(controller.CompileZLang),
		middlewares.RateLimit(limiter, "Too many Z-- lang compile requests. Please try again in a minute."),
	)
	mux.Handle("POST /api/zlang/compile", compileHandler)
}
