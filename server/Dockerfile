# Stage 1: Prepare compiler
FROM node:18 AS compiler-builder

WORKDIR /app/Compiler

COPY Compiler/package*.json ./
RUN npm ci

COPY Compiler ./

# Stage 2: Build Go server
FROM golang:1.22 AS go-builder

WORKDIR /app/server

COPY server/go.mod ./go.mod
COPY server/src ./src

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o /app/bin/zstudio-server ./src/main.go

# Stage 3: Runtime
FROM node:18-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      llvm \
      ca-certificates \
 && update-ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=go-builder /app/bin/zstudio-server /app/zstudio-server
COPY --from=compiler-builder /app/Compiler /app/Compiler

ENV COMPILER_PATH=/app/Compiler/src/index.js

CMD ["/app/zstudio-server"]