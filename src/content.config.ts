import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { esquemaCategoria, esquemaSede } from './lib/esquemas';

/**
 * Categorías del menú con sus platos (fuente: página actual de Google Sites).
 * Cada archivo JSON es una categoría; `precio` es la referencia en dólares.
 *
 * Nota: estos JSON son la fuente local de respaldo. Cuando el CMS (Sanity)
 * está configurado, el contenido publicado allí toma su lugar (ver src/lib/contenido.ts).
 */
const menu = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/menu' }),
  schema: esquemaCategoria,
});

/**
 * Sedes del restaurante (fuente: página actual de Google Sites).
 * El campo `whatsapp` alimenta el envío de pedidos por sede (checkout del carrito).
 */
const sedes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/sedes' }),
  schema: esquemaSede,
});

export const collections = { menu, sedes };
