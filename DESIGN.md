---
name: Urban Tokyo Dark Fusion
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#e6bdb8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#ac8884'
  outline-variant: '#5c403c'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690005'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#bf0715'
  secondary: '#4ae176'
  on-secondary: '#003915'
  secondary-container: '#00b954'
  on-secondary-container: '#004119'
  tertiary: '#f7be1d'
  on-tertiary: '#3f2e00'
  tertiary-container: '#906d00'
  on-tertiary-container: '#fff8f0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#ffdf9a'
  tertiary-fixed-dim: '#f7be1d'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4300'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Montserrat
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  margin: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the nocturnal energy of Tokyo street bars blended with high-contrast, premium dark culinary interfaces. Built specifically for high-conversion gastronomy and digital ordering, the identity captures the drama of fire, fresh ingredients, and precision knife craft. 

The aesthetic is High-Contrast Commercial Dark Mode. It eliminates muddy grays in favor of deep obsidian and pitch black surfaces, cutting through the screen with fiery vermilion crimson CTAs. Visual accents channel culinary freshness: wasabi chartreuse for dietary badges and ingredient freshness, alongside warm gold tones for chef recommendations and combo deals. The emotional atmosphere is immediate, appetizing, modern, and energetic, designed to reduce friction between appetite and checkout.

## Colors

The palette establishes an aggressive visual hierarchy tailored for low-light browsing and high culinary punch:

- **Primary (`#DC2626`)**: Torched crimson red. Used strictly for high-intent focal points: primary ordering triggers, active category pills, urgent sale badges, cart counts, and WhatsApp direct links.
- **Secondary (`#22C55E`)**: Wasabi and avocado leaf green. Reserved for vegetarian/vegan tags, fresh status indicators, and positive confirmations.
- **Tertiary (`#EAB308`)**: Toasted sesame gold. Highlights chef specials, signature roll badges, and customer ratings.
- **Neutral Dark Base (`#0D0D0F`)**: Deep obsidian canvas, paired with `#16161A` for surface panels and `#23232A` for card elevations and search containers.
- **Text & Light Accents**: `#FFFFFF` for pristine, crystal-clear titles and primary copy; `#A1A1AA` for secondary descriptions, sushi ingredient lists, and metadata.

## Typography

Typography pairs the structural, geometric presence of Montserrat for display headlines with the warm, open legibility of DM Sans for descriptive body copy and sushi ingredients. 

Titles set in Montserrat should lean toward medium-to-bold weights with uppercase treatments on small labels and category pills to evoke sleek Japanese signage. DM Sans maintains high legibility even against pitch black backdrops, preventing optical vibrating and fatigue when customers read detailed roll fillings, allergy notices, and preparation notes.

## Layout & Spacing

The system runs on a 12-column responsive fluid grid designed to handle fast-browsing food menus, quick checkout sheets, and dense product galleries.

- **Desktop (1024px+)**: 12 columns with `1.5rem` gutters and `2.5rem` outer canvas padding. Split configurations support a persistent sticky cart drawer alongside a 3-column dish grid.
- **Tablet (768px - 1023px)**: 8 columns with `1.25rem` gutters and `1.5rem` outer margins. Dishes arrange into 2-column modules.
- **Mobile (up to 767px)**: Single or double-column layouts utilizing `1rem` outer margins. Product cards compress into tight horizontal lists or edge-to-edge swipe carousels. Category pills stack in an overflow-x scroll container anchored just below the main navigation bar.

## Elevation & Depth

This design system avoids diffused ambient shadows that disappear on pure black canvases. Instead, depth is achieved via tonal surface layering and low-contrast borders:

- **Surface 0 (Canvas)**: `#0D0D0F` base background.
- **Surface 1 (Panels & Navbars)**: `#16161A` with a 1px solid border (`rgba(255, 255, 255, 0.08)`).
- **Surface 2 (Menu Cards & Modals)**: `#212127` with a 1px highlight line on top edge (`rgba(255, 255, 255, 0.12)`).
- **Surface Focus / Hover**: A hairline primary border (`#DC2626`) paired with a crimson under-glow (`box-shadow: 0 0 20px rgba(220, 38, 38, 0.25)`).
- **Sticky Elements**: Frosted glass effects are applied solely to fixed headers and checkout sheets (`backdrop-filter: blur(16px)` on `rgba(13, 13, 15, 0.85)`).

## Shapes

The interface embraces a balanced, contemporary corner curvature. With roundedness level 2:

- Buttons, inputs, and food cards inherit a base radius of `0.5rem` (8px).
- Modals, large banners, and cart flyouts expand to `1rem` (16px).
- Badges and category filter pills utilize full pill shapes (`rounded-full`) to contrast against rectangular product photography.
- Imagery employs a subtle inner corner mask to prevent sharp clipping against dark borders.

## Components

### Buttons
- **Primary Order Button**: Solid `#DC2626` background, crisp white bold text (Montserrat), 8px border radius, with a subtle scale transform (`1.02`) on hover.
- **WhatsApp Direct Action**: `#25D366` green background with pure white typography and custom chat icon.
- **Secondary / Ghost**: Outline with 1px border (`rgba(255, 255, 255, 0.15)`), transparent surface, white text; turns solid red on hover.

### Food & Dish Cards
- Structured dark containers (`#1A1A1E`) featuring high-resolution photography, an absolute top-right badge slot (for "Chef Special", "Spicy", or "Wasabi Fresh"), roll composition details in `body-sm`, price displayed in high-contrast Montserrat bold, and an instant "+" counter button.

### Category Filter Chips
- Horizontal pill strip. Inactive states feature `#16161A` background with light gray text. Active state triggers full `#DC2626` fill, bold white copy, and a slight fire-red glow.

### Interactive Quick Cart Drawer
- Anchored to the right side on desktop and docked as a bottom sheet on mobile. Dark translucent surface, order breakdown list with counter steppers (`- 1 +`), tip selectors, and a fixed checkout CTA showing live delivery time estimates.

### Form Inputs & Search Bar
- Inputs use `#16161A` filled surfaces, inset light border, and Montserrat placeholder text. Active focus states replace the border with a sharp crimson line.