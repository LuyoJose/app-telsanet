# Usa una imagen oficial de Node para construir la app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Usa una imagen de Nginx para servir la app estática
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copia configuración personalizada de Nginx si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]