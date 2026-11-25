/**
 * Esquemas del Studio: espejan los esquemas zod de src/lib/esquemas.ts.
 * Títulos y descripciones en español para que el personal los edite sin ayuda técnica.
 *
 * Importante: el schema va con el nombre "default" (el workspace por defecto del
 * Studio). Nombrarlo distinto crea un workspace aparte y el Studio mostraría
 * la estructura vacía.
 */
import { categoriaMenu } from './categoriaMenu';
import { sede } from './sede';
import { plato } from './plato';
import { badge } from './badge';
import { horario } from './horario';

export const schema = {
  name: 'default',
  types: [categoriaMenu, sede, plato, badge, horario],
};
