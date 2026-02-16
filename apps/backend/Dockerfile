# Stage 1: Build the backend
FROM node:20-alpine3.19 AS builder

WORKDIR /app

COPY package*.json .npmrc ./
RUN npm install

COPY . .
RUN npx nx build backend

# Stage 2: Production image
FROM node:20-alpine3.19

WORKDIR /app

ENV NODE_ENV=production

# Copy built application and package.json for production deps
COPY --from=builder /app/dist/apps/backend ./
COPY --from=builder /app/dist/apps/backend/package.json ./

# Install only production dependencies
RUN npm install --omit=dev

CMD ["node", "main.js"]
