# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Debug: Show what was actually built
RUN echo "=== Contents of dist directory ===" && \
    ls -la dist/ && \
    echo "=== Looking for main files ===" && \
    find dist -name "main.*" -type f

# Verify build succeeded - check both possible locations
RUN test -f dist/main.js || test -f dist/src/main.js || (echo "ERROR: main.js not found in dist/ or dist/src/!" && exit 1)

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy Prisma files
COPY prisma ./prisma

# Generate Prisma client for production
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy start script
COPY start.sh ./

# Make start script executable
RUN chmod +x start.sh

# Verify dist was copied correctly
RUN test -f dist/main.js || (echo "ERROR: dist/main.js not found in production image!" && exit 1)

# Expose port
EXPOSE 3000

# Start the application with migration handling
CMD ["./start.sh"]
