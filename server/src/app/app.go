package app

import (
	"log"
	"net/http"
	"time"

	"zstudio/server/src/config"
	"zstudio/server/src/controllers"
	"zstudio/server/src/middlewares"
	"zstudio/server/src/routes"
	"zstudio/server/src/services"
)

func New(cfg config.Config, logger *log.Logger) http.Handler {
	if logger == nil {
		logger = log.Default()
	}

	mux := http.NewServeMux()

	outboundLimiter := services.NewOutboundRateLimiter(
		cfg.MaxRequests,
		time.Duration(cfg.MaxMilliseconds)*time.Millisecond,
		cfg.MaxRPS,
	)

	judge0Service := services.NewJudge0Service(
		cfg.Judge0BaseURI,
		cfg.RapidAPIKey,
		cfg.RapidAPIURI,
		outboundLimiter,
	)
	zlangService := services.NewZLangService(cfg.CompilerPath)

	judge0Controller := controllers.NewJudge0Controller(judge0Service)
	zlangController := controllers.NewZLangController(zlangService)

	judge0Limiter := services.NewFixedWindowLimiter(
		time.Duration(cfg.WindowMS)*time.Millisecond,
		cfg.MaxWindowMS,
	)
	zlangLimiter := services.NewFixedWindowLimiter(
		time.Duration(cfg.WindowMS)*time.Millisecond,
		cfg.MaxWindowMS,
	)

	routes.RegisterBaseRoutes(mux)
	routes.RegisterJudge0Routes(mux, judge0Controller, judge0Limiter)
	routes.RegisterZLangRoutes(mux, zlangController, zlangLimiter)

	return middlewares.Chain(
		mux,
		middlewares.Recover(logger),
		middlewares.Logger(logger),
		middlewares.SecurityAndCORS(cfg.CORSOrigin),
	)
}
