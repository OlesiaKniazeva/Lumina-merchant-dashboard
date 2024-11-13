FROM node:20-alpine

WORKDIR /app

# Install wget for health check
RUN apk add --no-cache wget

# First, copy only package files and install dependencies
COPY package*.json ./
COPY tsconfig.json ./

# Add China mirror configuration
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

# Copy source files
COPY . .

# Make sure the TypeScript compiler is available
RUN npm install typescript

# Build TypeScript files
RUN npm run build

# Verify the dist directory and compiled file exist
RUN ls -la dist/ || echo "dist directory is empty or doesn't exist"

EXPOSE 3000

# For development, use ts-node instead of compiled js
CMD ["npx", "ts-node", "server.ts"]