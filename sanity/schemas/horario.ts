/**
 * Horario de atención de una sede (un bloque de días).
 */
import { defineField, defineType } from 'sanity';

export const horario = defineType({
  name: 'horario',
  title: 'Horario',
  type: 'object',
  fields: [
    defineField({
      name: 'dias',
      title: 'Días',
      type: 'string',
      description: 'Ej.: "Todos los días", "Lunes a viernes".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'apertura',
      title: 'Apertura',
      type: 'string',
      description: 'Ej.: "10:00 am".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'cierre',
      title: 'Cierre',
      type: 'string',
      description: 'Ej.: "11:00 pm".',
      validation: (regla) => regla.required(),
    }),
  ],
  preview: {
    select: { titulo: 'dias', apertura: 'apertura', cierre: 'cierre' },
    prepare: ({ titulo, apertura, cierre }) => ({
      title: titulo ?? 'Horario',
      subtitle: `${apertura ?? ''} – ${cierre ?? ''}`,
    }),
  },
});
