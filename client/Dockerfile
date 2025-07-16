# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY client/ ./
RUN npm ci && npm run build

# Stage 2: Serve using distroless NGINX
FROM gcr.io/distroless/static-debian11

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
