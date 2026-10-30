import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Sedes del restaurante (fuente: página actual de Google Sites).
 * Fase 2: el campo `whatsapp` alimentará el envío de pedidos por sede.
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
    whatsapp: z.string().nullable(),
  }),
});

export const collections = { sedes };
