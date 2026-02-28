package main

import (
	"errors"
	"log"
	"net/http"

	"zstudio/server/src/app"
	"zstudio/server/src/config"
)

func main() {
	if err := config.LoadDotEnv(".env"); err != nil {
		log.Printf("failed loading .env: %v", err)
	}

	cfg := config.Load()
	handler := app.New(cfg, log.Default())

	server := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: handler,
	}

	log.Printf("Server is running on port %s", cfg.Port)
	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err)
	}
}
