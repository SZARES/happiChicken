# Prompt Maestro y Dossier de Documentación del Proyecto
> **Instrucciones de uso:** Copia y pega todo el contenido de este archivo directamente en Claude (o en tu LLM de preferencia) para que genere el documento formal, limpio y listo para presentación académica o ejecutiva.

***

## [PROMPT DE INSTRUCCIÓN PARA CLAUDE]

```text
Actúa como Technical Writer y Lead Enterprise Architect. A continuación te entrego el dossier técnico y operativo completo del proyecto de software "Happy Chicken Web Ordering & Landing Platform" (desarrollado para el curso de Herramientas de Desarrollo - UTP).

Tu tarea es tomar toda esta información y redactar un DOCUMENTO TÉCNICO MAESTRO definitivo, extremadamente pulcro, profesional, ejecutivo y visualmente impecable.

Requisitos de redacción y formato:
1. Tono técnico, riguroso, formal y de nivel Senior.
2. Formato Markdown enriquecido: usa tablas comparativas claras, bloques de código con resaltado de sintaxis, diagramas de flujo en Mermaid y alertas tipo callout (NOTE, TIP, IMPORTANT).
3. Elimina redundancias o texto de relleno; sintetiza con precisión pero sin perder ninguna especificación técnica, criterio Given/When/Then, ni tarea del backlog.
4. Asegura coherencia total en la nomenclatura entre Jira, Git, CI/CD y las ramas.
```

***

## [DOSSIER TÉCNICO Y OPERATIVO DEL PROYECTO]

### 1. Ficha Técnica y Contexto del Proyecto
* **Nombre del Producto:** Happy Chicken Web Ordering & Landing Platform.
* **Organización / Institución:** Universidad Tecnológica del Perú (UTP) — Curso: Herramientas de Desarrollo.
* **Repositorio Central en GitHub:** `https://github.com/SZARES/happiChicken` (Owner: `SZARES`, Repo: `happiChicken`).
* **Dominio de Negocio:** Pollería y comida rápida peruana (Pollo crujiente estilo Happy, combos familiares, alitas, guarniciones de papas y ensaladas). El sistema abarca una landing interactiva de alta conversión, catálogo categorizado, carrito de compras en cliente y checkout automatizado mediante generación de payload estructurado hacia la API de WhatsApp.
* **Stack Tecnológico:**
  * **Frontend:** HTML5 Semántico, CSS3 Moderno (metodología BEM, CSS Custom Properties / Tokens), Vanilla JavaScript (ES6+ modular, Web Storage API).
  * **Control de Versiones y Repositorio:** Git, GitHub con Branch Protection Rules y GitHub Flow estricto.
  * **CI/CD & Hosting:** GitHub Actions (Integración continua: ESLint, Prettier, Unit Testing) y Vercel (Continuous Deployment con Preview Deployments por PR y Production Deployments automáticos en `main`).
  * **Gestión y Gobernanza:** Jira Software (Scrum / Scrumban con Smart Commits vinculados a claves de ticket `HAP-XXX`).
  * **Diseño y Prototipado:** Figma (Wireframes Low-Fi, Prototipo Hi-Fi interactivo, Design System y Tokens de diseño).
  * **Comunicación y Documentación:** Discord/Slack con webhooks de GitHub, Notion y GitHub Wiki.

---

### 2. Dimensión 1: Procesos Principales del Ciclo de Vida (SDLC)
* **Metodología de Gestión:** Scrumban (Sprints fijos de 2 semanas con cadencia continua y límite estricto de WIP = 2 tareas por desarrollador).
* **Fases del Ciclo de Vida del Software:**
  1. *Planificación (Refinement & Sprint Planning):* Evaluación de la Definition of Ready (DoR), estimación en Story Points (secuencia Fibonacci: 1, 2, 3, 5, 8). Límite de 8 SP por ticket; si supera, se divide.
  2. *Desarrollo (Local & Branching):* Ramas de ciclo corto creadas desde `main` (`feature/HAP-[ID]-[nombre]`), desarrollo con linters locales y hooks de pre-commit.
  3. *Pruebas (Automated Testing & Static Analysis):* Pruebas unitarias para la lógica de negocio aislada (cálculo de totales, filtrado de categorías, generador de URL de WhatsApp) y análisis estático con ESLint/Prettier.
  4. *Revisión de Código (Peer Code Review):* Apertura obligatoria de Pull Request, despliegue efímero en Vercel (Preview Deployment), revisión de arquitectura por al menos un par técnico.
  5. *Despliegue Continuo (Continuous Delivery):* Squash and Merge hacia `main`, build automático y release en producción mediante Vercel en < 90 segundos.
  6. *Monitoreo y Observabilidad:* Seguimiento de Core Web Vitals (LCP < 2.5s, FID/INP, CLS < 0.1) desde Vercel Analytics y verificación del canal de pedidos.
* **Criterios Generales de Aceptación:**
  * Cumplimiento total de escenarios Given/When/Then.
  * Responsive Design en Mobile (360-480px), Tablet (768-1024px) y Desktop (1280px+).
  * Accesibilidad WCAG 2.1 AA (contraste >= 4.5:1, soporte de lectores de pantalla con `aria-*`, navegación con teclado).
  * Soporte cross-browser en Chromium, WebKit (Safari) y Firefox.
* **Definition of Ready (DoR):**
  * Título estándar: *"Como [usuario], quiero [acción] para [beneficio]"*.
  * Criterios de aceptación detallados en Given/When/Then.
  * Artefacto de diseño en Figma enlazado.
  * Dependencias técnicas resueltas.
  * Estimación aprobada por el equipo (máximo 8 SP).
  * Viabilidad técnica validada por el Tech Lead.
* **Definition of Done (DoD):**
  * Código limpio, formateado y sin `console.log` o comentarios residuales.
  * 0 errores y 0 warnings en linter (`npm run lint`).
  * Pruebas unitarias ejecutadas con éxito en local y en GitHub Actions.
  * Aprobación obligatoria de al menos 1 Peer Reviewer en el PR.
  * Validación funcional en la URL de Vercel Preview.
  * Sin degradación de rendimiento en métricas de Lighthouse.
  * Merge a `main` ejecutado mediante *Squash and Merge*.
  * Ticket de Jira actualizado al estado `Done` con referencia al PR.

---

### 3. Dimensión 2: Secuencia de Procesos, Git Flow y CI/CD
* **Secuencia Operativa de una Tarea:**
  `Backlog (DoR)` ➔ `Sprint Planning` ➔ `In Progress` ➔ `Branch Checkout (feature/HAP-X)` ➔ `Pre-commit Hooks (Husky)` ➔ `Push & PR Creation` ➔ `GitHub Actions CI Check` ➔ `Vercel Preview Deployment` ➔ `Peer Code Review` ➔ `QA Verification` ➔ `Squash & Merge to main` ➔ `Vercel Production Release` ➔ `Jira Done`.
* **Estrategia de Ramificación:**
  * Rama troncal protegida: `main` (despliegue automático a producción).
  * Ramas de trabajo efímeras:
    * `feature/HAP-[ID]-[kebab-case]`
    * `bugfix/HAP-[ID]-[kebab-case]`
    * `chore/HAP-[ID]-[kebab-case]`
    * `docs/HAP-[ID]-[kebab-case]`
  * Políticas de protección en GitHub: Bloqueo de push directo a `main`, eliminación de privilegios de bypass, obligación de PR, verificación de CI aprobada y actualización de rama previa al merge.
  * Merge Policy: Exclusivamente **Squash and Merge** para mantener historial lineal y atómico.
* **Pipeline de CI/CD:**
  * **CI (GitHub Actions - `.github/workflows/ci.yml`):**
    * Disparadores: `push` en `main` y `develop`, `pull_request` hacia `main`.
    * Pasos: Checkout de código, Node.js 20 con caché de npm, instalación determinística (`npm ci`), linting de marcado y estilos, linting de JavaScript (ESLint/Prettier), ejecución de pruebas unitarias (`npm test -- --coverage`).
  * **CD (Vercel):**
    * Preview Deployments automáticos en cada PR para validación visual de QA.
    * Production Deployment automático al consolidar cambios en `main`.

---

### 4. Dimensión 3: Herramientas de Colaboración y Plantillas
* **Canales de Comunicación (Discord / Slack):**
  * `#anuncios-importantes`: Releases y avisos oficiales (solo líderes).
  * `#desarrollo-frontend`: Soporte técnico, snippets y discusiones de código.
  * `#diseno-ux-ui`: Feedback de Figma y revisión de prototipos.
  * `#github-bots`: Alertas automáticas de PRs, pushes y fallos de CI.
  * `#standup-asincrono`: Dailies asíncronos (Ayer / Hoy / Bloqueos).
* **Plantilla de Reporte de Bugs (`.github/ISSUE_TEMPLATE/bug_report.md`):**
  * Contiene: Título `[BUG]: `, descripción clara, pasos reproducibles numerados, comportamiento esperado vs obtenido, capturas/logs de consola, datos del entorno (dispositivo, OS, navegador) y clave de Jira asociada.
* **Plantilla de Especificación de Features (`.github/ISSUE_TEMPLATE/feature_request.md`):**
  * Contiene: Título `[FEAT]: `, estructura de Historia de Usuario (Como/Quiero/Para), justificación y valor de negocio, criterios Given/When/Then, enlace al frame de Figma y requisitos técnicos adicionales (LocalStorage, SEO, a11y).
* **Plantilla de Pull Request (`.github/PULL_REQUEST_TEMPLATE.md`):**
  * Contiene: Enlace al ticket de Jira (`HAP-XXX`), descripción técnica de cambios, tipo de cambio (Feature, Bugfix, UI/Style, Chore, Docs), checklist de pruebas ejecutadas, checklist de DoD y tabla de capturas comparativas (Antes vs Después).

---

### 5. Dimensión 4: Gestión de Actividades en Jira
* **Configuración del Proyecto:**
  * Modelo: Scrum Software Project.
  * Project Key: `HAP`.
  * Cadencia: Sprints bisemanales (Inicio: Lunes 09:00, Fin: Viernes de 2da semana 18:00).
  * Ceremonias: Planning (2h), Daily (15m), Refinement (1h), Review/Demo (1h), Retrospectiva (45m).
* **Flujo de Estados del Tablero (Workflow):**
  `Backlog` ➔ `Ready for Dev` (cumple DoR) ➔ `In Progress` (asignado, WIP limit: 2) ➔ `Code Review` (PR creado y Vercel Preview activo) ➔ `QA & Testing` (CI en verde + aprobación técnica) ➔ `Done` (validado en producción y PR mergeado).
* **Nomenclatura y Trazabilidad Git-Jira:**
  * Ramas: `feature/HAP-101-menu-filtering`, `bugfix/HAP-108-cart-subtotal`.
  * Commits: `<tipo>(<alcance>): HAP-<ID> <descripción imperativa>`
  * Ejemplos:
    * `feat(catalog): HAP-101 add category filter logic for combos`
    * `fix(cart): HAP-108 fix total calculation on item removal`
    * `test(order): HAP-113 add unit test for whatsapp payload generator`

---

### 6. Dimensión 5: Avance de UI/UX y Arquitectura de Código
* **UI/UX en Figma:**
  * Fase 1: Wireframing Low-Fi (Header, Hero, Grid de Menú con tabs, Sección Promocional, Drawer de Pedido, Footer).
  * Fase 2: Design System y Design Tokens:
    * Color Primario (Rojo Happy): `#D62828`
    * Color Acento (Naranja Mostaza): `#F77F00`
    * Fondo Cálido (Crema): `#FFFDF9`
    * Superficie (Blanco Puro): `#FFFFFF`
    * Texto de Alto Contraste: `#1D1E2C`
    * Tipografía: Outfit / Inter (cuerpo legible y display cálido).
    * Espaciado: Escala de 8px (8, 16, 24, 32, 48px). Radios: 16px y 24px.
  * Fase 3: Prototipo Hi-Fi interactivo con microinteracciones (hover, animación de badge, toast reactivo, apertura de carrito).
* **Arquitectura de Software y Código:**
  * Transición de monolito (`index.html`, `styles.css`, `script.js`) a estructura modular limpia:
    * `src/assets/` (imágenes y svg optimizados).
    * `src/css/base/` (reset, typography, variables de tokens en `:root`).
    * `src/css/components/` (button, card, cart, toast con BEM).
    * `src/css/layout/` (header, hero, menu, footer).
    * `src/js/modules/` (`catalog.js`, `cart.js`, `whatsapp.js`, `toast.js`).
    * `src/js/state/` (`store.js` reactivo con persistencia en `localStorage`).
    * `tests/` (`cart.test.js`, `whatsapp.test.js`, `catalog.test.js`).
* **Tooling y Gobernanza de Entornos:**
  * Formateo y Calidad: Prettier (`.prettierrc`) y ESLint (`.eslintrc.json`).
  * Automatización local: Husky y lint-staged para verificar archivos staged antes de permitir commit.
  * Variables de entorno: `.env.example` con variables públicas prefijadas (`VITE_WHATSAPP_PHONE_NUMBER`, etc.) y secretos alojados en GitHub Secrets / Vercel Settings.

---

### 7. Matriz Detallada del Backlog (Jira)

| Clave | Épica | Tipo | Título de la Tarea / Historia | Criterios de Aceptación (Given / When / Then) | Prioridad | Dependencias |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **HAP-101** | **EPIC-1: Gobernanza y SDLC** | Tarea | Documentación y oficialización de DoD, DoR y ciclo SDLC | **Given** inicio de Sprint 0<br>**When** se aprueban las políticas de calidad<br>**Then** los estándares se publican en `CONTRIBUTING.md` en `main`. | **Alta** | Ninguna |
| **HAP-102** | **EPIC-2: DevOps & CI/CD** | Tarea | Configuración del pipeline de CI con GitHub Actions | **Given** un PR abierto hacia `main`<br>**When** se detecta el evento `pull_request`<br>**Then** se ejecutan linters y pruebas unitarias bloqueando el merge en caso de falla. | **Alta** | HAP-101 |
| **HAP-103** | **EPIC-2: DevOps & CI/CD** | Tarea | Configuración de CD en Vercel con Preview y Producción | **Given** un PR con CI aprobado<br>**When** Vercel detecta la rama<br>**Then** genera URL de preview para testing y despliega automáticamente a producción al fusionar en `main`. | **Alta** | HAP-102 |
| **HAP-104** | **EPIC-3: Herramientas** | Tarea | Creación de plantillas de Issue (Bugs/Features) y Pull Request | **Given** un desarrollador creando un Issue o PR<br>**When** accede a la opción en GitHub<br>**Then** se precarga la plantilla estructurada oficial correspondiente. | **Media** | HAP-101 |
| **HAP-105** | **EPIC-3: Herramientas** | Tarea | Configuración de canales de Discord y Webhooks de GitHub | **Given** eventos de push, PR o build<br>**When** se ejecutan en el repositorio<br>**Then** `#github-bots` en Discord recibe una notificación instantánea. | **Baja** | HAP-102 |
| **HAP-106** | **EPIC-4: Gestión Jira** | Tarea | Estructura del tablero Jira, flujos de estado y Smart Commits | **Given** el proyecto en Jira creado<br>**When** se vincula con GitHub<br>**Then** los estados y referencias `HAP-XXX` actualizan automáticamente los tickets. | **Alta** | HAP-101 |
| **HAP-107** | **EPIC-5: Diseño UI/UX** | Historia | Creación del Design System y tokens en Figma | **Given** la guía de marca Happy Chicken<br>**When** se construyen los componentes y paletas<br>**Then** se exportan los design tokens documentados para consumo en CSS. | **Alta** | Ninguna |
| **HAP-108** | **EPIC-5: Diseño UI/UX** | Historia | Prototipo interactivo en Figma de flujo de menú y pedido | **Given** los wireframes aprobados<br>**When** se prueba la interacción móvil en Figma<br>**Then** se simula el filtrado de productos y adición al carrito fluidamente. | **Media** | HAP-107 |
| **HAP-109** | **EPIC-6: Frontend Core** | Tarea | Modularización de la arquitectura CSS con tokens en variables | **Given** el archivo `styles.css` actual<br>**When** se desacopla en estructura BEM modular<br>**Then** se divide en carpetas base, components y layout manteniendo la integridad visual. | **Alta** | HAP-107 |
| **HAP-110** | **EPIC-6: Frontend Core** | Historia | Filtrado dinámico de categorías en catálogo de platos | **Given** el usuario en la sección de menú<br>**When** pulsa sobre una categoría ("Pollo", "Combos", "Acompañamientos")<br>**Then** el DOM se actualiza con una transición fluida mostrando solo los ítems seleccionados. | **Alta** | HAP-109 |
| **HAP-111** | **EPIC-6: Frontend Core** | Historia | Card de producto accesible con badges promocionales | **Given** un ítem con atributo promocional<br>**When** se renderiza la tarjeta en el catálogo<br>**Then** muestra imagen optimizada, precio en Soles (S/) y botón con etiqueta `aria-label`. | **Media** | HAP-109 |
| **HAP-112** | **EPIC-7: Carrito & Checkout** | Historia | Carrito reactivo con cálculo de totales y persistencia local | **Given** ítems seleccionados por el cliente<br>**When** se actualiza o cierra la pestaña del navegador<br>**Then** los productos, cantidades y total persisten íntegros vía `localStorage`. | **Alta** | HAP-110 |
| **HAP-113** | **EPIC-7: Carrito & Checkout** | Historia | Generación de pedido formateado hacia WhatsApp API | **Given** al menos un producto en el carrito<br>**When** el cliente presiona "Continuar pedido"<br>**Then** se genera y abre una URL de WhatsApp con el mensaje codificado detallando ítems y monto final. | **Alta** | HAP-112 |
| **HAP-114** | **EPIC-7: Carrito & Checkout** | Historia | Manejo de estado vacío del carrito y notificaciones Toast | **Given** interacciones de adición o vaciado de pedido<br>**When** se desencadena la acción<br>**Then** se despliega un Toast no intrusivo y accesible confirmando la operación. | **Media** | HAP-112 |
| **HAP-115** | **EPIC-8: Calidad & Testing** | Tarea | Suite de pruebas unitarias para carrito y WhatsApp payload | **Given** la lógica de cálculo y codificación de URL<br>**When** se corren los tests unitarios (`npm test`)<br>**Then** se cubre el 100% de escenarios límite (cantidades 0, decimales, caracteres especiales). | **Alta** | HAP-112, HAP-113 |
| **HAP-116** | **EPIC-8: Calidad & Testing** | Tarea | Auditoría Lighthouse, optimización WebP y release a producción | **Given** la versión consolidada en Vercel Producción<br>**When** se audita con Lighthouse<br>**Then** todas las métricas superan 90 puntos y LCP es inferior a 2.5s. | **Alta** | HAP-114, HAP-115 |
```
