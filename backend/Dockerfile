# Imagen Docker del backend Node.js (API REST puerto 3000)
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
