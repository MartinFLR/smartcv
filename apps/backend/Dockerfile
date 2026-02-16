FROM node:20-alpine

WORKDIR /app

COPY package*.json .npmrc ./

RUN npm install

COPY . .

RUN npx nx build backend

CMD ["node", "dist/apps/backend/main.js"]
