# 🥢 Makoto Sushi — Web Oficial

> **Adictos al Verdadero Sabor Japonés.** Sitio web de presentación y pedidos para Makoto Sushi / Letsgo Sushi, una de las mejores barras de sushi de Venezuela, con presencia en múltiples sedes.

---

## 📖 ¿De qué va este proyecto?

Hoy el negocio funciona con una página de Google Sites que envían a los clientes para que vean el menú y decidan qué pedir, cerrando el pedido por WhatsApp. Este proyecto la reemplaza con una web moderna, rápida y operativa:

- **Landing de presentación** de la marca (historia, propuesta de valor, promociones, reseñas).
- **Catálogo completo del menú** organizado por categorías (Ejecutivo, Entradas, Combos, Poke, Tempurizados, Fríos, Barcos y Tortas, Platos Calientes...).
- **Página por sede** con horarios, dirección, mapa y modalidad (restaurante / delivery / pick-up).
- **Carrito que termina en WhatsApp**: el cliente arma su pedido en la web, completa sus datos (nombre, teléfono, cédula, método de pago, delivery o pick-up) y lo envía con un solo clic al WhatsApp de la sede elegida. Sin backend, sin costos.

## 🛠️ Stack tecnológico

| Capa | Tecnología | Rol |
|---|---|---|
| Framework | **Astro 7** | Sitio estático, ultrarrápido, JS solo donde hace falta |
| Estilos | **Tailwind CSS v4** | Sistema de diseño "Japanese UI": papel washi, tinta sumi y un acento (ver `DESIGN.md`) |
| Interactividad | **Script de cliente + localStorage** | Carrito y checkout → WhatsApp (sin framework de UI) |
| Contenido | **JSON en el repo** (+ CMS Sanity para el personal) | Menú y sedes editables sin tocar código |
| SEO | **@astrojs/sitemap + JSON-LD + OG/Twitter cards** | Sitemap XML, canonical, datos estructurados `Restaurant` |
| Typecheck | **TypeScript estricto (`astro check`)** | 0 errores en componentes, contenido y scripts |
| Hosting | **Cloudflare Pages** (free) | CI/CD desde este repo |

## 📂 Estructura del proyecto

```
MakotoSushi/
├── README.md              # Este archivo
├── DESIGN.md              # Sistema de diseño (tokens, tipografía, componentes)
├── astro.config.mjs       # Configuración de Astro (+ Tailwind v4, sitemap, prefetch)
├── .env.example           # Plantilla de variables de entorno (Sanity, SITE_URL)
├── scripts/sembrar-sanity.mjs  # Vuelca el JSON local al CMS (idempotente)
├── sanity/                # Studio de Sanity (panel del personal)
│   ├── sanity.config.ts   # Proyecto, dataset y schemas del Studio
│   └── schemas/           # categoriaMenu, sede, plato, badge, horario (en español)
├── package.json
├── tsconfig.json
├── public/                # Favicon y archivos estáticos
└── src/
    ├── config.ts          # Datos de marca: nombre, WhatsApp, imágenes, redes
    ├── lib/               # Tipos, esquemas zod, horarios (→ schema.org) y contenido (capa CMS)
    ├── styles/global.css  # Roles de color y tipografía → @theme de Tailwind v4
    ├── styles/japanese.css # Componentes y motivos del design system (capa components)
    ├── layouts/           # Layout.astro (head + SEO + Navbar, Footer, Carrito)
    ├── scripts/reveal.ts  # Revelado de secciones al hacer scroll
    ├── scripts/carrito.ts # Núcleo del carrito (localStorage + eventos)
    ├── components/        # Hero, Pilares, Catalogo, DishCard, SedeCard, Carrito, MigasPan...
    ├── content/
    │   ├── menu/          # 11 categorías del menú real (~100 platos) — respaldo local
    │   └── sedes/         # 4 sedes (horarios, dirección, modalidades, whatsapp) — respaldo local
    ├── data/              # destacados.json (platos de la landing)
    └── pages/
        ├── index.astro              # Landing
        ├── menu/index.astro         # Carta completa por grupos
        ├── menu/[slug].astro        # Categorías del menú (+ JSON-LD)
        ├── sedes/index.astro        # Listado de sedes (+ JSON-LD)
        ├── sedes/[slug].astro       # Detalle de cada sede con mapa (+ JSON-LD)
        ├── terminos.astro           # Términos y condiciones
        ├── privacidad.astro         # Aviso de privacidad
        └── robots.txt.ts            # robots.txt generado en build
```

## 🔎 SEO

- `site` configurado en `astro.config.mjs` (o variable de entorno `SITE_URL` en el build).
- **Canonical** autorreferencial por página, `<meta name="robots">` y `theme-color`.
- **Open Graph + Twitter Cards** con imagen del plato destacado.
- **JSON-LD**: `Restaurant` (marca y cada sede), `WebSite`, `ItemList` (carta y sedes) y `BreadcrumbList`.
- **Sitemap XML** (`sitemap-index.xml`) y `robots.txt` generados en cada build.
- `lang="es-VE"`, títulos y descripciones únicos por plantilla.

> ⚠️ Si cambia el dominio de producción, actualiza `site` en `astro.config.mjs` **y** `URL_SITIO` en `src/config.ts`.

## ♿ Accesibilidad

- Enlace de salto al contenido (`skip-link`) y `main` identificable.
- Foco visible con `:focus-visible` y foco DevTools-friendly (nunca se elimina el outline).
- Drawer del carrito como diálogo modal real: `inert` fuera de él, foco atrapado dentro,
  `Escape` cierra, se devuelve el foco al botón de origen y se bloquea el scroll del fondo.
- `aria-pressed` en los toggles, `role="status"` en el toast, `role="alert"` en los errores.
- Contraste AA en textos secundarios (mínimo `text-on-surface/70`) y `prefers-reduced-motion` respetado.
- Jerarquía de encabezados sin saltos (`h1 → h2 → h3`) en todas las plantillas.

> Verificado con Lighthouse: **Accesibilidad 100 · SEO 100** en landing, menú, sedes y páginas legales.

## ✏️ CMS (Sanity) — edición del personal

El personal edita menú, precios y sedes desde el **Studio de Sanity** sin tocar código.
La web sigue siendo 100% estática: el contenido se trae en el build.

**Cómo funciona** (`src/lib/contenido.ts`):
- Con `SANITY_PROJECT_ID` definido, el build lee el contenido publicado del CMS
  (solo versiones publicadas, no borradores) y lo valida con los mismos esquemas
  zod que el JSON local. Si un documento viene mal, el build falla con error claro.
- Sin la variable, el sitio compila con el **JSON local** de `src/content/` —
  el repo siempre funciona sin credenciales.

**Puesta en marcha (una sola vez):**
1. Crea el proyecto gratis en [sanity.io/manage](https://www.sanity.io/manage)
   (plan Free, dataset `production`).
2. Copia `.env.example` → `.env` y completa `SANITY_PROJECT_ID`.
3. Crea un token de escritura (Manage → API → Tokens → "Editor") y ponlo en
   `SANITY_API_WRITE_TOKEN`.
4. `pnpm sembrar:sanity` — sube el menú y las sedes actuales al CMS (idempotente).
5. Crea `sanity/.env` con `SANITY_STUDIO_PROJECT_ID=<id>` y ejecuta `pnpm studio`
   (local) o `pnpm studio:deploy` (URL pública `*.sanity.studio` para el personal).
6. Invita al personal desde Manage → Members (rol Editor; solo puede editar contenido).

**Publicación de cambios del personal:**
En Cloudflare Pages crea un *Deploy Hook* (Settings → Builds & deployments) y
regístralo en Sanity (Manage → API → Webhooks) para que cada publicación en el
Studio reconstruya el sitio automáticamente. Configura también
`SANITY_PROJECT_ID`/`SANITY_DATASET` como variables de entorno del proyecto en Pages.

> 🔒 Los tokens viven solo en `.env` (ignorado por git). El token de escritura
> jamás va al hosting: solo lo usa el script local de siembra.

## 🗺️ Fases de desarrollo

| Fase | Alcance | Estado |
|---|---|---|
| **1** | Proyecto Astro + Tailwind con tokens del design system, landing y páginas de sedes | ✅ Completada |
| **2** | Menú desde datos + carrito → checkout → WhatsApp | ✅ Completada |
| **3** | SEO técnico (sitemap, JSON-LD, OG), accesibilidad WCAG 2.2 AA y páginas legales | ✅ Completada |
| **4a** | CMS (Sanity) para el personal: Studio + capa de contenido con respaldo JSON | ✅ Completada |
| **4b** | SEO local (Google Business Profile por sede) y analítica | ⏳ Pendiente |

## 📝 Convenciones

- **Idioma del código/comentarios:** español.
- **Commits:** Conventional Commits — `<tipo>(<scope>): <descripción>` en presente imperativo, p. ej. `feat(menu): add poke category page`.

## 🤖 Agentes & Skills

Este repositorio se desarrolla con asistencia de agentes de código (OpenCode). Los commits siguen la convención generada por la skill **`commit-messages`** (Conventional Commits basados en `git diff`).

## 🚀 Cómo ejecutar

> Este proyecto usa **pnpm** como gestor de paquetes (no npm).

```bash
pnpm install    # instalar dependencias (solo la primera vez)
pnpm dev        # servidor de desarrollo → http://localhost:4321
pnpm check      # verificación de tipos (astro check) — ejecutar antes de commitear
pnpm build      # build de producción en ./dist
pnpm preview    # previsualizar el build de producción
```

> **Nota de despliegue:** define `SITE_URL` en el entorno de build para apuntar al
> dominio real (por ejemplo `SITE_URL=https://makotosushive.com.ve pnpm build`). Si no se
> define, se usa el valor por defecto de `astro.config.mjs`.

---

© Makoto Sushi — Letsgo Sushi. Todos los derechos reservados.
