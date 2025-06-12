# Stage 1: Build
FROM node:20-alpine AS builder

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files and install production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production --legacy-peer-deps

# Copy built application
COPY --from=builder /app/dist ./dist

# Set proper permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 3000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/main.js"] 