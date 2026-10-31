/**
 * Configuración del CLI de Sanity (`sanity dev`, `sanity deploy`).
 * Las variables se documentan en sanity/sanity.config.ts.
 */
import { defineCliConfig } from 'sanity/cli';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.SANITY_DATASET ?? 'production';

export default defineCliConfig({
  api: { projectId: projectId ?? '', dataset },
});
