FROM node:22.9.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN mkdir -p ./dist/uploads
RUN mkdir -p ./dist/certs
COPY ./certs ./dist/certs

RUN npm run build

CMD ["node", "dist/server.js"]
