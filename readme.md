# Happy Chicken — Web Ordering & Landing Platform

Landing page y sistema de pedidos web de **Happy Chicken** (Piura, Perú). El cliente filtra el menú, arma su carrito y envía el pedido al WhatsApp del restaurante.

Proyecto del curso **Herramientas de Desarrollo** — Universidad Tecnológica del Perú, 2026.

## Tecnologías

| Área               | Herramienta                                    |
| ------------------ | ---------------------------------------------- |
| Frontend           | HTML5, CSS3 (BEM + Custom Properties), JS ES6+ |
| Calidad            | Prettier, HTMLHint, ESLint 9                   |
| Pruebas            | `node:test` (Node.js 22) con cobertura         |
| CI                 | GitHub Actions (`.github/workflows/ci.yml`)    |
| CD / hosting       | Vercel (Preview por PR y producción)           |
| Contenedores       | Docker multi-stage + nginx 1.27 (Alpine)       |
| Registro de imagen | GitHub Container Registry (`ghcr.io`)          |
| Gestión            | Jira (espacio `happychicken`), Discord y Figma |

## Ejecutar en local

```bash
npm ci
npm run lint
npm test
```

El sitio usa módulos ES, así que se abre con un servidor (Live Server o Docker), no con doble clic en `index.html`.

## Ejecutar con Docker

```bash
# Construir la imagen (corre lint y pruebas dentro del build)
docker build -t happy-chicken:local .

# Levantar el contenedor y abrir http://localhost:8080
docker run --rm -d --name happy-chicken -p 8080:80 happy-chicken:local

# Detenerlo
docker stop happy-chicken
```

O con Docker Compose:

```bash
docker compose up -d --build
docker compose down
```

### Cómo está armada la imagen

1. **Etapa `test` (`node:22-alpine`)**: instala dependencias con `npm ci` y ejecuta `npm run lint` y `npm test`. Si algo falla, la imagen no se construye.
2. **Etapa `runtime` (`nginx:1.27-alpine`)**: copia solo los archivos estáticos (`index.html`, `styles.css`, `logo.png`, `imagenes/`, `src/`) y la configuración de `nginx/default.conf`, que aplica las mismas cabeceras de seguridad y caché que `vercel.json`. Incluye un `HEALTHCHECK`.

## Flujo de trabajo

GitHub Flow: ramas `feature/`, `bugfix/`, `chore/` y `docs/` + `HAP-[ID]-[descripcion]`, Pull Request hacia `main`, CI en verde y Squash and Merge. Cada PR ejecuta el job **Code Validation & Quality Checks** y el job **Docker Build & Smoke Test**; cada merge en `main` publica la imagen en `ghcr.io/szares/happichicken`.
