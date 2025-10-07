FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]