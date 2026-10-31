/**
 * Configuración central del sitio.
 *
 * Todo dato de marca que se repita en varias páginas (nombre, textos legales,
 * WhatsApp, imágenes sociales, redes) vive aquí para evitar duplicados y
 * facilitar la edición por parte del negocio.
 */

/** URL pública del sitio. Debe coincidir con `site` de astro.config.mjs. */
export const URL_SITIO = 'https://makotosushi.com';

export const MARCA = {
  /** Nombre comercial corto (para <title> y JSON-LD). */
  nombre: 'Makoto Sushi',
  /** Nombre completo de las dos marcas agrupadas. */
  nombreCompleto: 'Makoto Sushi / Letsgo Sushi',
  /** Lema de marca (usado en meta descripciones y Open Graph). */
  lema: 'Adictos al Verdadero Sabor Japonés',
  descripcion:
    'Sushi de autor, pesca del día fresca y combinaciones artesanales. Delivery y pick-up en Caracas, Venezuela.',
  locale: 'es_VE',
  ciudad: 'Caracas',
  region: 'Distrito Capital',
  pais: 'VE',
  /** Número de WhatsApp con código de país, sin signos ni espacios. */
  whatsapp: '584241624012',
  /** Mensaje precargado en los enlaces de WhatsApp. */
  whatsappMensaje:
    'Hola Makoto Sushi, quiero hacer un pedido. ¿Me pueden pasar el menú y las sedes disponibles?',
} as const;

/** Imagen del plato destacado (Hero): se usa también como Open Graph. */
export const IMAGEN_PLATO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDwXrb3oVtw-pOmOqjtAUSQzDZfHE0AS6mnJrvF6IeK_l5NEDhYx5qQxKp1H0gCdHtrAnL_KT71QPKN3WDaubK8wkLW6xBZeDEZhQpZ0EivgRQasrRVctp_ZnpQpeWbR2p_LwMM-0hcSjDtkSxuC0SYw_y91PWVu5WBOIZeJPUgMoaRbm6Y9fxJ0d-quNuMgyKfNN8fq6YhYpjt-Dxjn-1EVSr9GGClBH-pY-rO_v4EI-RTww_fesvTGQ';

/** Logotipo oficial (usado en el Navbar, el Footer y como og:logo). */
export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCAU1zHMukdShxQaC9RgKRpJIjjRp05B_QvFgQ4A0f2qKSpQYPPTRiuSXTtQETXyPZ0NCp0OdaX3fnBooPLq5MF9BkFqAeY_8vwIis36q3A77Iaf_thLyIwIjZXxPQdHENuJQeemR_xtR6LiBEIIeI5MgHconpI3MTFmC_VGP_Rx6oj82Q59LtSVRv_BsFO8d63ptkacenruyabAMywbniPfFuvyvUf8bTou3ccu0ohYSH1WFztyaFDfQ';

/** Enlace de WhatsApp listo para usar en `href`. */
export function enlaceWhatsapp(mensaje: string = MARCA.whatsappMensaje): string {
  return `https://wa.me/${MARCA.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Redes sociales del negocio. */
export const REDES = [
  { href: 'https://instagram.com', icono: 'photo_camera', etiqueta: 'Instagram' },
  { href: 'https://tiktok.com', icono: 'play_circle', etiqueta: 'TikTok' },
  { href: enlaceWhatsapp(), icono: 'chat', etiqueta: 'WhatsApp' },
] as const;
