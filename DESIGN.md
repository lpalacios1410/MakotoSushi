# Sistema de diseño — "Japanese UI"

Estética japonesa serena: papel washi, tinta sumi, **un solo color de acento** y
mucho espacio. Todo el sitio se apoya en los **roles de color** definidos en
`src/styles/global.css`; cambiar de paleta o de día/noche se hace en un único
lugar.

La base viene de la skill [`japanese-ui`](https://github.com/elrincondeldev/skills)
(instalada en `.agents/skills/japanese-ui`).

## Principios

| Principio | Qué significa aquí |
| --- | --- |
| **Ma (間)** | Poco contenido por vista, márgenes anchos, secciones que respiran. |
| **Kanso (簡素)** | Una idea por bloque. Filetes en lugar de cajas. |
| **Shibui (渋い)** | El papel y la tinta llevan la página; el acento se reserva para lo importante. |
| **Fukinsei (不均整)** | Composiciones asimétricas, detalles torcidos (el sello del footer va a −4°). |
| **Wabi-sabi (侘寂)** | Grano de papel, trazos de pincel, un enso que nunca se cierra del todo. |

> El contenido del sitio está en español (para clientes en Venezuela): **no se
> usan caracteres japoneses** ni fuente de pincel. Los adornos son solo visuales.

## Roles de color

Definidos en `:root` dentro de `src/styles/global.css` y mapeados a utilidades
de Tailwind v4 en `@theme` (por ejemplo `--color-paper` → `bg-paper`).

| Rol | Token | Uso |
| --- | --- | --- |
| Papel | `--paper` | Fondo de la página. |
| Papel profundo | `--paper-deep` | Bandas y pies de sección. |
| Tarjeta | `--card` | Tarjetas, menús, cajón del carrito. |
| Tinta | `--ink` | Títulos y texto principal. |
| Tinta 2 / 3 | `--ink-2` / `--ink-3` | Texto secundario y metadatos. |
| Filete | `--hairline` / `--hairline-strong` | Bordes de 1 px en lugar de sombras duras. |
| Acento | `--accent` | Palabra acentuada, iconos, numerales. |
| Acento fuerte | `--accent-strong` | Texto de acento pequeño y rellenos de botón. |
| Tinta de acento | `--accent-ink` | Texto sobre rellenos de acento. |
| Lavados | `--bloom`, `--leaf`, `--deep`, `--mist`, `--gold` | Solo fondos suaves, viñetas y detalles. |
| Isla oscura | `--night` | Reservado (terminales). |

Los nombres antiguos del sistema anterior (`surface`, `primary`, `tertiary`…)
se conservan como alias en `@theme`, así que el markup existente no se rompe.

### Paletas

- **Día (`haru`)**: papel `#f7f3eb`, tinta `#26222b`, acento vermellón `#d4492c`.
- **Noche (`yoru`)**: sumi `#1b191f`, acento rojo linterna `#ec6a4c`.

El sitio **sigue al sistema**: `@media (prefers-color-scheme: dark)` cambia los
roles de `:root`, de modo que no hay dos temas que mantener.

Contraste verificado con el script de la skill:

```bash
python .agents/skills/japanese-ui/scripts/check-contrast.py src/styles/global.css
```

Ambas paletas pasan todos los pares (texto ≥ 4.5:1, acentos ≥ 3:1).

## Tipografía

| Uso | Familia | Token |
| --- | --- | --- |
| Títulos | **Shippori Mincho** (serif) | `font-headline-*` |
| Cuerpo | **Zen Maru Gothic** (redondeada) | `font-body-*`, `font-label-*` |
| Códigos | JetBrains Mono | `font-mono` |

Las escalas son fluidas (`clamp()`), así que no hay saltos entre móvil y
escritorio.

## Componentes

En `src/styles/japanese.css` (capa `components` de Tailwind, para que cualquier
utilidad pueda sobrescribirlos):

| Clase | Qué es |
| --- | --- |
| `.j-container` / `.j-section` / `.j-section-tight` | Ancho de lectura y bandas con aire. |
| `.j-band` | Fondo con degradado suave (nunca bloques de color duros). |
| `.j-head` | Encabezado de sección (eyebrow + título + lede). |
| `.j-eyebrow` | Numeral + filete + etiqueta (componente `SectionEyebrow.astro`). |
| `.j-page-head` | Encabezado de páginas interiores. |
| `.j-btn` + `--accent` / `--ink` / `--line` / `--sm` | Botones píldora. |
| `.j-ink-link` | Enlace con subrayado de acento que se dibuja. |
| `.j-card` | Tarjeta de papel (radio 22 px, sombra cálida). |
| `.j-tag` | Etiqueta / estado. |
| `.j-price` | Precio en Mincho. |

## Motivos decorativos

| Clase | Motivo |
| --- | --- |
| `.j-enso` | Círculo zen que se dibuja al revelarse la sección. |
| `.j-brush` | Trazo de pincel bajo la palabra acentuada (SVG). |
| `.j-sun` / `.j-mist` | Disco solar (luna de noche) y niebla a la deriva. |
| `.j-pattern-edge` / `.j-pattern-shippo` | Ondas *seigaiha* y círculos *shippo*. |

Todos van con `aria-hidden="true"` y la página mantiene el contenido real en el
DOM como texto.

## Movimiento

- Entrada de la primera vista: las palabras del titular suben por su línea
  (`0.15 s + i × 0.055 s`), el brush stroke se dibuja a los 1 s y la foto flota
  dentro a los 0.45 s.
- El resto de secciones se revelan al hacer scroll con `data-reveal`
  (`src/scripts/reveal.ts`), escalonados 90 ms entre hermanos.
- Todo el movimiento se anula con `prefers-reduced-motion: reduce`.
- Sin JavaScript la página se ve completa: la clase `js` en `<html>` protege
  los estados ocultos.
