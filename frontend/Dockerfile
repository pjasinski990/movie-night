FROM node:22.9.0-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/certs/cloudflare-origin.crt /etc/nginx/ssl/cloudflare-origin.crt
COPY --from=build /usr/src/app/certs/cloudflare-origin.key /etc/nginx/ssl/cloudflare-origin.key
RUN chmod 600 /etc/nginx/ssl/cloudflare-origin.key && \
    chmod 644 /etc/nginx/ssl/cloudflare-origin.crt

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
