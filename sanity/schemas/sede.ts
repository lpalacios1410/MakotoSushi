/**
 * Sede del restaurante (documento).
 * Espeja esquemaSede de src/lib/esquemas.ts.
 */
import { defineField, defineType } from 'sanity';
import { horario } from './horario';

export const sede = defineType({
  name: 'sede',
  title: 'Sede',
  type: 'document',
  fields: [
    defineField({
      name: 'identificador',
      title: 'Identificador de URL',
      type: 'slug',
      description: 'Define la página /sedes/<identificador>/. Pulsa "Generate" a partir del nombre.',
      options: { source: 'nombre' },
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description: 'Ej.: "La Candelaria", "Chacao".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'ciudad',
      title: 'Ciudad / Zona',
      type: 'string',
      description: 'Ej.: "Caracas".',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      description: 'Posición en los listados (1 = primero).',
      validation: (regla) => regla.required().min(0),
    }),
    defineField({
      name: 'modalidades',
      title: 'Modalidades',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Restaurante', value: 'restaurante' },
              { title: 'Delivery', value: 'delivery' },
              { title: 'Pick Up', value: 'pickup' },
            ],
          },
        },
      ],
      description: 'Cómo atiende esta sede. El checkout filtra las sedes según la modalidad elegida.',
      validation: (regla) => regla.required().min(1),
    }),
    defineField({
      name: 'horarios',
      title: 'Horarios',
      type: 'array',
      of: [{ type: horario.name }],
      validation: (regla) => regla.required().min(1),
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'string',
      description: 'Dirección completa (se usa también para el mapa).',
      validation: (regla) => regla.required(),
    }),
    defineField({
      name: 'centroComercial',
      title: 'Centro Comercial (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'local',
      title: 'Local (opcional)',
      type: 'string',
      description: 'Ej.: "Local ZG-23 (Zona gourmet)".',
    }),
    defineField({
      name: 'comoLlegar',
      title: 'Cómo llegar (opcional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (opcional)',
      type: 'string',
      description:
        'Número con código de país, solo dígitos (ej.: 582121234567). Recibe los pedidos del carrito. Vacío = aún sin número.',
      validation: (regla) =>
        regla.regex(/^\d{10,15}$/, 'Solo dígitos, con código de país (10 a 15 dígitos).'),
    }),
  ],
  preview: {
    select: { titulo: 'nombre', ciudad: 'ciudad', whatsapp: 'whatsapp' },
    prepare: ({ titulo, ciudad, whatsapp }) => ({
      title: titulo ?? 'Sede',
      subtitle: `${ciudad ?? ''}${whatsapp ? ' · WhatsApp ✓' : ''}`,
    }),
  },
});
