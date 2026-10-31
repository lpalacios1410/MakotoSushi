import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { TIPOS_BADGE } from './lib/tipos';

/**
 * Categorías del menú con sus platos (fuente: página actual de Google Sites).
 * Cada archivo JSON es una categoría; `precio` es la referencia en dólares.
 */
const menu = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/menu' }),
  schema: z.object({
    titulo: z.string(),
    /** Agrupación superior: "Menú Ejecutivo", "Entradas", "Combos", "Sushi", "Platos Calientes" */
    grupo: z.string(),
    descripcion: z.string().optional(),
    /** Orden de aparición en listados */
    orden: z.number(),
    items: z.array(
      z.object({
        id: z.string(),
        nombre: z.string(),
        descripcion: z.string(),
        /** Referencia de precio en dólares (REF.) */
        precio: z.number().nonnegative(),
        badge: z.object({ texto: z.string(), tipo: z.enum(TIPOS_BADGE) }).optional(),
        imagen: z.url().optional(),
      }),
    ),
  }),
});

/**
 * Sedes del restaurante (fuente: página actual de Google Sites).
 * El campo `whatsapp` alimenta el envío de pedidos por sede (checkout del carrito).
 */
const sedes = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/sedes' }),
  schema: z.object({
    nombre: z.string(),
    ciudad: z.string(),
    /** Orden de aparición en listados */
    orden: z.number(),
    modalidades: z.array(z.enum(['restaurante', 'delivery', 'pickup'])),
    horarios: z.array(
      z.object({
        dias: z.string(),
        apertura: z.string(),
        cierre: z.string(),
      }),
    ),
    direccion: z.string(),
    centroComercial: z.string().optional(),
    local: z.string().optional(),
    comoLlegar: z.string().optional(),
    /** Número con código de país, p. ej. "582121234567". Null hasta confirmar. */
    whatsapp: z.string().regex(/^\d{10,15}$/).nullable(),
  }),
});

export const collections = { menu, sedes };
