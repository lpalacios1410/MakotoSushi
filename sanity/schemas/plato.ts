/**
 * Un plato dentro de una categoría del menú.
 * El campo `id` lo usa el carrito para identificar el plato en el pedido.
 */
import { defineField, defineType } from 'sanity';
import { badge } from './badge';

export const plato = defineType({
  name: 'plato',
  title: 'Plato',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Identificador',
      type: 'string',
      description:
        'Único, sin espacios ni acentos (guiones permitidos). Ej.: "frios-dragon". Lo usa el botón "Añadir" y el carrito.',
      validation: (regla) => regla.required().regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones.'),
    }),
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
      description: 'Ingredientes y detalles tal como aparecen en la carta.',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'precio',
      title: 'Precio (USD)',
      type: 'number',
      description: 'Precio de referencia en dólares (REF.). No incluye IVA ni el 10% de servicio.',
      validation: (regla) => regla.required().min(0),
    }),
    defineField({
      name: 'badge',
      title: 'Distintivo (opcional)',
      type: 'badge',
      description: 'Etiqueta destacada en la card del plato. Dejar vacío si no aplica.',
    }),
    defineField({
      name: 'imagen',
      title: 'Foto (URL, opcional)',
      type: 'url',
      description: 'Enlace a una foto del plato. La mayoría de los platos no lleva foto.',
    }),
  ],
  preview: {
    select: { titulo: 'nombre', precio: 'precio' },
    prepare: ({ titulo, precio }) => ({
      title: titulo ?? 'Plato',
      subtitle: precio != null ? `$${precio}` : 'sin precio',
    }),
  },
});
