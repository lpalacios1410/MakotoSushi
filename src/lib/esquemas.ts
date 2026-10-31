/**
 * Esquemas zod del contenido (menú y sedes).
 *
 * Se usan en dos lugares:
 * - `src/content.config.ts`: valida los JSON locales del repositorio.
 * - `src/lib/contenido.ts`: valida lo que llega desde Sanity.
 *
 * Así, venga de donde venga, el contenido siempre pasa por la misma validación
 * y el build falla con un error claro si alguien introduce datos inválidos.
 */
import { z } from 'astro/zod';
import { MODALIDADES, TIPOS_BADGE } from './tipos';

/** Un plato dentro de una categoría. */
export const esquemaPlatillo = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  /** Referencia de precio en dólares (REF.) */
  precio: z.number().nonnegative(),
  badge: z.object({ texto: z.string(), tipo: z.enum(TIPOS_BADGE) }).optional(),
  imagen: z.url().optional(),
});

/** Una categoría del menú (un archivo JSON o un documento de Sanity). */
export const esquemaCategoria = z.object({
  titulo: z.string(),
  /** Agrupación superior: "Menú Ejecutivo", "Entradas", "Sushi", "Platos Calientes", "Combos" */
  grupo: z.string(),
  descripcion: z.string().optional(),
  /** Orden de aparición en listados */
  orden: z.number(),
  items: z.array(esquemaPlatillo),
});

/** Bloque de horario de una sede. */
export const esquemaHorario = z.object({
  dias: z.string(),
  apertura: z.string(),
  cierre: z.string(),
});

/** Una sede del restaurante. */
export const esquemaSede = z.object({
  nombre: z.string(),
  ciudad: z.string(),
  /** Orden de aparición en listados */
  orden: z.number(),
  modalidades: z.array(z.enum(MODALIDADES)),
  horarios: z.array(esquemaHorario),
  direccion: z.string(),
  centroComercial: z.string().optional(),
  local: z.string().optional(),
  comoLlegar: z.string().optional(),
  /** Número con código de país, p. ej. "582121234567". Null hasta confirmar. */
  whatsapp: z.string().regex(/^\d{10,15}$/).nullable(),
});
