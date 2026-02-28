# Stage 1: Build compiler dependencies and llvm-bindings
FROM node:18 AS compiler-builder

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      llvm-dev \
      python3 \
      make \
      g++ \
      cmake \
      libnode-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app/Compiler
COPY Compiler/package.json ./package.json
COPY Compiler/package-lock.json ./package-lock.json
RUN npm ci --ignore-scripts

RUN mkdir -p /root/.cmake-js/node-x64/v18.20.8/include/node && \
    cp /usr/include/node/node_api.h /root/.cmake-js/node-x64/v18.20.8/include/node/ || \
    cp /usr/include/nodejs/src/node_api.h /root/.cmake-js/node-x64/v18.20.8/include/node/ || \
    echo "Failed to copy node_api.h"

RUN npm run compile-llvm --prefix .
COPY Compiler/src ./src

# Stage 2: Build Go server binary
FROM golang:1.22 AS go-builder

WORKDIR /app/server
COPY server/go.mod ./go.mod
COPY server/src ./src
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /app/bin/zstudio-server ./src/main.go

# Stage 3: Runtime image (Node required for compiler + lli runtime)
FROM node:18-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends llvm \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=go-builder /app/bin/zstudio-server /app/zstudio-server
COPY --from=compiler-builder /app/Compiler /app/Compiler

ENV COMPILER_PATH=/app/Compiler/src/index.js

CMD ["/app/zstudio-server"]
