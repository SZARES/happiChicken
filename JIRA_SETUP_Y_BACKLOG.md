# Guía de Carga y Backlog Operativo para Jira

## Proyecto: Happy Chicken Web Ordering & Landing Platform

**Clave de Proyecto Sugerida (Project Key):** `HAP`  
**Tipo de Proyecto:** Jira Software — Scrum (Team-managed o Company-managed)  
**Lead:** Tech Lead / Senior Project Manager

---

## Índice

1. [Configuración Inicial del Tablero y Flujo de Estados](#1-configuración-inicial-del-tablero-y-flujo-de-estados)
2. [Definición de Sprints y Objetivos (Sprint Goals)](#2-definición-de-sprints-y-objetivos-sprint-goals)
3. [Registro de Épicas (Epics)](#3-registro-de-épicas-epics)
4. [Fichas de Tickets para Carga Individual (Copy-Paste)](#4-fichas-de-tickets-para-carga-individual-copy-paste)
5. [Plantilla CSV para Importación Masiva (Jira External System Import)](#5-plantilla-csv-para-importación-masiva-jira-external-system-import)

---

## 1. Configuración Inicial del Tablero y Flujo de Estados

### 1.1 Configuración General

- **Project Name:** Happy Chicken Web Platform
- **Project Key:** `HAP`
- **Issue Types requeridos:**
  - 🟣 **Epic:** Agrupador de alto nivel de valor de negocio o arquitectura.
  - 🟢 **Story:** Historia de usuario con valor directo para el cliente.
  - 🔵 **Task:** Tarea técnica de ingeniería, DevOps o configuración.
  - 🔴 **Bug:** Defecto o regresión identificada en el sistema.
  - 🪟 **Sub-task:** Subdivisión de trabajo técnico dentro de una Story o Task.

### 1.2 Columnas del Tablero (Board Columns) y Mapeo de Estados

Configura el tablero Kanban/Scrum con las siguientes 6 columnas y límites de trabajo en progreso (WIP Limits):

| Columna en Jira   | Estado Asociado            |     WIP Limit      | Criterio de Entrada / Salida                                               |
| :---------------- | :------------------------- | :----------------: | :------------------------------------------------------------------------- |
| **Backlog**       | `Backlog`                  |     Sin límite     | Tareas identificadas aún no priorizadas para el sprint activo.             |
| **Ready for Dev** | `Selected for Development` |       Máx. 6       | Cumple al 100% la **Definition of Ready (DoR)**.                           |
| **In Progress**   | `In Progress`              | **Máx. 2 por Dev** | Desarrollador asignado activamente programando. Rama Git creada.           |
| **Code Review**   | `In Review`                |       Máx. 4       | Pull Request abierto en GitHub y Preview Deployment activo en Vercel.      |
| **QA & Testing**  | `Under QA`                 |       Máx. 3       | Checks de CI en verde y 1 aprobación técnica de par. Validación funcional. |
| **Done**          | `Done` / `Closed`          |     Sin límite     | Cumple al 100% la **Definition of Done (DoD)** y está mergeado en `main`.  |

---

## 2. Definición de Sprints y Objetivos (Sprint Goals)

Crea estos 4 Sprints en el backlog de Jira:

### 🟡 Sprint 0: Setup, Infraestructura y Gobernanza

- **Duración:** 2 semanas
- **Sprint Goal:** _"Establecer la infraestructura de CI/CD con GitHub Actions y Vercel, definir las políticas de ingeniería (DoD/DoR) y consolidar el Design System base en Figma para habilitar el desarrollo ágil sin bloqueos."_

### 🟢 Sprint 1: Catálogo Interactivo y Componentes Base

- **Duración:** 2 semanas
- **Sprint Goal:** _"Entregar la interfaz modular del catálogo gastronómico de Happy Chicken, permitiendo al usuario filtrar visualmente entre Pollo, Combos y Acompañamientos con microinteracciones fluidas y responsive."_

### 🔵 Sprint 2: Motor de Carrito y Checkout vía WhatsApp

- **Duración:** 2 semanas
- **Sprint Goal:** _"Completar el flujo transaccional en cliente: selección de productos, persistencia en LocalStorage y generación automática del mensaje estructurado hacia la API de WhatsApp para el cierre del pedido."_

### 🟣 Sprint 3: Calidad, Performance y Release a Producción

- **Duración:** 2 semanas
- **Sprint Goal:** _"Optimizar activos a WebP, auditar accesibilidad y rendimiento en Lighthouse superando los 90 puntos, ejecutar pruebas unitarias completas y desplegar la versión estable v1.0.0 en producción."_

---

## 3. Registro de Épicas (Epics)

Crea primero estas 6 épicas en Jira para que luego puedas vincular cada ticket:

| Epic Key Sugerida | Nombre de la Épica               | Color Sugerido  | Descripción                                                                                     |
| :---------------- | :------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------- |
| `HAP-EPIC-1`      | **Gobernanza y Procesos SDLC**   | Gris / Slate    | Ciclo de vida del software, estándares de equipo, DoD, DoR y políticas de colaboración.         |
| `HAP-EPIC-2`      | **DevOps & Pipeline CI/CD**      | Azul Marino     | Automatización con GitHub Actions, despliegues automáticos en Vercel y protección de ramas.     |
| `HAP-EPIC-3`      | **Diseño UI/UX & Design System** | Violeta         | Wireframes, prototipos interactivos en Figma y tokens de diseño (colores, fuentes, espacios).   |
| `HAP-EPIC-4`      | **Frontend Core & Catálogo**     | Naranja         | Modularización de CSS/JS, componentes de tarjetas de platos y filtrado dinámico en tiempo real. |
| `HAP-EPIC-5`      | **Carrito & Checkout WhatsApp**  | Verde Esmeralda | Lógica de carrito reactivo, persistencia en navegador y despacho de orden a WhatsApp API.       |
| `HAP-EPIC-6`      | **Testing, Calidad & Release**   | Rojo Crimson    | Pruebas unitarias automatizadas, optimización Lighthouse y despliegue final v1.0.0.             |

---

## 4. Fichas de Tickets para Carga Individual (Copy-Paste)

Copia y pega el contenido de cada bloque en la ventana **"Create Issue"** de Jira:

---

### 📦 SPRINT 0 (Setup & Infraestructura)

#### Ticket 1: HAP-101

- **Issue Type:** `Task`
- **Epic:** `Gobernanza y Procesos SDLC`
- **Summary:** Documentación y oficialización de DoD, DoR y ciclo de vida SDLC
- **Priority:** `High`
- **Story Points:** `3`
- **Labels:** `governance`, `documentation`, `agile`
- **Rama Git Sugerida:** `docs/HAP-101-sdlc-dod-dor`
- **Description:**

```text
h2. Objetivo
Definir, documentar y oficializar los estándares de calidad del equipo para evitar deuda técnica y garantizar criterios de aceptación unificados antes de comenzar el desarrollo de funcionalidades.

h2. Criterios de Aceptación (Given / When / Then)
* Given el inicio formal del Sprint 0 del proyecto Happy Chicken
* When el equipo técnico y el Tech Lead revisan las políticas de ingeniería
* Then se crea y mergea en main el archivo CONTRIBUTING.md con:
  - Definición de Listo (Definition of Ready - DoR).
  - Definición de Hecho (Definition of Done - DoD).
  - Flujo de estados de Jira y convención de ramas y commits.

h2. Subtareas Técnicas Sugeridas
1. Redactar checklist de DoR y DoD.
2. Documentar flujo de transiciones de tickets.
3. Crear CONTRIBUTING.md en la raíz del repositorio.
```

---

#### Ticket 2: HAP-102

- **Issue Type:** `Task`
- **Epic:** `DevOps & Pipeline CI/CD`
- **Summary:** Configuración del Pipeline de Integración Continua con GitHub Actions
- **Priority:** `Highest`
- **Story Points:** `5`
- **Labels:** `devops`, `ci`, `github-actions`
- **Rama Git Sugerida:** `chore/HAP-102-ci-pipeline-setup`
- **Description:**

```text
h2. Objetivo
Implementar un pipeline automatizado de CI que valide sintaxis, linters y pruebas unitarias en cada push y pull request hacia la rama main.

h2. Criterios de Aceptación (Given / When / Then)
* Given un desarrollador abre un Pull Request dirigido a la rama main
* When GitHub detecta el evento de pull_request
* Then se dispara el workflow .github/workflows/ci.yml ejecutando:
  - Instalación determinística con npm ci.
  - Validación de estilos y marcado (linting).
  - Ejecución de pruebas unitarias con reporte de cobertura.
* And si cualquiera de los checks falla, el merge queda estrictamente bloqueado.

h2. Subtareas Técnicas Sugeridas
1. Crear archivo .github/workflows/ci.yml.
2. Configurar scripts de npm para lint y test en package.json.
3. Probar ejecución con un PR de prueba forzando fallo y éxito.
```

---

#### Ticket 3: HAP-103

- **Issue Type:** `Task`
- **Epic:** `DevOps & Pipeline CI/CD`
- **Summary:** Integración de Vercel con Preview Deployments y Producción en main
- **Priority:** `Highest`
- **Story Points:** `3`
- **Labels:** `devops`, `cd`, `vercel`
- **Rama Git Sugerida:** `chore/HAP-103-vercel-integration`
- **Description:**

```text
h2. Objetivo
Vincular el repositorio de GitHub con Vercel para disponer de entornos de prueba efímeros por cada PR (Preview) y despliegue automático a producción tras el merge a main.

h2. Criterios de Aceptación (Given / When / Then)
* Given un Pull Request creado en GitHub con checks de CI aprobados
* When el bot de Vercel detecta la rama activa
* Then genera un Preview Deployment con una URL única accesible para el equipo de QA
* And al fusionar el PR en main, se actualiza automáticamente el despliegue de producción oficial en menos de 90 segundos.

h2. Subtareas Técnicas Sugeridas
1. Conectar proyecto SZARES/happiChicken en panel de Vercel.
2. Configurar variables de entorno iniciales en Vercel Project Settings.
3. Validar generación de URL de preview en un PR de prueba.
```

---

#### Ticket 4: HAP-104

- **Issue Type:** `Task`
- **Epic:** `Gobernanza y Procesos SDLC`
- **Summary:** Creación de Plantillas de Issue (Bugs / Features) y Pull Request en GitHub
- **Priority:** `Medium`
- **Story Points:** `2`
- **Labels:** `templates`, `github`, `process`
- **Rama Git Sugerida:** `docs/HAP-104-github-templates`
- **Description:**

```text
h2. Objetivo
Estandarizar la comunicación de incidentes, solicitudes de cambio y revisiones de código en GitHub mediante plantillas estructuradas.

h2. Criterios de Aceptación (Given / When / Then)
* Given un colaborador en el repositorio de GitHub
* When hace clic en "New Issue" o "New Pull Request"
* Then se despliegan automáticamente los formularios oficiales:
  - bug_report.md (Pasos de reproducción, comportamiento esperado y ambiente).
  - feature_request.md (Historia de usuario, criterios Given/When/Then y enlace Figma).
  - PULL_REQUEST_TEMPLATE.md (Tipo de cambio, checklist DoD y capturas antes/después).

h2. Subtareas Técnicas Sugeridas
1. Crear directorio .github/ISSUE_TEMPLATE/.
2. Crear archivo .github/PULL_REQUEST_TEMPLATE.md.
3. Probar creación de issue y PR en la interfaz web de GitHub.
```

---

#### Ticket 5: HAP-105

- **Issue Type:** `Task`
- **Epic:** `Gobernanza y Procesos SDLC`
- **Summary:** Configuración de canales de Discord y Webhooks de Notificación GitHub
- **Priority:** `Low`
- **Story Points:** `2`
- **Labels:** `collaboration`, `discord`, `webhooks`
- **Rama Git Sugerida:** `chore/HAP-105-discord-webhooks`
- **Description:**

```text
h2. Objetivo
Configurar el servidor de Discord del equipo con canales temáticos y webhooks automatizados para monitorear la actividad del repositorio en tiempo real.

h2. Criterios de Aceptación (Given / When / Then)
* Given una acción de push, apertura de PR o fallo de build en GitHub
* When se dispara el webhook configurado
* Then el canal #github-bots de Discord recibe una alerta inmediata con enlace al autor y commit
* And se habilitan los canales #anuncios-importantes, #desarrollo-frontend y #diseno-ux-ui.
```

---

#### Ticket 6: HAP-106

- **Issue Type:** `Task`
- **Epic:** `Gobernanza y Procesos SDLC`
- **Summary:** Configuración del Tablero Scrum en Jira y Smart Commits con GitHub
- **Priority:** `High`
- **Story Points:** `3`
- **Labels:** `jira`, `project-management`, `traceability`
- **Rama Git Sugerida:** `chore/HAP-106-jira-smart-commits`
- **Description:**

```text
h2. Objetivo
Configurar el flujo de estados de Jira y la integración GitHub for Jira para sincronizar automáticamente el avance de tareas con los commits y PRs.

h2. Criterios de Aceptación (Given / When / Then)
* Given un desarrollador trabajando en una rama vinculada a un ticket (ej. feature/HAP-110-filters)
* When realiza un commit con el prefijo "feat(catalog): HAP-110 ..." o abre un PR
* Then el ticket en Jira muestra el commit enlazado en el panel de desarrollo y actualiza su estado automáticamente según el workflow.
```

---

#### Ticket 7: HAP-107

- **Issue Type:** `Story`
- **Epic:** `Diseño UI/UX & Design System`
- **Summary:** Creación del Design System y Librería de Tokens en Figma
- **Priority:** `High`
- **Story Points:** `5`
- **Labels:** `design-system`, `figma`, `ui-tokens`
- **Rama Git Sugerida:** N/A (Entregable en Figma)
- **Description:**

```text
h2. Historia de Usuario
Como diseñador de producto y desarrollador frontend
Quiero un sistema de diseño estandarizado en Figma con tokens de color, tipografía y componentes
Para asegurar consistencia visual y agilizar la maquetación en código CSS.

h2. Criterios de Aceptación (Given / When / Then)
* Given la identidad visual de la pollería Happy Chicken
* When se construye el archivo de diseño en Figma
* Then se especifican los Design Tokens:
  - Primario Brand Red: #D62828
  - Acento Warm Orange: #F77F00
  - Fondo Cálido: #FFFDF9
  - Superficie Card: #FFFFFF
  - Texto Contraste: #1D1E2C (Ratio > 7:1)
  - Escala tipográfica y espaciado en múltiplos de 8px.
```

---

### 🍔 SPRINT 1 (Core & Catálogo)

#### Ticket 8: HAP-108

- **Issue Type:** `Story`
- **Epic:** `Diseño UI/UX & Design System`
- **Summary:** Prototipado interactivo de alta fidelidad para Menú y Carrito en Figma
- **Priority:** `Medium`
- **Story Points:** `5`
- **Labels:** `figma`, `prototyping`, `ux-research`
- **Rama Git Sugerida:** N/A (Entregable en Figma)
- **Description:**

```text
h2. Historia de Usuario
Como cliente potencial de Happy Chicken
Quiero interactuar con un prototipo navegable en móvil y desktop
Para validar que el flujo de selección de platos y armado de pedido es intuitivo y sin fricciones.

h2. Criterios de Aceptación (Given / When / Then)
* Given los wireframes iniciales aprobados
* When el usuario interactúa con el prototipo móvil en Figma
* Then puede alternar entre categorías de comida, simular agregar productos al pedido y visualizar el drawer del carrito con microinteracciones de feedback.
```

---

#### Ticket 9: HAP-109

- **Issue Type:** `Task`
- **Epic:** `Frontend Core & Catálogo`
- **Summary:** Modularización de arquitectura CSS con Custom Properties y Metodología BEM
- **Priority:** `Highest`
- **Story Points:** `5`
- **Labels:** `css`, `refactor`, `architecture`
- **Rama Git Sugerida:** `feature/HAP-109-css-modularization`
- **Description:**

```text
h2. Objetivo
Refactorizar el archivo styles.css monolítico en una estructura desacoplada y escalable bajo metodología BEM y variables en :root.

h2. Criterios de Aceptación (Given / When / Then)
* Given la hoja de estilos actual del proyecto
* When se reorganiza la arquitectura de carpetas
* Then los estilos quedan particionados en:
  - src/css/base/ (reset, variables, typography).
  - src/css/components/ (button, card, cart, toast).
  - src/css/layout/ (header, hero, menu, footer).
* And la apariencia visual del sitio se mantiene idéntica sin romper responsive.
```

---

#### Ticket 10: HAP-110

- **Issue Type:** `Story`
- **Epic:** `Frontend Core & Catálogo`
- **Summary:** Filtrado dinámico por categorías en el menú sin recargas de página
- **Priority:** `Highest`
- **Story Points:** `5`
- **Labels:** `javascript`, `dom`, `catalog`
- **Rama Git Sugerida:** `feature/HAP-110-menu-category-filter`
- **Description:**

```text
h2. Historia de Usuario
Como cliente con un antojo específico
Quiero filtrar los productos por "Pollo", "Combos" o "Acompañamientos"
Para encontrar rápidamente lo que deseo pedir sin tener que ver todo el menú completo.

h2. Criterios de Aceptación (Given / When / Then)
* Given que el usuario se encuentra en la sección #menu
* When hace clic en cualquiera de los botones de filtro (ej. "Combos")
* Then el sistema oculta los productos no coincidentes y muestra solo los pertenecientes a dicha categoría con una transición suave
* And el botón activo recibe visualmente la clase .active y el atributo aria-selected="true".
```

---

#### Ticket 11: HAP-111

- **Issue Type:** `Story`
- **Epic:** `Frontend Core & Catálogo`
- **Summary:** Componente de tarjeta de producto accesible con badges promocionales
- **Priority:** `Medium`
- **Story Points:** `3`
- **Labels:** `a11y`, `components`, `ui`
- **Rama Git Sugerida:** `feature/HAP-111-accessible-food-cards`
- **Description:**

```text
h2. Historia de Usuario
Como usuario de lectores de pantalla o comprador digital
Quiero tarjetas de producto claras con nombre, imagen, descripción, precio y badges
Para entender de un vistazo qué incluye el plato y poder agregarlo fácilmente.

h2. Criterios de Aceptación (Given / When / Then)
* Given un plato con atributo especial (ej. "Favorito", "Nuevo")
* When la tarjeta se renderiza en el DOM
* Then muestra la imagen con atributo alt descriptivo, precio formateado en Soles (S/ XX.XX) y un botón de adición con atributo aria-label="Agregar [Nombre del Producto] al pedido".
```

---

### 🍗 SPRINT 2 (Carrito & WhatsApp Checkout)

#### Ticket 12: HAP-112

- **Issue Type:** `Story`
- **Epic:** `Carrito & Checkout WhatsApp`
- **Summary:** Carrito de compras reactivo con persistencia en LocalStorage
- **Priority:** `Highest`
- **Story Points:** `8`
- **Labels:** `cart`, `state-management`, `localstorage`
- **Rama Git Sugerida:** `feature/HAP-112-reactive-cart-localstorage`
- **Description:**

```text
h2. Historia de Usuario
Como usuario que arma su pedido
Quiero añadir, modificar cantidades o eliminar ítems del carrito y que se guarden si recargo la página
Para no perder mi selección de comida si cierro accidentalmente el navegador.

h2. Criterios de Aceptación (Given / When / Then)
* Given que el usuario añade uno o más ítems al pedido
* When navega por el sitio o refresca la página
* Then el estado del carrito se recupera intacto desde localStorage
* And el cálculo del subtotal y total se actualiza en tiempo real de forma exacta sin errores de redondeo.
```

---

#### Ticket 13: HAP-113

- **Issue Type:** `Story`
- **Epic:** `Carrito & Checkout WhatsApp`
- **Summary:** Generación y despacho automático de pedido formateado hacia WhatsApp API
- **Priority:** `Highest`
- **Story Points:** `5`
- **Labels:** `checkout`, `whatsapp-api`, `integration`
- **Rama Git Sugerida:** `feature/HAP-113-whatsapp-checkout-payload`
- **Description:**

```text
h2. Historia de Usuario
Como cliente listo para pagar su pedido
Quiero pulsar un botón para enviar mi orden directamente al WhatsApp de Happy Chicken
Para coordinar la entrega o recojo de forma rápida y personalizada.

h2. Criterios de Aceptación (Given / When / Then)
* Given que el carrito contiene al menos 1 ítem válido
* When el usuario hace clic en el botón "Continuar pedido"
* Then el sistema genera una URL encodeada hacia https://wa.me/51... conteniendo:
  - Saludo formal.
  - Lista de productos con cantidades y subtotales.
  - Monto total en Soles (S/).
* And abre la aplicación de WhatsApp en una nueva pestaña segura (rel="noopener").
```

---

#### Ticket 14: HAP-114

- **Issue Type:** `Story`
- **Epic:** `Carrito & Checkout WhatsApp`
- **Summary:** Feedback de usuario con Toasts no intrusivos y estados vacíos del carrito
- **Priority:** `Medium`
- **Story Points:** `3`
- **Labels:** `microinteractions`, `toast`, `ux`
- **Rama Git Sugerida:** `feature/HAP-114-cart-toast-empty-states`
- **Description:**

```text
h2. Historia de Usuario
Como usuario interactuando con el sistema
Quiero recibir confirmación visual instantánea cada vez que agrego o vacío un pedido
Para tener certidumbre de mis acciones en la plataforma.

h2. Criterios de Aceptación (Given / When / Then)
* Given que el usuario pulsa en el botón "+" de un plato o en "Vaciar"
* When la acción se completa
* Then aparece un Toast flotante accesible (role="status", aria-live="polite") que se auto-oculta tras 2.2 segundos sin bloquear la pantalla.
```

---

### 🚀 SPRINT 3 (Calidad, Performance & Release)

#### Ticket 15: HAP-115

- **Issue Type:** `Task`
- **Epic:** `Testing, Calidad & Release`
- **Summary:** Suite de pruebas unitarias para lógica de carrito y payload de WhatsApp
- **Priority:** `Highest`
- **Story Points:** `5`
- **Labels:** `testing`, `unit-tests`, `quality`
- **Rama Git Sugerida:** `test/HAP-115-unit-testing-cart`
- **Description:**

```text
h2. Objetivo
Crear una batería de pruebas unitarias automatizadas para blindar la lógica de negocio del carrito contra regresiones.

h2. Criterios de Aceptación (Given / When / Then)
* Given las funciones del módulo cart.js y whatsapp.js
* When se ejecuta el comando npm test en local o en el pipeline de GitHub Actions
* Then se ejecutan las pruebas verificando:
  - Cálculo correcto de totales con decimales.
  - Prevención de cantidades negativas o nulas.
  - Codificación correcta de caracteres especiales (acentos, emojis) en la URL de WhatsApp.
* And la cobertura supera el 80% en los módulos de lógica pura.
```

---

#### Ticket 16: HAP-116

- **Issue Type:** `Task`
- **Epic:** `Testing, Calidad & Release`
- **Summary:** Optimización de activos WebP, auditoría Lighthouse 90+ y Release v1.0.0
- **Priority:** `Highest`
- **Story Points:** `5`
- **Labels:** `performance`, `lighthouse`, `release`
- **Rama Git Sugerida:** `chore/HAP-116-performance-release-v1`
- **Description:**

```text
h2. Objetivo
Optimizar la carga de la plataforma en producción para cumplir con los estándares de Core Web Vitals de Google y publicar la versión final del proyecto.

h2. Criterios de Aceptación (Given / When / Then)
* Given el despliegue oficial en Vercel Producción
* When se ejecuta una auditoría de Google Lighthouse en dispositivo móvil
* Then todas las métricas (Performance, Accesibilidad, Best Practices y SEO) superan los 90 puntos
* And el Largest Contentful Paint (LCP) es inferior a 2.5 segundos
* And se publica el Tag de Git v1.0.0 en el repositorio oficial.
```

---

## 5. Plantilla CSV para Importación Masiva (Jira External System Import)

Si prefieres no cargar los tickets uno por uno a mano, Jira permite importar archivos CSV directamente desde **Settings > System > External System Import > CSV**.

Guarda el siguiente bloque como `jira_tickets_happichicken.csv` y súbelo a Jira mapeando los campos correspondientes:

```csv
Issue Type,Key,Summary,Description,Priority,Story Points,Epic Link,Labels
Task,HAP-101,Documentación y oficialización de DoD DoR y ciclo SDLC,Definición de políticas de ingeniería y DoR/DoD en CONTRIBUTING.md,High,3,Gobernanza y Procesos SDLC,governance;documentation
Task,HAP-102,Configuración del Pipeline de CI con GitHub Actions,Workflow automatizado en GitHub Actions para linting y pruebas unitarias,Highest,5,DevOps & Pipeline CI/CD,devops;ci
Task,HAP-103,Integración de Vercel con Preview Deployments y Producción,Despliegues automáticos efímeros por PR y producción en main,Highest,3,DevOps & Pipeline CI/CD,devops;cd
Task,HAP-104,Creación de Plantillas de Issue y PR en GitHub,Plantillas oficiales de bug report feature request y pull request,Medium,2,Gobernanza y Procesos SDLC,templates;github
Task,HAP-105,Configuración de canales de Discord y Webhooks,Canales de comunicación del equipo y alertas automáticas de commits y PRs,Low,2,Gobernanza y Procesos SDLC,discord;collaboration
Task,HAP-106,Configuración del Tablero Scrum en Jira y Smart Commits,Tablero Jira configurado con flujo de estados y trazabilidad con GitHub,High,3,Gobernanza y Procesos SDLC,jira;management
Story,HAP-107,Creación del Design System y Tokens en Figma,Paleta cromática tokens de espaciado y tipografía en Figma,High,5,Diseño UI/UX & Design System,figma;design-system
Story,HAP-108,Prototipado interactivo de Menú y Carrito en Figma,Prototipo navegable móvil y desktop de los flujos de catálogo y pedido,Medium,5,Diseño UI/UX & Design System,figma;ux
Task,HAP-109,Modularización de arquitectura CSS con BEM y Custom Properties,Refactorización de styles.css en arquitectura modular base components layout,Highest,5,Frontend Core & Catálogo,css;refactor
Story,HAP-110,Filtrado dinámico por categorías en el menú,Filtros de Pollo Combos y Acompañamientos en el DOM sin recargas,Highest,5,Frontend Core & Catálogo,javascript;dom
Story,HAP-111,Componente de tarjeta de producto accesible con badges,Cards de producto con precios formateados en Soles y aria-labels,Medium,3,Frontend Core & Catálogo,a11y;components
Story,HAP-112,Carrito de compras reactivo con persistencia en LocalStorage,Gestión de estado del carrito cálculo de totales y sincronización en navegador,Highest,8,Carrito & Checkout WhatsApp,cart;localstorage
Story,HAP-113,Generación de pedido formateado hacia WhatsApp API,Despacho de orden con desglose de ítems y total a la API de WhatsApp,Highest,5,Carrito & Checkout WhatsApp,checkout;whatsapp
Story,HAP-114,Feedback de usuario con Toasts y estados vacíos,Notificaciones emergentes accesibles y vista de pedido vacío amigable,Medium,3,Carrito & Checkout WhatsApp,ux;toast
Task,HAP-115,Suite de pruebas unitarias para carrito y WhatsApp payload,Tests automatizados con cobertura sobre cálculo de totales y encoding,Highest,5,Testing Calidad & Release,testing;unit-tests
Task,HAP-116,Optimización WebP auditoría Lighthouse 90+ y Release v1.0.0,Auditoría de Core Web Vitals en producción y lanzamiento oficial v1.0.0,Highest,5,Testing Calidad & Release,performance;release
```
