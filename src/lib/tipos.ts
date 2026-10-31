/**
 * Tipos compartidos entre el contenido (JSON), los componentes y el build.
 */

/** Tipos de badge admitidos en las cards de platos. */
export const TIPOS_BADGE = ['oro', 'fuego', 'picante', 'fresco', 'neutro', 'flameado'] as const;

export type TipoBadge = (typeof TIPOS_BADGE)[number];

/** Forma de un plato tal y como la consumen las cards del catálogo. */
export interface Platillo {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  badge?: { texto: string; tipo: TipoBadge };
  imagen?: string;
}
