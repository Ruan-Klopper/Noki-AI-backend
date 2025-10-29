FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Verify dist directory was created
RUN ls -la dist/ || (echo "Build failed - dist directory not found" && exit 1)

# Remove dev dependencies to reduce image size (but keep dist)
RUN npm prune --production

# Verify dist still exists after prune
RUN ls -la dist/ || (echo "Dist directory deleted after prune" && exit 1)

# Make start script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 3000

# Start the application with migration handling
CMD ["./start.sh"]
