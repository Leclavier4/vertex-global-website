# Vertex Global — Design System

Living reference for the Phase 1 foundations laid in `tailwind.config.js` and
`src/index.css`. Every visual decision in the codebase should trace back to a
token documented here — no ad-hoc hex codes or magic numbers in components.

## Color

Two coexisting namespaces, both valid to use:

- **`vertex.*`** — the original brand namespace (`bg-vertex-navy`,
  `text-vertex-gold-light`, …). Every existing component already uses this;
  left untouched so nothing breaks.
- **Semantic tokens** (new) — `primary`, `primary-hover`, `secondary`,
  `accent`, `text-primary`, `text-secondary`, `background`, `surface`,
  `border`, `focus`, `success`, `warning`, `error`, `disabled`,
  `iridescent`. Use these for new/rebuilt components going forward.

| Role | Hex | Tailwind class |
|---|---|---|
| Primary (electric blue) | `#1D5FA8` | `bg-primary` / `text-primary` |
| Primary hover | `#2E7FD4` | `bg-primary-hover` |
| Secondary (navy) | `#0D1F35` | `bg-secondary` |
| Accent (cyan) | `#22D3EE` | `bg-accent` |
| Text primary | `#111827` | `text-text-primary` |
| Text secondary | `#5B6472` | `text-text-secondary` |
| Background | `#FFFFFF` | `bg-background` |
| Surface | `#F5F7FA` | `bg-surface` |
| Border | `#E5EAF1` | `border-border` |
| Focus | `#D4A84B` (gold) | `ring-focus` |
| Success | `#22C55E` | `text-success` |
| Warning | `#F59E0B` | `text-warning` |
| Error | `#EF4444` | `text-error` |
| Disabled | `#9CA3AF` | `text-disabled` |
| Iridescent (Oil Slick only) | `#8B5CF6` | `text-iridescent` |

**Iridescence is decorative only** — never on functional/body text. Gold
(`vertex.gold` / `vertex.gold-light`) stays the brand's sole accent on
functional UI (buttons, links, badges); violet/cyan live in the Oil Slick
surface alone.

Contrast: `text-primary` (#111827) on `background`/`surface` exceeds WCAG AA
for body text; `text-secondary` (#5B6472) on white is ~4.6:1, AA for normal
text. Verify any new dark-on-dark or light-on-light pairing individually.

## Typography

Three typefaces, loaded via Google Fonts in `index.html` with
`display=swap` (text never blocked on font load):

| Token | Family | Used for |
|---|---|---|
| `font-serif` | Plus Jakarta Sans | Display, Hero, H1–H4, headings |
| `font-sans` | Inter | Body copy, paragraphs, UI text (also the `<body>` default) |
| `font-label` | Roboto | Labels, tags, captions, nav, technical/data strings |

Weights loaded: Plus Jakarta Sans 500/600/700/800, Inter 400/500/600/700,
Roboto 400/500/700.

**Scale** (to apply as components are rebuilt — not yet enforced
everywhere):

| Role | Size | Line-height | Letter-spacing |
|---|---|---|---|
| Display / Hero | `clamp(2.5rem, 5vw, 4rem)` | 1.08 | -1.5px |
| H1 | `clamp(2rem, 3.5vw, 2.75rem)` | 1.15 | -1px |
| H2 | `clamp(1.5rem, 2.5vw, 2.125rem)` | 1.2 | -0.75px |
| H3 | 1.5rem | 1.3 | -0.5px |
| H4 | 1.25rem | 1.4 | -0.25px |
| Body Large | 1.125rem | 1.7 | 0 |
| Body | 1rem | 1.7 | 0 |
| Body Small | 0.875rem | 1.65 | 0 |
| Label / Caption / Nav / Button | 0.75–0.8125rem | 1.4 | 0.08–0.15em, uppercase |

Paragraph width: `max-w-[65ch]`. Never resize/weight text purely for
decoration — every size maps to a semantic role above.

## Spacing & Grid

Tailwind's **default** spacing scale is already 4px-based and covers the
full brief scale natively — no override was needed:

`1`=4px · `2`=8px · `3`=12px · `4`=16px · `6`=24px · `8`=32px · `12`=48px ·
`16`=64px · `20`=80px · `24`=96px · `32`=128px

Content container: `max-w-content` = 1180px (new, alongside the existing
`max-w-7xl` = 1280px used by current sections — migrate section-by-section).
12-column grid via Tailwind's native `grid-cols-12`. Use `clamp()` for fluid
type/spacing between breakpoints rather than hard breakpoint jumps.

## Radius

New named scale (`borderRadius` in `tailwind.config.js`), kept **separate**
from Tailwind's own `rounded-lg/xl/2xl/3xl` so the ~30 existing usages of
those don't silently resize:

| Token | Value | Class |
|---|---|---|
| Small | 8px | `rounded-ds-sm` |
| Medium | 12px | `rounded-ds-md` |
| Large | 16px | `rounded-ds-lg` |
| XL | 24px | `rounded-ds-xl` |
| 2XL | 32px | `rounded-ds-2xl` |
| Pill | 999px | `rounded-ds-pill` |

Don't default everything to the same radius — match it to the element's
role (pills for badges/tags, Large/XL for cards, Small/Medium for inputs
and small buttons).

## Liquid Glass & Spring Physics

Reusable CSS utilities in `src/index.css`:

- **`.glass-surface`** — `backdrop-filter: blur(20px) saturate(1.7)` +
  a hairline top specular highlight (`inset 0 1px 0 rgba(255,255,255,.35)`).
  For glass panels (scrolled navbar, floating badges, modals).
- **`.spring-press`** — spring easing (`cubic-bezier(.34,1.56,.64,1)`,
  320ms) for transform/shadow/color transitions. Pair with
  `active:scale-[0.96]` (or `.97`) in the component's own className.
  Respects `prefers-reduced-motion` (collapses to ~0ms).

`ease-spring` is also available as a Tailwind transition-timing-function
utility for one-off cases that don't need the full `.spring-press` class.

## Motion

- Entrance animations: IntersectionObserver / Framer Motion `whileInView`,
  `once: true`, ~0.5–0.7s, `ease: 'easeOut'`.
- Micro-interactions: spring physics as above.
- Everything wraps in `prefers-reduced-motion` handling — see the global
  `@media (prefers-reduced-motion: reduce)` block in `index.css`
  (CSS transitions/animations) and respect it individually for any
  Framer Motion `animate` loop that drives layout-affecting properties.

## Oil Slick / Iridescent accent

Reserved for the Hero surface (and, sparingly, a halo behind the final CTA).
Never a full-page background. Implementation tracked separately — see
project history for the chosen WebGL approach once built.
