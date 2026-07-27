/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
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
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
}
