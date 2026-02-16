# Stage 1: Build the Angular application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm install

COPY . .

RUN npx nx build frontend

# Stage 2: Serve the application with Nginx
FROM nginx:1.25-alpine-slim

COPY --from=build /app/dist/apps/frontend/browser /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
