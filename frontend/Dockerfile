# frontend/Dockerfile
# Multi-stage build for optimized production image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Add labels
LABEL maintainer="devops-team@example.com"
LABEL description="Frontend service for DevOps pipeline demo"
LABEL version="1.0.0"

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S nginx-custom
RUN adduser -S nginx-custom -u 1001

# Set proper permissions
RUN chown -R nginx-custom:nginx-custom /usr/share/nginx/html
RUN chown -R nginx-custom:nginx-custom /var/cache/nginx
RUN chown -R nginx-custom:nginx-custom /var/log/nginx
RUN chown -R nginx-custom:nginx-custom /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R nginx-custom:nginx-custom /var/run/nginx.pid

# Switch to non-root user
USER nginx-custom

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
