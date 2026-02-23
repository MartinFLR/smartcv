# Stage 1: Build the backend
FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json .npmrc ./
RUN npm install

COPY . .
RUN npx nx build backend

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copy built application and package.json for production deps
COPY --from=builder /app/dist/apps/backend ./
COPY --from=builder /app/dist/apps/backend/package.json ./

# Install only production dependencies
# Install only production dependencies with generic architecture flags
RUN apk add --no-cache python3 make g++ && \
    # Force sqlite3 to build from source with generic x86-64 instructions (no AVX)
    export CXXFLAGS="-march=x86-64 -mtune=generic" && \
    export CFLAGS="-march=x86-64 -mtune=generic" && \
    npm install --omit=dev --build-from-source=sqlite3 && \
    apk del python3 make g++

CMD ["node", "main.js"]
