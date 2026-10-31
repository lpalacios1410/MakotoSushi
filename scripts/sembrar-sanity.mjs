/**
 * Siembra el contenido local (src/content/**) en el dataset de Sanity.
 *
 * Uso (requiere Project ID y token de ESCRITURA):
 *   1. Crea el proyecto en https://www.sanity.io/manage (plan Free) y un token
 *      con permisos de escritura (Manage → API → Tokens → "Editor").
 *   2. Define en .env de la raíz:
 *        SANITY_PROJECT_ID=xxxxxxxx
 *        SANITY_DATASET=production
 *        SANITY_API_WRITE_TOKEN=<token>
 *   3. Ejecuta:  pnpm sembrar:sanity
 *
 * El script es idempotente (createOrReplace con IDs fijos): se puede correr
 * las veces que haga falta sin duplicar documentos.
 */
import { createRequire } from 'node:module';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { createClient } = require('@sanity/client');

/* ── Carga manual de .env (el script corre con node pelado) ── */
function cargarEnv(ruta = '.env') {
  try {
    for (const linea of readFileSync(ruta, 'utf8').split('\n')) {
      const limpia = linea.trim();
      if (!limpia || limpia.startsWith('#')) continue;
      const [nombre, ...resto] = limpia.split('=');
      const valor = resto.join('=').trim();
      if (nombre && valor && !process.env[nombre]) process.env[nombre] = valor;
    }
  } catch {
    // Sin .env: se usan las variables del entorno, si las hay
  }
}
cargarEnv();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Faltan variables: define SANITY_PROJECT_ID y SANITY_API_WRITE_TOKEN en .env\n' +
      '(token de escritura: Manage → API → Tokens → "Editor").',
  );
  process.exit(1);
}

const cliente = createClient({ projectId, dataset, token, apiVersion: '2024-10-01' });

/* ── Conversión de un archivo JSON a documento de Sanity ── */
const RAIZ = process.cwd();

function leerJson(ruta) {
  return JSON.parse(readFileSync(ruta, 'utf8'));
}

/** Categorías del menú: los "items" pasan tal cual (misma forma). */
function documentosMenu() {
  const carpeta = join(RAIZ, 'src/content/menu');
  return readdirSync(carpeta)
    .filter((archivo) => archivo.endsWith('.json'))
    .map((archivo) => {
      const slug = archivo.replace('.json', '');
      const datos = leerJson(join(carpeta, archivo));
      return {
        _id: `categoriaMenu-${slug}`,
        _type: 'categoriaMenu',
        identificador: { _type: 'slug', current: slug },
        titulo: datos.titulo,
        grupo: datos.grupo,
        ...(datos.descripcion ? { descripcion: datos.descripcion } : {}),
        orden: datos.orden,
        items: (datos.items ?? []).map((item) => ({
          _type: 'plato',
          _key: item.id,
          ...item,
        })),
      };
    });
}

/** Sedes: los bloques de horario necesitan _key para el array de Sanity. */
function documentosSedes() {
  const carpeta = join(RAIZ, 'src/content/sedes');
  return readdirSync(carpeta)
    .filter((archivo) => archivo.endsWith('.json'))
    .map((archivo) => {
      const slug = archivo.replace('.json', '');
      const datos = leerJson(join(carpeta, archivo));
      return {
        _id: `sede-${slug}`,
        _type: 'sede',
        identificador: { _type: 'slug', current: slug },
        nombre: datos.nombre,
        ciudad: datos.ciudad,
        orden: datos.orden,
        modalidades: datos.modalidades,
        horarios: (datos.horarios ?? []).map((horario) => ({
          _type: 'horario',
          _key: `${datos.orden}-${horario.apertura}`,
          ...horario,
        })),
        direccion: datos.direccion,
        ...(datos.centroComercial ? { centroComercial: datos.centroComercial } : {}),
        ...(datos.local ? { local: datos.local } : {}),
        ...(datos.comoLlegar ? { comoLlegar: datos.comoLlegar } : {}),
        ...(datos.whatsapp ? { whatsapp: datos.whatsapp } : {}),
      };
    });
}

/* ── Siembra ── */
const documentos = [...documentosMenu(), ...documentosSedes()];
console.log(`Subiendo ${documentos.length} documentos a Sanity (${projectId}/${dataset})...`);

for (const documento of documentos) {
  await cliente.createOrReplace(documento);
  console.log(`  ✓ ${documento._type}: ${documento.titulo ?? documento.nombre}`);
}

console.log('Listo. Abre el Studio (pnpm studio) y verifica el contenido.');
