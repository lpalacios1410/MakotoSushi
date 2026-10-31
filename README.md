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
| Estilos | **Tailwind CSS v4** | Sistema de diseño "Urban Tokyo Dark Fusion" (ver `DESIGN.md`) |
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
├── package.json
├── tsconfig.json
├── public/                # Favicon y archivos estáticos
└── src/
    ├── config.ts          # Datos de marca: nombre, WhatsApp, imágenes, redes
    ├── lib/               # Tipos compartidos y utilidades (horarios → schema.org)
    ├── styles/global.css  # Tokens del design system → @theme de Tailwind v4
    ├── layouts/           # Layout.astro (head + SEO + Navbar, Footer, Carrito)
    ├── scripts/carrito.ts # Núcleo del carrito (localStorage + eventos)
    ├── components/        # Hero, Pilares, Catalogo, DishCard, SedeCard, Carrito, MigasPan...
    ├── content/
    │   ├── menu/          # 11 categorías del menú real (~100 platos)
    │   └── sedes/         # 4 sedes (horarios, dirección, modalidades, whatsapp)
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

## 🗺️ Fases de desarrollo

| Fase | Alcance | Estado |
|---|---|---|
| **1** | Proyecto Astro + Tailwind con tokens del design system, landing y páginas de sedes | ✅ Completada |
| **2** | Menú desde datos + carrito → checkout → WhatsApp | ✅ Completada |
| **3** | SEO técnico (sitemap, JSON-LD, OG), accesibilidad WCAG 2.2 AA y páginas legales | ✅ Completada |
| **4** | CMS (Sanity) para el personal, SEO local (GBP) y analítica | ⏳ Pendiente |

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
> dominio real (por ejemplo `SITE_URL=https://makotosushi.com pnpm build`). Si no se
> define, se usa el valor por defecto de `astro.config.mjs`.

---

© Makoto Sushi — Letsgo Sushi. Todos los derechos reservados.
