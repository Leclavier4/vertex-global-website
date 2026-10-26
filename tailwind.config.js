/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand namespace kept for continuity (gold accents, legacy references).
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

        // Semantic design-system tokens. See DESIGN_SYSTEM.md for roles and
        // the contrast checks behind each value.
        midnight: '#081426',
        navy: '#0D1F35',
        'navy-deep': '#10233F',
        primary: '#1D5FA8',
        // #2563EB keeps white button text at 5.2:1; the brief's #2E7FD4 only
        // reaches 4.1:1, so it stays a decorative tint (primary-bright).
        'primary-hover': '#2563EB',
        'primary-bright': '#2E7FD4',
        secondary: '#0D1F35',
        accent: '#22D3EE',
        'text-primary': '#111827',
        'text-secondary': '#5B6472',
        background: '#FFFFFF',
        surface: '#F5F7FA',
        border: '#E5EAF1',
        focus: '#2563EB',
        'focus-dark': '#D4A84B',
        success: '#15803D',
        warning: '#B45309',
        error: '#B91C1C',
        disabled: '#9CA3AF',
        // Oil Slick / iridescent accent: decorative surfaces only, never text.
        iridescent: '#8B5CF6',
      },

      fontFamily: {
        // font-serif: display/headings. font-sans: body copy.
        // font-label: labels, tags, captions, technical data.
        serif: ['"Plus Jakarta Sans"', 'Inter', 'Arial', 'sans-serif'],
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        label: ['Roboto', 'Inter', 'Arial', 'sans-serif'],
      },

      // Tailwind's default spacing scale is already 4px-based and covers the
      // full brief scale natively (1=4px … 32=128px), no override needed.

      maxWidth: {
        '7xl': '80rem',
        content: '1180px',
      },

      // Named radius scale, separate from Tailwind's rounded-lg/xl/2xl.
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
        'out-expo': 'cubic-bezier(.22,1,.36,1)',
      },

      boxShadow: {
        // Diffuse, low-contrast elevation scale: depth without heaviness.
        'ds-sm': '0 1px 2px rgba(16,35,63,0.06), 0 1px 1px rgba(16,35,63,0.04)',
        'ds-md': '0 12px 32px -18px rgba(16,35,63,0.28)',
        'ds-lg': '0 28px 60px -32px rgba(16,35,63,0.4)',
        'ds-glow': '0 18px 48px -20px rgba(37,99,235,0.55)',
      },
    },
  },
  plugins: [],
}
