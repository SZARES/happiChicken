# Plan Maestro de Trabajo y Backlog Operativo
## Proyecto: Happy Chicken Web Ordering & Landing Platform
**Organización / Curso:** UTP — Herramientas de Desarrollo  
**Repositorio Oficial:** `SZARES/happiChicken`  
**Rol:** Senior Project Manager & Tech Lead  
**Versión:** 1.0.0  
**Fecha de Emisión:** 19 de Octubre de 2026  

---

## Índice General
1. [Resumen Ejecutivo y Cronograma por Sprints](#1-resumen-ejecutivo-y-cronograma-por-sprints)
2. [Dimensión 1: Descripción de los Procesos Principales](#2-dimensión-1-descripción-de-los-procesos-principales)
   - 2.1 Ciclo de Vida del Software (SDLC)
   - 2.2 Criterios Generales de Aceptación
   - 2.3 Definition of Ready (DoR)
   - 2.4 Definition of Done (DoD)
3. [Dimensión 2: Secuencia de Procesos y Flujo de Trabajo](#3-dimensión-2-secuencia-de-procesos-y-flujo-de-trabajo)
   - 3.1 Secuencia Cronológica de una Tarea (Lead Time & Cycle Time)
   - 3.2 Estrategia de Ramificación (Git Feature Branching) y Merge Policies
   - 3.3 Pipeline de CI/CD (GitHub Actions & Vercel)
4. [Dimensión 3: Configuración de Herramientas de Colaboración](#4-dimensión-3-configuración-de-herramientas-de-colaboración)
   - 4.1 Arquitectura de Canales de Comunicación y Documentación
   - 4.2 Plantilla Obligatoria: Reporte de Bugs (`bug_report.md`)
   - 4.3 Plantilla Obligatoria: Especificación de Features (`feature_request.md`)
   - 4.4 Plantilla Obligatoria: Pull Request (`PULL_REQUEST_TEMPLATE.md`)
5. [Dimensión 4: Gestión de Actividades en Jira](#5-dimensión-4-gestión-de-actividades-en-jira)
   - 5.1 Estructura del Proyecto y Cadencia de Sprints
   - 5.2 Flujo de Estados del Tablero (Workflow & Transitions)
   - 5.3 Convención de Nomenclatura y Trazabilidad Git-Jira
6. [Dimensión 5: Avance de Interfaces y Código del Proyecto](#6-dimensión-5-avance-de-interfaces-y-código-del-proyecto)
   - 6.1 Roadmap de Diseño UI/UX en Figma
   - 6.2 Arquitectura Front-End & Estructura de Directorios
   - 6.3 Linters, Formatters y Gobernanza de Entornos
7. [Matriz de Tareas y Backlog Operativo en Jira](#7-matriz-de-tareas-y-backlog-operativo-en-jira)

---

## 1. Resumen Ejecutivo y Cronograma por Sprints

Para garantizar una entrega predecible, con alta calidad técnica y sin deuda técnica descontrolada, el proyecto se estructura bajo el marco de trabajo **Scrum/Kanban Híbrido (Scrumban)** con iteraciones de **2 semanas por Sprint**.

```
+---------------------------------------------------------------------------------------------------+
|                               CRONOGRAMA MAESTRO (SPRINTS 0 A 3)                                  |
+-------------------+--------------------+--------------------+-------------------------------------+
| Sprint 0          | Sprint 1           | Sprint 2           | Sprint 3                            |
| Setup & Discovery | Core & Catalogo    | Cart & WhatsApp    | Polish & Release                    |
| Semanas 1-2       | Semanas 3-4        | Semanas 5-6        | Semanas 7-8                         |
+-------------------+--------------------+--------------------+-------------------------------------+
| - DoR, DoD, SDLC  | - UI Figma Alta    | - Carrito reactivo | - Optimización Core Web Vitals      |
| - Jira Setup      | - Catalogo filtros | - Checkout WA API  | - Auditoría WCAG 2.1 AA             |
| - CI/CD GitHub    | - Card componentes | - LocalStorage sync| - Pruebas E2E y Smoke Test          |
| - Vercel Preview  | - Tests unitarios  | - Promos dinámicas | - Despliegue Producción v1.0.0      |
+-------------------+--------------------+--------------------+-------------------------------------+
```

### Detalle de Objetivos por Sprint:
* **Sprint 0: Gobernanza, Infraestructura y Tooling (Semanas 1-2):**
  * Definición de DoD, DoR y políticas de ingeniería.
  * Configuración de Jira, GitHub Actions (CI), Vercel (CD) y hooks de pre-commit (Husky/Lint-staged).
  * Creación del Design System inicial en Figma (tokens de color, tipografía, componentes base).
* **Sprint 1: Catálogo Interactivo y Componentes Base (Semanas 3-4):**
  * Maquetación modular responsive del menú (Pollo, Combos, Acompañamientos).
  * Filtrado dinámico por categoría sin recargas de página.
  * Pruebas unitarias de los filtros y componentes de interfaz.
* **Sprint 2: Motor de Carrito y Checkout vía WhatsApp (Semanas 5-6):**
  * Gestión de estado del carrito de compras con persistencia local (`localStorage`).
  * Generación del payload y codificación de URL para el despacho del pedido directo a WhatsApp.
  * Manejo de estados vacíos, feedback con Toasts accesibles y validación de cantidades.
* **Sprint 3: Performance, Calidad, Seguridad y Lanzamiento (Semanas 7-8):**
  * Optimización de assets (imágenes en formato WebP con compresión adaptativa, lazy loading nativo).
  * Auditoría Lighthouse (Score mínimo: 90+ en Performance, Accesibilidad, SEO y Best Practices).
  * Despliegue final a producción y configuración de monitoreo en Vercel Analytics.

---

## 2. Dimensión 1: Descripción de los Procesos Principales

### 2.1 Ciclo de Vida del Software (SDLC)
El ciclo de vida del proyecto sigue un modelo iterativo e incremental estructurado en 6 etapas continuas:

```
[ 1. Planificación ] ➔ [ 2. Desarrollo ] ➔ [ 3. Pruebas ] ➔ [ 4. Code Review ] ➔ [ 5. Despliegue ] ➔ [ 6. Monitoreo ]
         ▲                                                                                                    │
         └──────────────────────────────── Feedback & Retrospectiva ──────────────────────────────────────────┘
```

1. **Planificación (Backlog Refinement & Sprint Planning):**
   * El Product Owner y Tech Lead presentan las historias de usuario.
   * Se evalúa el cumplimiento estricto de la **DoR**.
   * Estimación colaborativa en Story Points (Fibonacci: 1, 2, 3, 5, 8). Tareas con más de 8 puntos se dividen obligatoriamente.
2. **Desarrollo (Local Development & Feature Branching):**
   * Creación de rama desde `main` siguiendo la convención `feature/HAP-[ID]-[nombre]`.
   * Desarrollo basado en estándares (HTML semántico, CSS BEM modular, JavaScript modular ES6+).
   * Ejecución de hooks de pre-commit para garantizar formato y ausencia de errores de sintaxis.
3. **Pruebas (Automated Testing & Static Analysis):**
   * Pruebas unitarias de la lógica de negocio (cálculo de totales, filtrado de categorías, generador de enlaces WhatsApp).
   * Verificación estática con Linters (ESLint, Prettier, Stylelint).
4. **Revisión de Código (Peer Code Review):**
   * Apertura de Pull Request (PR) hacia `main`.
   * Disparo automático del entorno de prueba en Vercel (Preview Deployment).
   * Requiere mínimo 1 aprobación de un par técnico verificando arquitectura, performance y legibilidad.
5. **Despliegue Continuo (Continuous Delivery):**
   * Aprobado el PR y superados los checks automáticos de CI, se realiza un *Squash and Merge*.
   * Vercel detecta el merge en `main` y dispara el despliegue automático a producción en menos de 90 segundos.
6. **Monitoreo y Operaciones (Observability & Telemetry):**
   * Supervisión de Core Web Vitals (LCP, FID/INP, CLS) desde Vercel Analytics.
   * Monitoreo de disponibilidad del enlace de pedidos y análisis de errores en consola.

---

### 2.2 Criterios Generales de Aceptación
Toda historia de usuario del proyecto debe satisfacer:
* **Funcionalidad:** Cumple el 100% de los criterios Given/When/Then definidos en su ticket.
* **Compatibilidad Responsive:** Visualización y operatividad óptima en resoluciones móviles (360px - 480px), tablets (768px - 1024px) y desktop (1280px+).
* **Accesibilidad (a11y):** Cumplimiento de WCAG 2.1 Nivel AA (contraste de color >= 4.5:1, etiquetas `aria-*` en componentes dinámicos, navegación completa por teclado).
* **Cross-Browser:** Funcionamiento sin fisuras en Chromium (Chrome/Edge), Safari (WebKit) y Firefox.

---

### 2.3 Definition of Ready (DoR)
Una Historia de Usuario se considera **LISTA (Ready)** para entrar al Sprint backlog si cumple:
- [ ] Título claro y redactado en formato estándar: *"Como [usuario], quiero [acción] para [beneficio]"*.
- [ ] Criterios de aceptación detallados en formato **Given / When / Then**.
- [ ] Prototipo o diseño en Figma adjunto (aplica para cualquier cambio visual o flujo de usuario).
- [ ] Dependencias técnicas identificadas y resueltas previamente.
- [ ] Estimada por el equipo técnico en Story Points (máximo 8 SP).
- [ ] Validada por el Tech Lead en viabilidad arquitectónica.

---

### 2.4 Definition of Done (DoD)
Una tarea o historia de usuario se considera **TERMINADA (Done)** únicamente cuando:
- [ ] El código está completamente escrito, libre de `console.log` o código comentado huérfano.
- [ ] Cumple con las reglas del linter del proyecto sin advertencias ni errores (`npm run lint`).
- [ ] Las pruebas unitarias asociadas están escritas, ejecutan en verde localmente y en el pipeline de CI.
- [ ] El Pull Request cuenta con mínimo 1 aprobación técnica de un Senior/Peer Reviewer.
- [ ] El Preview Deployment en Vercel fue verificado funcionalmente en dispositivos reales.
- [ ] No introduce regresiones en el bundle size ni penalizaciones graves en Lighthouse.
- [ ] Merge realizado en la rama `main` mediante *Squash and Merge*.
- [ ] Ticket de Jira actualizado a estado **Done** con enlace al PR cerrado.

---

## 3. Dimensión 2: Secuencia de Procesos y Flujo de Trabajo

### 3.1 Secuencia Cronológica de una Tarea

```
+-----------------------------------------------------------------------------------------------------------------------------------+
| PASO A PASO: DE LA CONCEPCIÓN AL DESPLIEGUE                                                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------+
|  1. Ticket seleccionado de Backlog a "In Progress" en Jira.                                                                       |
|  2. Checkout de rama: `git checkout -b feature/HAP-12-menu-filters` desde `main` actualizado.                                    |
|  3. Desarrollo iterativo con commits convencionales (`feat: HAP-12 add category filter logic`).                                    |
|  4. Pre-commit hook automático verifica linting y formato mediante Husky.                                                         |
|  5. Push a GitHub y creación del Pull Request usando la plantilla estandarizada.                                                  |
|  6. GitHub Actions ejecuta el Job de CI (Linting + Typecheck + Tests).                                                             |
|  7. Vercel genera un entorno efímero único (URL de Preview Deployment).                                                           |
|  8. QA y Tech Lead realizan revisión de código y validación exploratoria en la URL de preview.                                    |
|  9. Aprobación del PR y ejecución de "Squash and Merge" hacia `main`.                                                             |
| 10. Despliegue automático a Producción en Vercel (Producción viva en menos de 2 minutos).                                          |
| 11. Cierre automático del ticket en Jira y verificación de Core Web Vitals.                                                       |
+-----------------------------------------------------------------------------------------------------------------------------------+
```

---

### 3.2 Estrategia de Ramificación (Git Feature Branching) y Merge Policies

Se adopta una variante estricta de **GitHub Flow** orientada a Continuous Delivery:

```
[main] ────────────────●───────────────────────────────────────●───────────────> (PRODUCCIÓN)
                        \                                     / (Squash & Merge)
[feature/HAP-12]         ●────────●─────────●────────────────● (Preview en Vercel)
```

#### Reglas de Ramificación:
* **`main` (Rama Protegida):** Código estable en producción. Queda prohibido el push directo (`git push origin main`) y la reescritura de historial (`force push`).
* **Ramas de Trabajo (Efímeras):**
  * `feature/HAP-[ID]-[descripcion-kebab-case]` (ej. `feature/HAP-25-carrito-flotante`)
  * `bugfix/HAP-[ID]-[descripcion-kebab-case]` (ej. `bugfix/HAP-31-error-calculo-total`)
  * `chore/HAP-[ID]-[descripcion-kebab-case]` (ej. `chore/HAP-05-setup-eslint-prettier`)
  * `docs/HAP-[ID]-[descripcion-kebab-case]` (ej. `docs/HAP-02-politicas-equipo`)

#### Políticas de Pull Request y Merge:
* **Aprobaciones Requeridas:** Mínimo 1 revisión aprobatoria de un par técnico.
* **Branch Protection Rules en GitHub:**
  * `Require a pull request before merging` (habilitado).
  * `Require status checks to pass before merging` (Job `ci/validation` obligatorio).
  * `Require branches to be up to date before merging` (habilitado).
  * `Do not allow bypassing the above settings` (habilitado para todos).
* **Merge Strategy:** **Squash and Merge** exclusivo. Esto condensa todo el trabajo de la rama en un único commit atómico en `main`, conservando un árbol de Git limpio, legible y fácilmente reversible con `git revert`.

---

### 3.3 Pipeline de CI/CD (GitHub Actions & Vercel)

#### Arquitectura de Automatización:
* **CI (Integración Continua - GitHub Actions):** Se ejecuta en cada `push` a ramas activas y ante la apertura/actualización de cualquier Pull Request dirigido a `main`.
* **CD (Despliegue Continuo - Vercel Bot):**
  * *Preview Deployments:* Despliegue automático de cada PR en un subdominio aislado (ej. `happichicken-git-feature-hap-12-szares.vercel.app`).
  * *Production Deployment:* Despliegue a la URL de producción oficial en cada merge a `main`.

#### Archivo Técnico de CI (`.github/workflows/ci.yml`):
```yaml
name: CI Happy Chicken Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    name: Code Validation & Quality Checks
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Environment
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Lint HTML & CSS
        run: npm run lint:markup

      - name: Lint JavaScript (ESLint & Prettier)
        run: npm run lint:js

      - name: Run Unit Tests
        run: npm run test:unit -- --coverage

      - name: Verify Bundle & Assets Integrity
        run: npm run build --if-present
```

---

## 4. Dimensión 3: Configuración de Herramientas de Colaboración

### 4.1 Arquitectura de Canales de Comunicación y Documentación

#### Matriz de Canales (Discord / Slack):
| Canal | Propósito | Reglas de Interacción |
| :--- | :--- | :--- |
| `#anuncios-importantes` | Comunicados de entregas, bloqueos críticos y releases. | Solo lectura/moderación de Tech Lead y PM. |
| `#desarrollo-frontend` | Consultas técnicas de maquetación, JS, CSS y arquitectura. | Discusiones con snippets de código o enlaces a ramas. |
| `#diseno-ux-ui` | Feedback sobre Figma, wireframes y tokens de diseño. | Hilos por cada pantalla o componente específico. |
| `#github-bots` | Notificaciones automáticas de PRs, merges y fallos de CI. | Canal automatizado integrado con webhooks de GitHub. |
| `#standup-asincrono` | Publicación del daily en caso de no coincidir por horario. | Formato: ¿Qué hice ayer? ¿Qué haré hoy? ¿Qué me bloquea? |

#### Documentación Centralizada (GitHub Wiki / Notion):
* **Directorio de Arquitectura:** Especificación técnica del stack y decisiones de diseño de software (ADRs).
* **Guía de Onboarding:** Pasos para clonar, instalar dependencias y levantar el servidor local en menos de 5 minutos.
* **Glosario del Dominio:** Entidades del negocio (Pollo Happy, Combos, Acompañamientos, Pedidos WhatsApp).

---

### 4.2 Plantilla Obligatoria: Reporte de Bugs (`.github/ISSUE_TEMPLATE/bug_report.md`)
```markdown
---
name: "🐛 Reporte de Error (Bug)"
about: Crea un reporte detallado para reproducir y resolver un defecto.
title: "[BUG]: "
labels: ["bug", "triage"]
assignees: ""
---

### Descripción del Defecto
Descripción concisa y clara de qué está sucediendo de forma anómala.

### Pasos para Reproducir
1. Ir a la sección '...'
2. Hacer clic en el botón '...'
3. Seleccionar la cantidad '...'
4. Ver el error en pantalla o consola.

### Comportamiento Esperado
Explicación clara de qué debería ocurrir de acuerdo a las especificaciones.

### Capturas o Evidencias
Si aplica, adjunta capturas de pantalla, GIFs o mensajes de error de la consola.

### Contexto del Entorno
- **Dispositivo:** [ej. iPhone 14, PC Desktop]
- **Navegador:** [ej. Chrome 120, Safari 17]
- **Resolución:** [ej. 390x844, 1920x1080]
- **Ticket de Jira Relacionado:** [ej. HAP-45]
```

---

### 4.3 Plantilla Obligatoria: Especificación de Features (`.github/ISSUE_TEMPLATE/feature_request.md`)
```markdown
---
name: "🚀 Solicitud de Funcionalidad (Feature)"
about: Propón una nueva funcionalidad o mejora técnica para el producto.
title: "[FEAT]: "
labels: ["enhancement", "needs-refinement"]
assignees: ""
---

### Historia de Usuario
**Como** [tipo de usuario]  
**Quiero** [realizar una acción específica]  
**Para** [obtener un beneficio de negocio tangible]  

### Contexto y Motivación
¿Por qué necesitamos esta funcionalidad? ¿Qué dolor o necesidad resuelve?

### Criterios de Aceptación (Given / When / Then)
- **Escenario 1:**
  - **Given** [contexto inicial]
  - **When** [evento o acción del usuario]
  - **Then** [resultado esperado medible]

### Enlaces de Diseño / Figma
[Pega aquí el enlace directo al frame de Figma correspondiente]

### Requerimientos Técnicos Especiales
- [ ] Requiere persistencia en LocalStorage
- [ ] Impacta SEO o accesibilidad
- [ ] Requiere variables de entorno adicionales
```

---

### 4.4 Plantilla Obligatoria: Pull Request (`.github/PULL_REQUEST_TEMPLATE.md`)
```markdown
## 📌 Resumen de Cambios
Clave del Ticket de Jira: **[HAP-XXX](https://tu-dominio.atlassian.net/browse/HAP-XXX)**

Descripción clara de los cambios introducidos en esta rama y el motivo de la solución técnica adoptada.

## 🛠 Tipo de Cambio
- [ ] 🚀 Nueva funcionalidad (Feature)
- [ ] 🐛 Corrección de error (Bug fix)
- [ ] 💅 Refactorización o mejora visual (UI/Styles)
- [ ] ⚙️ Configuración, CI/CD o Tooling (Chore)
- [ ] 📝 Documentación (Docs)

## 🧪 Pruebas Realizadas
- [ ] Pruebas unitarias ejecutadas localmente (`npm test`)
- [ ] Validación de visualización responsive en emulador y dispositivo real
- [ ] Comprobación del Preview Deployment en Vercel sin errores en consola

## 📋 Lista de Verificación (Checklist DoD)
- [ ] Mi código sigue la guía de estilos y pasó el linter sin errores.
- [ ] El título de este PR sigue el formato `tipo(alcance): HAP-XXX descripción`.
- [ ] Se adjuntan capturas o videos en caso de cambios visuales.
- [ ] No existen archivos residuales ni `console.log` de depuración.

## 📸 Evidencias Visuales (Antes vs Después)
| Antes | Después |
| :---: | :---: |
| *(Captura previa)* | *(Captura con la mejora)* |
```

---

## 5. Dimensión 4: Gestión de Actividades en Jira

### 5.1 Estructura del Proyecto y Cadencia de Sprints
* **Tipo de Proyecto en Jira:** Scrum Software Development.
* **Clave de Proyecto (Key):** `HAP` (Tickets enumerados correlativamente: `HAP-1`, `HAP-2`, etc.).
* **Cadencia:** Sprints fijos de 2 semanas iniciando los días lunes a las 09:00 y cerrando los viernes de la segunda semana a las 18:00.
* **Ceremonias Ágiles Agendadas:**
  * *Sprint Planning:* Lunes inicial (2 horas).
  * *Daily Standup:* Lunes a Viernes (15 minutos vía Google Meet o asíncrono en Discord).
  * *Backlog Refinement:* Miércoles intermedio (1 hora).
  * *Sprint Review & Demo:* Viernes final (1 hora).
  * *Sprint Retrospective:* Viernes final (45 minutos, post-demo).

---

### 5.2 Flujo de Estados del Tablero (Workflow & Transitions)

```
[ Backlog ]
     │
     ▼ (Cumple DoR)
[ Ready for Dev ]
     │
     ▼ (Developer asignado toma el ticket)
[ In Progress ]
     │
     ▼ (PR abierto en GitHub + Vercel Preview activo)
[ Code Review ]
     │
     ▼ (1 aprobación de PR + checks de CI en verde)
[ QA & Testing ]
     │
     ▼ (Validación funcional aprobada + Merge a main)
[ Done (Producción) ]
```

#### Reglas de Transición y Validadores:
1. **Backlog ➔ Ready for Dev:** Solo el Tech Lead o PM pueden mover tickets tras verificar que cumplen la **DoR**.
2. **Ready ➔ In Progress:** Se asigna un responsable único. Límite de WIP (Work In Progress): máximo 2 tareas simultáneas por desarrollador.
3. **In Progress ➔ Code Review:** Obligatorio registrar el enlace al Pull Request de GitHub en el campo de desarrollo del ticket.
4. **Code Review ➔ QA & Testing:** El webhook de GitHub detecta el evento de aprobación de revisión y mueve el ticket automáticamente.
5. **QA ➔ Done:** Se valida contra los criterios Given/When/Then en la URL de producción.

---

### 5.3 Convención de Nomenclatura y Trazabilidad Git-Jira

Para permitir la sincronización bidireccional automática entre GitHub y Jira mediante GitHub for Jira Integration:

#### 1. Formato de Ramas:
```
tipo/HAP-[ID]-[nombre-descriptivo]
```
*Ejemplos:*
* `feature/HAP-101-menu-filtering`
* `bugfix/HAP-108-cart-subtotal-decimals`
* `chore/HAP-103-husky-commitlint-setup`

#### 2. Formato de Commits (Conventional Commits + Jira Smart Commits):
```
<tipo>(<alcance>): HAP-<ID> <descripción corta en imperativo>
```
*Tipos estándar:*
* `feat`: Nueva característica para el usuario.
* `fix`: Corrección de un defecto.
* `chore`: Cambios de infraestructura, dependencias o tooling.
* `style`: Ajustes de espaciado, colores, formato CSS sin impacto en lógica.
* `refactor`: Modificación de código que no arregla un bug ni agrega feature.
* `test`: Adición o modificación de pruebas unitarias o de integración.

*Ejemplos reales:*
* `feat(catalog): HAP-101 add filter buttons for chicken and combos`
* `fix(cart): HAP-108 prevent negative item quantity in order drawer`
* `test(order): HAP-105 add unit tests for whatsapp uri encoder`

---

## 6. Dimensión 5: Avance de Interfaces y Código del Proyecto

### 6.1 Roadmap de Diseño UI/UX en Figma
El flujo de diseño precede a la implementación de código para evitar reprocesos visuales:

```
[ Benchmarking & Moodboard ] ➔ [ Wireframes Baja Fidelidad ] ➔ [ Design System & Tokens ] ➔ [ Prototipos Alta Fidelidad ] ➔ [ Handoff a Desarrollo ]
```

1. **Fase 1: Wireframing de Flujos Críticos (Low-Fi):**
   * Diagramación de la arquitectura de la información: Navegación fija, Hero impactante, Grilla de Menú con filtros, Bloque de Promociones, Drawer/Sección de Pedido y Footer.
2. **Fase 2: Design System y Design Tokens:**
   * **Paleta Cromática (Identidad Happy Chicken):**
     * Primario (Brand Red): `#D62828` (Botones de acción, llamadas clave).
     * Secundario (Warm Orange): `#F77F00` (Acentos y badges de favoritos).
     * Fondo Cálido (Cream Warm): `#FFFDF9` (Fondo general amigable).
     * Superficie / Card (Pure White): `#FFFFFF` (Tarjetas de comida).
     * Texto Principal: `#1D1E2C` (Legibilidad óptima, ratio > 7:1).
   * **Tipografía:** Tipografías web de carga optimizada (Inter / Outfit para legibilidad, display con serifa cálida para títulos).
   * **Tokens de Espaciado y Radios:** Sistema basado en múltiplos de 8px (8px, 16px, 24px, 32px; Border radius estándar de 16px y 24px para cards).
3. **Fase 3: Prototipo Interactivo Alta Fidelidad (Hi-Fi):**
   * Microinteracciones modeladas: Efectos hover con elevación suave (`box-shadow`), animaciones de apertura del carrito, transiciones de badge al filtrar, feedback visual del botón "+" al agregar producto.

---

### 6.2 Arquitectura Front-End & Estructura de Directorios

El código base evoluciona de un archivo monolítico hacia una arquitectura modular, desacoplada y mantenible:

```
happy-chicken-landing/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/
│   │   └── ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── variables.css      <-- Design Tokens en CSS Custom Properties
│   │   │   └── typography.css
│   │   ├── components/
│   │   │   ├── button.css
│   │   │   ├── card.css
│   │   │   ├── cart.css
│   │   │   └── toast.css
│   │   └── layout/
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── menu.css
│   │       └── footer.css
│   ├── js/
│   │   ├── modules/
│   │   │   ├── cart.js            <-- Lógica del carrito de compras
│   │   │   ├── catalog.js         <-- Filtrado dinámico del menú
│   │   │   ├── whatsapp.js        <-- Generador de pedidos por WhatsApp
│   │   │   └── toast.js           <-- Sistema de notificaciones
│   │   ├── state/
│   │   │   └── store.js           <-- Estado global reactivo y persistencia
│   │   └── main.js                <-- Punto de entrada de la aplicación
├── tests/
│   ├── cart.test.js
│   ├── catalog.test.js
│   └── whatsapp.test.js
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── vercel.json
└── README.md
```

---

### 6.3 Linters, Formatters y Gobernanza de Entornos

#### 1. Estandarización de Código:
* **Prettier (`.prettierrc`):**
  ```json
  {
    "semi": true,
    "singleQuote": false,
    "tabWidth": 2,
    "trailingComma": "es5",
    "printWidth": 100
  }
  ```
* **ESLint (`.eslintrc.json`):** Reglas para ES6+, prevención de variables no utilizadas, prohibición de `alert()` y aplicación de buenas prácticas de manipulación del DOM.
* **Husky & lint-staged:** Impide que commits con errores de estilo o sintaxis lleguen al repositorio remoto.

#### 2. Gestión de Variables de Entorno:
* Archivo plantilla `.env.example`:
  ```bash
  # WhatsApp Integration
  VITE_WHATSAPP_PHONE_NUMBER=51999999999
  VITE_WHATSAPP_DEFAULT_MESSAGE="¡Hola Happy Chicken! Deseo realizar el siguiente pedido:"

  # Analytics & Monitoring
  VITE_ENABLE_ANALYTICS=false
  ```
* Las variables sensibles o llaves de despliegue se configuran directamente en los paneles de **GitHub Secrets** y **Vercel Project Settings**, garantizando que jamás se commiteen credenciales al repositorio.

---

## 7. Matriz de Tareas y Backlog Operativo en Jira

A continuación se presenta el Backlog Operativo detallado con las Historias de Usuario y Tareas Técnicas listas para ser importadas a Jira.

| ID Clave | Épica Asociada | Tipo | Título de la Historia / Tarea | Criterios de Aceptación (Given / When / Then) | Prioridad | Dependencias Técnicas |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **HAP-101** | **EPIC-1: Procesos y Gobernanza** | Tarea | Documentación y oficialización de DoD, DoR y ciclo SDLC | **Given** el equipo inicia el Sprint 0<br>**When** se aprueban las políticas de calidad<br>**Then** el archivo `CONTRIBUTING.md` y las definiciones de DoD/DoR están mergeadas en `main`. | **Alta** | Ninguna |
| **HAP-102** | **EPIC-2: DevOps & CI/CD** | Tarea | Configuración del Pipeline de Integración Continua con GitHub Actions | **Given** un desarrollador abre un Pull Request hacia `main`<br>**When** GitHub detecta el evento `pull_request`<br>**Then** el workflow `ci.yml` ejecuta linters y pruebas unitarias, bloqueando el merge si algún check falla. | **Alta** | HAP-101 |
| **HAP-103** | **EPIC-2: DevOps & CI/CD** | Tarea | Integración de Vercel con Preview Deployments y rama `main` en producción | **Given** un PR con checks de CI aprobados<br>**When** Vercel detecta la rama activa<br>**Then** genera un Preview Deployment con URL pública para pruebas y despliega automáticamente a producción al fusionar en `main`. | **Alta** | HAP-102 |
| **HAP-104** | **EPIC-3: Herramientas y Colaboración** | Tarea | Creación de Plantillas de Issue (Bugs/Features) y Pull Request en GitHub | **Given** un colaborador reporta un error o solicita un cambio<br>**When** hace clic en "New Issue" o "New PR"<br>**Then** se despliegan automáticamente los formularios estructurados en `.github/`. | **Media** | HAP-101 |
| **HAP-105** | **EPIC-3: Herramientas y Colaboración** | Tarea | Configuración de Canales de Discord y Webhooks de Notificación GitHub | **Given** una acción de push, apertura de PR o fallo de build en GitHub<br>**When** se dispara el webhook<br>**Then** el canal `#github-bots` de Discord recibe una alerta inmediata con enlace directo al commit o PR. | **Baja** | HAP-102 |
| **HAP-106** | **EPIC-4: Gestión en Jira** | Tarea | Configuración del Tablero Scrum de Jira, Flujos de Trabajo y Smart Commits | **Given** el workspace de Jira creado<br>**When** se configuran los estados `Backlog` ➔ `Ready` ➔ `In Progress` ➔ `Code Review` ➔ `QA` ➔ `Done`<br>**Then** los commits con prefijo `HAP-XXX` actualizan automáticamente el estado del ticket. | **Alta** | HAP-101 |
| **HAP-107** | **EPIC-5: Diseño UI/UX** | Historia | Creación del Design System y Librería de Componentes en Figma | **Given** los requerimientos de marca de Happy Chicken<br>**When** el diseñador define colores, tipografía y cards en Figma<br>**Then** se exportan los Design Tokens documentados para su posterior mapeo a variables CSS. | **Alta** | Ninguna |
| **HAP-108** | **EPIC-5: Diseño UI/UX** | Historia | Prototipado Interactivo de Flujo de Menú y Carrito de Compras en Figma | **Given** los wireframes aprobados<br>**When** el usuario interactúa con el prototipo móvil en Figma<br>**Then** puede filtrar platos, añadir al carrito y simular la confirmación del pedido fluidamente. | **Media** | HAP-107 |
| **HAP-109** | **EPIC-6: Frontend Core** | Tarea | Modularización de la Arquitectura CSS y Tokens con Custom Properties | **Given** el archivo `styles.css` monolítico actual<br>**When** se refactoriza siguiendo metodología BEM y variables en `:root`<br>**Then** los estilos quedan divididos en `base/`, `components/` y `layout/` sin alteraciones visuales. | **Alta** | HAP-107 |
| **HAP-110** | **EPIC-6: Frontend Core** | Historia | Filtrado Dinámico de Categorías en el Menú de Platos | **Given** que el cliente navega en la sección `#menu`<br>**When** hace clic en el filtro "Pollo", "Combos" o "Acompañamientos"<br>**Then** se muestran exclusivamente los productos correspondientes con una animación suave de transición. | **Alta** | HAP-109 |
| **HAP-111** | **EPIC-6: Frontend Core** | Historia | Componente Card Accesible con Badges de Promoción y Precios Dinámicos | **Given** un plato con atributo especial (ej. "Favorito", "Nuevo")<br>**When** la tarjeta se renderiza en la pantalla<br>**Then** muestra la imagen optimizada, descripción, precio en Soles (S/) y botón accesible con `aria-label`. | **Media** | HAP-109 |
| **HAP-112** | **EPIC-7: Carrito & Checkout** | Historia | Carrito de Compras Reactivo con Suma de Totales y Persistencia Local | **Given** que el usuario añade uno o más ítems al pedido<br>**When** actualiza o recarga el navegador<br>**Then** los productos, cantidades y el cálculo del total se conservan intactos mediante `localStorage`. | **Alta** | HAP-110 |
| **HAP-113** | **EPIC-7: Carrito & Checkout** | Historia | Despacho de Pedido Automatizado hacia API de WhatsApp | **Given** que el usuario tiene al menos 1 producto en el carrito<br>**When** hace clic en "Continuar pedido"<br>**Then** se abre WhatsApp con un mensaje preformateado y codificado conteniendo el desglose de productos y el monto final. | **Alta** | HAP-112 |
| **HAP-114** | **EPIC-7: Carrito & Checkout** | Historia | Manejo de Estado Vacío y Notificaciones Toast de Feedback | **Given** que el usuario vacía el carrito o añade un ítem<br>**When** se produce la acción<br>**Then** se muestra un Toast visual y accesible informando el estado exacto sin interrumpir la navegación. | **Media** | HAP-112 |
| **HAP-115** | **EPIC-8: Calidad & Release** | Tarea | Suite de Pruebas Unitarias para Lógica de Carrito y Generador de Mensajes | **Given** las funciones `calculateTotal()` y `formatWhatsAppMessage()`<br>**When** se ejecutan los tests automatizados (`npm test`)<br>**Then** cubren el 100% de los casos límite (cantidades en cero, decimales, caracteres especiales). | **Alta** | HAP-112, HAP-113 |
| **HAP-116** | **EPIC-8: Calidad & Release** | Tarea | Auditoría de Performance Lighthouse, Optimización WebP y Despliegue v1.0.0 | **Given** la aplicación desplegada en Vercel Producción<br>**When** se ejecuta la auditoría de Lighthouse<br>**Then** todas las métricas superan 90 puntos y el LCP es menor a 2.5 segundos en redes móviles 4G. | **Alta** | HAP-114, HAP-115 |

---

## 8. Consideraciones Finales del Tech Lead
1. **Disciplina de Ramas:** Todo commit debe pertenecer a una rama de feature y estar respaldado por un ticket de Jira. No se tolera código no versionado o desarrollado a espaldas del backlog.
2. **Cero Tolerancia a la Deuda Técnica Invisible:** Si una tarea requiere refactorizar código existente (como la partición de `styles.css` o `script.js`), se estima y aborda explícitamente dentro del Sprint.
3. **Validación Continua:** Las revisiones de PR no son un trámite burocrático; son el filtro principal de calidad, seguridad y mentoría del equipo.
