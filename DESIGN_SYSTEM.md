# Vertex Global: Design System

Reference for every visual decision on the site. Tokens live in
`tailwind.config.js`, base layers and utilities in `src/index.css`, motion in
`src/lib/motion.js`. Components should never introduce ad-hoc hex codes or
magic numbers: if a value is missing, add a token here first.

## Color

| Role | Hex | Class | Notes |
|---|---|---|---|
| Midnight | `#081426` | `bg-midnight` | Hero, footer, mobile menu |
| Navy (secondary) | `#0D1F35` | `bg-navy` / `bg-secondary` | Dark panels, glass pills |
| Navy deep | `#10233F` | `bg-navy-deep` | Inset surfaces on dark |
| Primary | `#1D5FA8` | `bg-primary` / `text-primary` | Buttons, eyebrows on light (6.5:1 on white) |
| Primary hover | `#2563EB` | `bg-primary-hover` | White text stays 5.2:1 |
| Primary bright | `#2E7FD4` | `primary-bright` | Decorative only: white text on it is 4.1:1, below AA |
| Accent (cyan) | `#22D3EE` | `text-accent` | Icons and highlights on dark only |
| Gold | `#B7862C` / `#D4A84B` | `vertex-gold`, `vertex-gold-light` | Brand accent. Gold-light on navy is 7.5:1; gold on white is 3.5:1, large text only |
| Text primary | `#111827` | `text-text-primary` | |
| Text secondary | `#5B6472` | `text-text-secondary` | 6.0:1 on white, 5.6:1 on surface |
| Background | `#FFFFFF` | `bg-background` | |
| Surface | `#F5F7FA` | `bg-surface` | Alternating sections, inset panels |
| Border | `#E5EAF1` | `border-border` | |
| Focus | `#2563EB` (light) / `#D4A84B` (dark) | global `:focus-visible` | Swaps automatically inside `.theme-dark` |
| Success / Warning / Error | `#15803D` / `#B45309` / `#B91C1C` | `text-success` … | All at least 5:1 on white |
| Disabled | `#9CA3AF` | `text-disabled` | |
| Iridescent | `#8B5CF6` | `iridescent` | Oil Slick and decorative hairlines only, never on text |

The legacy `vertex.*` namespace is kept for the gold accents and continuity.

## Typography

Loaded from Google Fonts with `display=swap`.

| Token | Family | Use |
|---|---|---|
| `font-serif` | Plus Jakarta Sans 500 to 800 | Display and headings |
| `font-sans` | Inter 400 to 700 | Body and UI text (`<body>` default) |
| `font-label` | Roboto 400 to 700 | Labels, tags, captions, identifiers |

Scale (component classes in `index.css`):

| Class | Size | Line height | Tracking |
|---|---|---|---|
| `.ds-display` | `clamp(2.5rem, 1.55rem + 4vw, 4.75rem)` | 1.04 | -0.022em |
| `.ds-h2` | `clamp(1.875rem, 1.35rem + 2.1vw, 2.875rem)` | 1.1 | -0.02em |
| `.ds-h3` | 1.25rem | 1.3 | -0.01em |
| `.ds-quote` | `clamp(1.375rem, 1.05rem + 1.3vw, 2rem)` | 1.3 | -0.015em |
| `.ds-lede` | `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)` | 1.65 | 0, max 62ch |
| `.ds-body` | 1rem | 1.75 | 0, max 65ch |
| `.ds-eyebrow` | 0.75rem uppercase | 1.4 | 0.16em |
| `.ds-label` | 0.6875rem uppercase | 1.4 | 0.1em |
| `.ds-data` | inherits | | Roboto, tabular figures (RCCM, IFU, years) |

French copy uses a non-breaking space before `:` `;` `?` `!` so punctuation
never starts a line. No em dashes anywhere in published copy.

## Spacing, grid, radius, elevation

- Spacing: Tailwind's default 4px scale (`1` = 4px … `32` = 128px).
- Container: `.ds-container` = `max-w-content` (1180px) with 20px / 32px gutters.
- Sections: `.ds-section` vertical padding `clamp(4.5rem, 2.5rem + 6vw, 8rem)`.
- Radius: `rounded-ds-sm` 8, `ds-md` 12, `ds-lg` 16, `ds-xl` 24, `ds-2xl` 32,
  `ds-pill` 999. Inputs and buttons use md, cards lg/xl, stages (hero, footer) xl/2xl.
- Elevation: `shadow-ds-sm`, `ds-md`, `ds-lg` (diffuse, low contrast) and
  `ds-glow` (primary buttons on hover).

## Liquid glass and spring physics

- `.glass-surface`: `backdrop-filter: blur(20px) saturate(1.7)`.
- `.specular-edge`: lightens the top border like light on a liquid film. Pair
  with a `border` utility; it never touches `box-shadow`, so elevation can stack.
- `.spring-press` + `active:scale-[0.96]`: bounce-back press,
  `cubic-bezier(.34,1.56,.64,1)` over 320ms. On Framer Motion elements use
  `whileTap` instead: Framer owns the inline `transform`, a CSS transition
  would fight it.
- `.live-dot`: production indicator with an expanding halo.

## Components (`src/components/ui`)

- `Button`: `variant` primary / secondary / ghost, `size` sm / md / lg (44 to
  52px tall). Routes by prop: `to` (in-page section), `route` (react-router),
  `href` (external links open in a new tab with `noopener`), else `<button>`.
  States: hover, focus-visible, active, disabled, `loading` (aria-busy).
- `SectionLink`: real `<a href="#id">` anchors (keyboard accessible, works
  without JS) with smooth scroll that respects reduced motion.
- `SectionHeader`: eyebrow, heading, lede, `tone` light/dark.
- `Reveal`: scroll-triggered entrance from the motion tokens.

## Motion

Tokens in `src/lib/motion.js`: durations (fast 0.18s, base 0.32s, slow 0.6s,
slower 0.9s), easings (`out`, `inOut`, `spring`), distances (8 / 20 / 36px),
8% stagger. `<MotionConfig reducedMotion="user">` in `App.jsx` disables
transform animations under `prefers-reduced-motion`; CSS transitions collapse
via the global media query.

## Oil Slick (Hero)

`src/lib/oilSlick/` (WebGL 1 fragment shader, no Three.js) and
`src/components/OilSlick.jsx`.

- Height field: domain-warped fBm simplex noise; normals by finite differences.
- Color: thin-film ramp clamped to midnight, electric blue, cyan and silver,
  shifted by lighting; violet and a trace of magenta as large slow veils on
  slopes; silver specular with a hint of gold on crests.
- Quality tiers: high (4 octaves, 62% resolution, 60fps cap, 0.95MP max)
  and low for touch or modest devices (3 octaves, 45%, 30fps, 0.32MP max).
- Pauses off-screen and in background tabs; one static frame under reduced
  motion or Save-Data; pointer-driven light on fine pointers only.
- Fallback: `.oil-slick-fallback` static gradient when WebGL is missing or lost.
- Cleanup: canvas created per mount, GL objects deleted and the context
  released on unmount (verified: 20 mount cycles, no context warnings).
- Restricted to the hero. Secondary surfaces use the CSS `.iridescent-halo`.
