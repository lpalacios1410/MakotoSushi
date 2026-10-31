/**
 * Distintivo opcional de un plato ("Más Pedido", "Estrella de la Casa"...).
 * Los estilos deben coincidir con TIPOS_BADGE de src/lib/tipos.ts.
 */
import { defineField, defineType } from 'sanity';

export const badge = defineType({
  name: 'badge',
  title: 'Distintivo',
  type: 'object',
  fields: [
    defineField({
      name: 'texto',
      title: 'Texto',
      type: 'string',
      description: 'Ej.: "Más Pedido", "Estrella de la Casa", "Picante Medio".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Estilo (color)',
      type: 'string',
      options: {
        list: [
          { title: 'Oro (estrella de la casa)', value: 'oro' },
          { title: 'Fuego (más pedido)', value: 'fuego' },
          { title: 'Picante', value: 'picante' },
          { title: 'Fresco (vegetariano / para compartir)', value: 'fresco' },
          { title: 'Neutro', value: 'neutro' },
          { title: 'Flameado', value: 'flameado' },
        ],
      },
      validation: (regla) => regla.required(),
    }),
  ],
  preview: {
    select: { titulo: 'texto', subtitulo: 'tipo' },
    prepare: ({ titulo, subtitulo }) => ({ title: titulo, subtitle: subtitulo }),
  },
});
