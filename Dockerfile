# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install root dependencies
RUN npm install

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Build frontend
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV CLIENT_URL=http://localhost:3000

WORKDIR /app/backend

# Expose ports
EXPOSE 5000

# Start server
CMD ["npm", "start"]