/**
 * Esquemas del Studio: espejan los esquemas zod de src/lib/esquemas.ts.
 * Títulos y descripciones en español para que el personal los edite sin ayuda técnica.
 */
import { createSchema } from 'sanity';
import { categoriaMenu } from './categoriaMenu';
import { sede } from './sede';
import { plato } from './plato';
import { badge } from './badge';
import { horario } from './horario';

export const schema = createSchema({
  name: 'makoto-sushi',
  types: [categoriaMenu, sede, plato, badge, horario],
});
