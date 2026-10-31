// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * URL pública del sitio.
 * Se puede sobreescribir con la variable de entorno SITE_URL en el entorno de
 * build (Cloudflare Pages, Vercel, Netlify...) sin tocar el código.
 */
const site = process.env.SITE_URL ?? 'https://makotosushi.com';

// https://astro.build/config
export default defineConfig({
  site,
  // Las URLs del sitio ya están escritas con barra final (`/menu/`).
  trailingSlash: 'always',
  // Sitemap XML para buscadores: https://makotosushi.com/sitemap-index.xml
  integrations: [sitemap()],
  // Precarga los enlaces al entrar en el viewport (navegación interna fluida).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
