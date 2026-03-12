# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Accept build-time API key (injected by Cloud Build substitution)
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx port 80 with 8080 (required by Cloud Run)
RUN sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf && \
    sed -i 's/listen\s*\[::\]:80;/listen [::]:8080;/g' /etc/nginx/conf.d/default.conf

    EXPOSE 8080
    CMD ["nginx", "-g", "daemon off;"]
    # Configured for Cloud Build with Gemini API key substitution
