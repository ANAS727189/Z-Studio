# Stage 1: Build dependencies and compiler
FROM node:18 AS builder

# Install build tools, LLVM, and Node.js development headers
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      llvm-dev \
      python3 \
      make \
      g++ \
      cmake \
      libnode-dev \
 && rm -rf /var/lib/apt/lists/*

# Debug: Check for node_api.h in system paths
RUN find / -name node_api.h || echo "node_api.h not found"

# Set working directory for server
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci

# Set working directory for compiler
WORKDIR /app/Compiler(Z--)
COPY Compiler(Z--)/package.json ./package.json
COPY Compiler(Z--)/package-lock.json ./package-lock.json
# Copy node-addon-api to ensure its headers are available
COPY Compiler(Z--)/node_modules/node-addon-api ./node_modules/node-addon-api
RUN npm ci --ignore-scripts

# Debug: Check for CMakeLists.txt
RUN find /app/Compiler\(Z--\)/node_modules/llvm-bindings -name CMakeLists.txt || echo "CMakeLists.txt not found"

# Debug: Check for node_api.h in system paths and cmake-js headers
RUN find /root/.cmake-js -name node_api.h || echo "node_api.h not found in cmake-js headers"

# Debug: Check for cmake-js binary
RUN ls -l /app/Compiler\(Z--\)/node_modules/.bin/cmake-js || echo "cmake-js binary not found"

# Manually copy node_api.h to cmake-js header directory
RUN mkdir -p /root/.cmake-js/node-x64/v18.20.8/include/node && \
    cp /usr/include/node/node_api.h /root/.cmake-js/node-x64/v18.20.8/include/node/ || \
    cp /usr/include/nodejs/src/node_api.h /root/.cmake-js/node-x64/v18.20.8/include/node/ || \
    echo "Failed to copy node_api.h"

# Compile llvm-bindings using cmake-js
RUN npm run compile-llvm

# Copy compiler source
COPY Compiler(Z--)/src ./src

# Stage 2: Final runtime (with compiler bundled)
FROM gcr.io/distroless/nodejs18-debian11

# Copy server files and node_modules
WORKDIR /app/server
COPY --from=builder /app/server/node_modules ./node_modules
COPY server/ .

# Copy compiler files and node_modules
WORKDIR /app
COPY --from=builder /app/Compiler\(Z--\) ./Compiler(Z--)

# Set environment variable for compiler path
ENV COMPILER_PATH=/app/Compiler(Z--)/src/index.js

CMD ["src/server.js"]