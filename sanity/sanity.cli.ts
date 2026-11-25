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
  // URL pública del Studio tras "pnpm studio:deploy": https://makoto-sushi.sanity.studio
  // appId: evita que el CLI pregunte el identificador en cada deploy.
  deployment: {
    studioHost: 'makoto-sushi',
    autoUpdates: true,
    appId: 'qf4jwcnnb96m8za0pwhihved',
  },
  api: { projectId: projectId ?? '', dataset },
});
