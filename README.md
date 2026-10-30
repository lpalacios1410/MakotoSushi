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
| Framework | **Astro 5** | Sitio estático, ultrarrápido, JS solo donde hace falta |
| Estilos | **Tailwind CSS v4** | Sistema de diseño "Urban Tokyo Dark Fusion" (ver `DESIGN.md`) |
| Interactividad | **Isla JS/Preact + localStorage** | Carrito y checkout → WhatsApp |
| Contenido | **JSON en el repo** (+ CMS Sanity para el personal) | Menú y sedes editables sin tocar código |
| Hosting | **Cloudflare Pages** (free) | CI/CD desde este repo |

## 📂 Estructura del proyecto

```
MakotoSushi/
├── README.md              # Este archivo
├── DESIGN.md              # Sistema de diseño (tokens, tipografía, componentes)
├── code.html              # Prototipo de referencia de la landing (monolito)
├── screen.png             # Captura de referencia visual
├── astro.config.mjs       # Configuración de Astro (+ plugin de Tailwind v4)
├── package.json
├── tsconfig.json
├── public/                # Favicon y archivos estáticos
└── src/
    ├── styles/global.css  # Tokens del design system → @theme de Tailwind v4
    ├── layouts/           # Layout.astro (head, Navbar, Footer)
    ├── components/        # Hero, Pilares, Catalogo, DishCard, SedeCard...
    ├── content/sedes/     # 4 sedes en JSON (horarios, dirección, modalidades)
    ├── data/              # destacados.json (platos de la landing)
    └── pages/
        ├── index.astro         # Landing
        └── sedes/[slug].astro  # Detalle de cada sede con mapa
```

## 🗺️ Fases de desarrollo

| Fase | Alcance | Estado |
|---|---|---|
| **1** | Proyecto Astro + Tailwind con tokens del design system, landing y páginas de sedes | ✅ Completada |
| **2** | Menú desde datos + carrito → checkout → WhatsApp | ⏳ Pendiente |
| **3** | CMS (Sanity) para el personal, SEO local y Open Graph | ⏳ Pendiente |

## 📝 Convenciones

- **Idioma del código/comentarios:** español.
- **Commits:** Conventional Commits — `<tipo>(<scope>): <descripción>` en presente imperativo, p. ej. `feat(menu): add poke category page`.

## 🤖 Agentes & Skills

Este repositorio se desarrolla con asistencia de agentes de código (OpenCode). Los commits siguen la convención generada por la skill **`commit-messages`** (Conventional Commits basados en `git diff`).

## 🚀 Cómo ejecutar

```bash
npm install     # instalar dependencias (solo la primera vez)
npm run dev     # servidor de desarrollo → http://localhost:4321
npm run build   # build de producción en ./dist
npm run preview # previsualizar el build de producción
```

---

© Makoto Sushi — Letsgo Sushi. Todos los derechos reservados.
