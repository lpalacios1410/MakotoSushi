/**
 * Núcleo del carrito de pedidos.
 * El estado vive en localStorage del cliente (sin servidor) y se notifica
 * a la UI mediante el evento "carrito:cambio" en window.
 */

export interface ItemCarrito {
  id: string;
  nombre: string;
  /** Precio unitario en dólares (REF.) */
  precio: number;
  cantidad: number;
}

const CLAVE_STORAGE = 'makoto-carrito';

/** Evento que se dispara cada vez que el carrito cambia */
export function notificarCambio() {
  window.dispatchEvent(new CustomEvent('carrito:cambio'));
}

export function obtenerCarrito(): ItemCarrito[] {
  try {
    const bruto = localStorage.getItem(CLAVE_STORAGE);
    if (!bruto) return [];
    const datos = JSON.parse(bruto);
    return Array.isArray(datos) ? datos : [];
  } catch {
    // localStorage corrupto o deshabilitado: se ignora silenciosamente
    return [];
  }
}

export function guardarCarrito(items: ItemCarrito[]) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
  notificarCambio();
}

/** Agrega un plato (o incrementa su cantidad si ya está en el carrito) */
export function agregarProducto(id: string, nombre: string, precio: number) {
  const items = obtenerCarrito();
  const existente = items.find((item) => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    items.push({ id, nombre, precio, cantidad: 1 });
  }
  guardarCarrito(items);
}

/** Cambia la cantidad de un ítem (delta +1/-1). Elimina al llegar a 0. */
export function cambiarCantidad(id: string, delta: number) {
  const items = obtenerCarrito();
  const item = items.find((i) => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  const resultado = item.cantidad > 0 ? items : items.filter((i) => i.id !== id);
  guardarCarrito(resultado);
}

export function quitarProducto(id: string) {
  guardarCarrito(obtenerCarrito().filter((i) => i.id !== id));
}

export function vaciarCarrito() {
  guardarCarrito([]);
}

export function totalItems(): number {
  return obtenerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
}

export function totalPrecio(): number {
  return obtenerCarrito().reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}

/** Formatea un precio en dólares según el formato del menú (REF. enteros) */
export function formatearPrecio(valor: number): string {
  return '$' + valor.toLocaleString('es-VE');
}
