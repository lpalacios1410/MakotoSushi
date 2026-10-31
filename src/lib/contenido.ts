/**
 * Capa única de acceso al contenido del sitio: menú y sedes.
 *
 * - Si las variables de entorno de Sanity están configuradas, el contenido se
 *   lee del CMS (el personal edita precios y platos sin tocar código).
 * - Si no lo están, se lee del JSON local del repositorio (respaldo).
 *
 * Ambos caminos devuelven exactamente la misma forma ({ id, data }) y validan
 * con los mismos esquemas zod, de modo que páginas y componentes no distinguen
 * el origen. Las funciones cachean su resultado por build (múltiples páginas
 * comparten una sola consulta a la API).
 */
import { createClient } from '@sanity/client';
import { getCollection } from 'astro:content';
import { esquemaCategoria, esquemaSede } from './esquemas';
import type { EntradaMenu, EntradaSede } from './tipos';

/* ── Configuración de entorno ────────────────────────────── */

/** `import.meta.env` carga las variables de .env (local); process.env cubre el
 *  hosting (Cloudflare Pages define variables reales de entorno en el build). */
function valorEntorno(nombre: string): string | undefined {
  return import.meta.env[nombre] ?? process.env[nombre];
}

const SANITY_PROYECTO = valorEntorno('SANITY_PROJECT_ID');
const SANITY_DATASET = valorEntorno('SANITY_DATASET') ?? 'production';
const SANITY_TOKEN_LECTURA = valorEntorno('SANITY_API_READ_TOKEN');

/** ¿Hay CMS configurado? Se usa para mensajes de estado claros. */
export const sanityActivo = Boolean(SANITY_PROYECTO);

/** Cliente de Sanity para el build (solo lectura del contenido publicado). */
function clienteSanity() {
  return createClient({
    projectId: SANITY_PROYECTO!,
    dataset: SANITY_DATASET,
    apiVersion: '2024-10-01',
    // Token solo si el dataset es privado; los datasets públicos se leen sin él.
    ...(SANITY_TOKEN_LECTURA ? { token: SANITY_TOKEN_LECTURA } : {}),
    perspective: 'published', // ignora borradores del Studio
    useCdn: false, // siempre fresco en build
  });
}

/* ── Consultas GROQ ──────────────────────────────────────── */

const consultaMenu = /* groq */ `
  *[_type == "categoriaMenu"] | order(orden asc) {
    _id,
    "id": identificador.current,
    titulo, grupo, descripcion, orden,
    items[]{ id, nombre, descripcion, precio, badge, imagen }
  }
`;

const consultaSedes = /* groq */ `
  *[_type == "sede"] | order(orden asc) {
    _id,
    "id": identificador.current,
    nombre, ciudad, orden, modalidades,
    horarios[]{ dias, apertura, cierre },
    direccion, centroComercial, local, comoLlegar, whatsapp
  }
`;

/* ── Validación ──────────────────────────────────────────── */

/** Valida un documento crudo con el esquema; error con contexto si falla. */
function validarEsquema<T>(
  esquema: { safeParse: (dato: unknown) => { success: boolean; data?: T; error?: { message: string } } },
  bruto: unknown,
  contexto: string,
): T {
  const parseo = esquema.safeParse(bruto);
  if (!parseo.success || parseo.data === undefined) {
    throw new Error(
      `[contenido] El documento "${contexto}" de Sanity no pasó la validación:\n${parseo.error?.message ?? 'error desconocido'}`,
    );
  }
  return parseo.data;
}

/* ── Menú ────────────────────────────────────────────────── */

/** Categorías del menú desde el JSON local, ya ordenadas. */
async function menuDesdeJson(): Promise<EntradaMenu[]> {
  const entradas = await getCollection('menu');
  return entradas.sort((a, b) => a.data.orden - b.data.orden) as EntradaMenu[];
}

/** Categorías del menú desde Sanity, ya ordenadas y validadas. */
async function menuDesdeSanity(): Promise<EntradaMenu[]> {
  const documentos = await clienteSanity().fetch<
    Array<Record<string, unknown>>
  >(consultaMenu);

  return documentos.map((doc) => {
    const bruto = {
      titulo: doc.titulo,
      grupo: doc.grupo,
      descripcion: (doc.descripcion as string | undefined) ?? undefined,
      orden: doc.orden,
      items: (doc.items as Array<Record<string, unknown>> | undefined ?? []).map(
        (item) => ({
          id: item.id,
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          // Un badge a medias (sin texto o sin estilo) se ignora en silencio
          badge:
            item.badge && typeof item.badge === 'object'
              ? item.badge as { texto: string; tipo: string }
              : undefined,
          imagen: (item.imagen as string | undefined) || undefined,
        }),
      ),
    };

    return {
      id: doc.id as string,
      data: validarEsquema(esquemaCategoria, bruto, `categoriaMenu: ${String(doc.titulo)}`),
    };
  });
}

let cacheMenu: Promise<EntradaMenu[]> | undefined;

/** Categorías del menú (Sanity si está configurado; JSON local si no). */
export function obtenerMenu(): Promise<EntradaMenu[]> {
  cacheMenu ??= sanityActivo ? menuDesdeSanity() : menuDesdeJson();
  return cacheMenu;
}

/* ── Sedes ───────────────────────────────────────────────── */

/** Sedes desde el JSON local, ya ordenadas. */
async function sedesDesdeJson(): Promise<EntradaSede[]> {
  const entradas = await getCollection('sedes');
  return entradas.sort((a, b) => a.data.orden - b.data.orden) as EntradaSede[];
}

/** Sedes desde Sanity, ya ordenadas y validadas. */
async function sedesDesdeSanity(): Promise<EntradaSede[]> {
  const documentos = await clienteSanity().fetch<
    Array<Record<string, unknown>>
  >(consultaSedes);

  return documentos.map((doc) => {
    const bruto = {
      nombre: doc.nombre,
      ciudad: doc.ciudad,
      orden: doc.orden,
      modalidades: doc.modalidades,
      horarios: doc.horarios,
      direccion: doc.direccion,
      centroComercial: (doc.centroComercial as string | undefined) || undefined,
      local: (doc.local as string | undefined) || undefined,
      comoLlegar: (doc.comoLlegar as string | undefined) || undefined,
      // Vacío en el Studio → sin WhatsApp (coincide con `null` del JSON local)
      whatsapp: (doc.whatsapp as string | undefined)?.trim() || null,
    };

    return {
      id: doc.id as string,
      data: validarEsquema(esquemaSede, bruto, `sede: ${String(doc.nombre)}`),
    };
  });
}

let cacheSedes: Promise<EntradaSede[]> | undefined;

/** Sedes (Sanity si está configurado; JSON local si no). */
export function obtenerSedes(): Promise<EntradaSede[]> {
  cacheSedes ??= sanityActivo ? sedesDesdeSanity() : sedesDesdeJson();
  return cacheSedes;
}
