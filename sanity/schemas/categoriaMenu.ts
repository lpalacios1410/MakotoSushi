/**
 * Categoría del menú (documento): contiene sus platos en línea para que el
 * personal edite precios y nombres en un solo lugar.
 * Espeja esquemaCategoria de src/lib/esquemas.ts.
 */
import { defineField, defineType } from 'sanity';
import { plato } from './plato';

export const categoriaMenu = defineType({
  name: 'categoriaMenu',
  title: 'Categoría del Menú',
  type: 'document',
  fields: [
    defineField({
      name: 'identificador',
      title: 'Identificador de URL',
      type: 'slug',
      description: 'Define la página /menu/<identificador>/. Pulsa "Generate" a partir del título.',
      options: { source: 'titulo' },
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      description: 'Ej.: "Roll´s Fríos", "Entradas", "Menú Ejecutivo".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'grupo',
      title: 'Grupo',
      type: 'string',
      description:
        'Agrupación superior mostrada en el índice del menú: "Menú Ejecutivo", "Entradas", "Sushi", "Platos Calientes" o "Combos".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción (opcional)',
      type: 'text',
      rows: 2,
      description: 'Bajada de la categoría en su página.',
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Posición en los listados (1 = primero).',
      validation: (regla) => regla.required().min(0),
    }),
    defineField({
      name: 'items',
      title: 'Platos',
      type: 'array',
      of: [{ type: plato.name }],
      description: 'Añade, edita u ordena los platos de esta categoría.',
    }),
  ],
  preview: {
    select: { titulo: 'titulo', grupo: 'grupo', items: 'items' },
    prepare: ({ titulo, grupo, items }) => ({
      title: titulo ?? 'Categoría',
      subtitle: `${grupo ?? ''} · ${items?.length ?? 0} platos`,
    }),
  },
});
