# Stage 1: Build dependencies
FROM node:18-alpine AS base

WORKDIR /app
COPY server/package*.json ./
RUN npm ci

# Stage 2: Final runtime (distroless)
FROM gcr.io/distroless/nodejs18-debian11

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY server/ .

CMD ["src/server.js"]
