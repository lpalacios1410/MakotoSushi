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

/** Modalidades de servicio de una sede. */
export const MODALIDADES = ['restaurante', 'delivery', 'pickup'] as const;
export type Modalidad = (typeof MODALIDADES)[number];

/** Bloque de horario de atención (p. ej. "Lunes a viernes", "10:00 am", "8:00 pm"). */
export interface Horario {
  dias: string;
  apertura: string;
  cierre: string;
}

/** Sede del restaurante (misma forma que src/content/sedes/*.json). */
export interface Sede {
  nombre: string;
  ciudad: string;
  /** Orden de aparición en listados */
  orden: number;
  modalidades: Modalidad[];
  horarios: Horario[];
  direccion: string;
  centroComercial?: string;
  local?: string;
  comoLlegar?: string;
  /** Número con código de país, solo dígitos. `null` si aún no hay número. */
  whatsapp: string | null;
}

/** Categoría del menú (misma forma que src/content/menu/*.json). */
export interface CategoriaMenu {
  titulo: string;
  /** Agrupación superior: "Menú Ejecutivo", "Entradas", "Sushi", "Platos Calientes", "Combos" */
  grupo: string;
  descripcion?: string;
  /** Orden de aparición en listados */
  orden: number;
  items: Platillo[];
}

/**
 * Entrada de contenido tal y como la consumen páginas y componentes.
 * Deliberadamente idéntica a CollectionEntry de Astro ({ id, data }) para que
 * nada del sitio tenga que distinguir si el origen fue Sanity o el JSON local.
 */
export interface EntradaMenu {
  id: string;
  data: CategoriaMenu;
}

export interface EntradaSede {
  id: string;
  data: Sede;
}
