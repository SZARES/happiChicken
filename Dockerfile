# syntax=docker/dockerfile:1

# ---------- Etapa 1: calidad ----------
# Instala dependencias y corre lint + pruebas. Si algo falla, la imagen no se construye.
FROM node:22-alpine AS test
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run lint && npm test

# ---------- Etapa 2: producción ----------
# Solo los archivos estáticos servidos por nginx (sin node_modules ni pruebas).
FROM nginx:1.27-alpine AS runtime
LABEL org.opencontainers.image.title="Happy Chicken" \
      org.opencontainers.image.description="Landing y pedidos web de Happy Chicken servidos con nginx" \
      org.opencontainers.image.source="https://github.com/SZARES/happiChicken"

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=test /app/index.html /app/styles.css /app/logo.png /usr/share/nginx/html/
COPY --from=test /app/imagenes/ /usr/share/nginx/html/imagenes/
COPY --from=test /app/src/ /usr/share/nginx/html/src/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1
