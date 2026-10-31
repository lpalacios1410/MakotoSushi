/**
 * Utilidades de horarios de las sedes.
 * Convierte los horarios legibles del contenido (JSON) al formato
 * `OpeningHoursSpecification` de schema.org para los datos estructurados.
 */

/** Días de la semana en schema.org, indexados para poder recortar rangos. */
const DIAS_SEMANA = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const DIAS_ES: Record<string, (typeof DIAS_SEMANA)[number]> = {
  lunes: 'Monday',
  martes: 'Tuesday',
  'miércoles': 'Wednesday',
  miercoles: 'Wednesday',
  jueves: 'Thursday',
  viernes: 'Friday',
  sábado: 'Saturday',
  sabado: 'Saturday',
  domingo: 'Sunday',
};

/** Convierte "10:00 am" / "12:00 am / 1:00 am" en formato 24h "HH:MM". */
export function aHora24(valor: string): string {
  const coincidencia = valor.trim().toLowerCase().match(/^(\d{1,2}):(\d{2})\s*(am|pm)?/);
  if (!coincidencia) return '00:00';

  let horas = Number(coincidencia[1]);
  const minutos = coincidencia[2];
  const meridiano = coincidencia[3];

  if (meridiano === 'pm' && horas < 12) horas += 12;
  if (meridiano === 'am' && horas === 12) horas = 0;

  return `${String(horas).padStart(2, '0')}:${minutos}`;
}

/**
 * Expande la descripción de días ("Lunes a Jueves", "Todos los días")
 * a una lista de días schema.org.
 */
export function diasSchema(dias: string): string[] {
  const texto = dias.trim().toLowerCase();

  if (texto.includes('todos')) return [...DIAS_SEMANA];

  const partes = texto.split(/\s+a\s+/);
  if (partes.length === 2) {
    const desde = DIAS_ES[partes[0].trim()];
    const hasta = DIAS_ES[partes[1].trim()];
    if (desde && hasta) {
      const inicio = DIAS_SEMANA.indexOf(desde);
      const fin = DIAS_SEMANA.indexOf(hasta);
      if (inicio <= fin) return DIAS_SEMANA.slice(inicio, fin + 1);
    }
  }

  const unico = DIAS_ES[texto];
  return unico ? [unico] : [];
}
