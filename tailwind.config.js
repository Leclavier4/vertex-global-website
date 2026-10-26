/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy/brand namespace — every existing component references
        // these directly (bg-vertex-navy, text-vertex-gold-light, etc.).
        // Left untouched so nothing already built breaks.
        vertex: {
          navy: '#0D1F35',
          'blue-deep': '#1A3A5C',
          blue: '#1D5FA8',
          'blue-light': '#378ADD',
          gold: '#B7862C',
          'gold-light': '#D4A84B',
          'off-white': '#F8FAFC',
          'text-dark': '#111827',
          'text-mid': '#374151',
          'text-muted': '#6B7280',
          orange: '#F59E0B',
          'orange-dark': '#D98C0A',
          success: '#22C55E',
        },

        // Semantic design-system tokens (new). Components migrate to these
        // over time; both namespaces are valid to use simultaneously.
        primary: '#1D5FA8',
        'primary-hover': '#2E7FD4',
        secondary: '#0D1F35',
        accent: '#22D3EE',
        'text-primary': '#111827',
        'text-secondary': '#5B6472',
        background: '#FFFFFF',
        surface: '#F5F7FA',
        border: '#E5EAF1',
        focus: '#D4A84B',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        disabled: '#9CA3AF',
        // Oil Slick / iridescent accent — decorative only, never on
        // functional text (see design-system.md).
        iridescent: '#8B5CF6',
      },

      fontFamily: {
        // font-serif: display/headings. font-sans: body copy. font-label:
        // labels, tags, captions, technical/mono-ish data.
        serif: ['"Plus Jakarta Sans"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        label: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'],
      },

      // Tailwind's default spacing scale is already 4px-based (1=4px, 2=8px,
      // 3=12px, 4=16px, 6=24px, 8=32px, 12=48px, 16=64px, 20=80px, 24=96px,
      // 32=128px) — it covers the full brief scale natively, no override needed.

      maxWidth: {
        '7xl': '80rem',
        content: '1180px',
      },

      // New named radius scale, kept separate from Tailwind's own
      // rounded-lg/xl/2xl/3xl so none of the ~30 existing usages of those
      // shift size. Opt in per component as it's redesigned.
      borderRadius: {
        'ds-sm': '8px',
        'ds-md': '12px',
        'ds-lg': '16px',
        'ds-xl': '24px',
        'ds-2xl': '32px',
        'ds-pill': '999px',
      },

      transitionTimingFunction: {
        spring: 'cubic-bezier(.34,1.56,.64,1)',
      },
    },
  },
  plugins: [],
}
