import type { APIRoute } from 'astro';

/**
 * robots.txt generado en build.
 * Permite el rastreo completo y declara el sitemap XML para los buscadores.
 */
export const GET: APIRoute = ({ site }) => {
  const base = site?.href ?? 'https://makotosushi.com/';
  const sitemap = new URL('sitemap-index.xml', base).href;

  const cuerpo = [
    'User-agent: *',
    'Allow: /',
    '',
    `# Sitemap XML generado por @astrojs/sitemap`,
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(cuerpo, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
