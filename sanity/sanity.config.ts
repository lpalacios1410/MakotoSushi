/**
 * Studio de Sanity para el personal de Makoto Sushi.
 *
 * Requiere `sanity/.env` (o variables en el entorno) con:
 *   SANITY_STUDIO_PROJECT_ID=xxxxxxxx   (o SANITY_PROJECT_ID)
 *   SANITY_STUDIO_DATASET=production    (opcional, por defecto "production")
 *
 * Ejecutar local:  pnpm studio
 * Publicar:        pnpm studio:deploy  → https://<nombre>.sanity.studio
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './schemas';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production';

if (!projectId) {
  throw new Error(
    '[studio] Falta el Project ID de Sanity. Crea el archivo sanity/.env con:\n' +
      'SANITY_STUDIO_PROJECT_ID=<tu-project-id>\n' +
      '(lo encuentras en https://www.sanity.io/manage después de crear el proyecto)',
  );
}

export default defineConfig({
  name: 'makoto-sushi',
  title: 'Makoto Sushi — Panel de Contenido',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema,
});
