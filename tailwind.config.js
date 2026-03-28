/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary teal — lifted from docs header #1d7773
        teal: {
          50: '#eefaf9',
          100: '#d5f2f0',
          200: '#a8e5e1',
          300: '#73d1cc',
          400: '#3ab5af',
          500: '#1d7773',
          600: '#186260',
          700: '#144f4d',
          800: '#103e3c',
          900: '#0c2e2d',
        },
        // Gold accent — from GitHub stars badge #daaa3f
        gold: {
          50: '#fdf8eb',
          100: '#faedcc',
          200: '#f4db99',
          300: '#edc560',
          400: '#daaa3f',
          500: '#c4922a',
          600: '#a3741f',
          700: '#7d5818',
          800: '#5c4113',
          900: '#3e2c0e',
        },
        // Surfaces
        surface: {
          DEFAULT: '#ffffff',
          warm: '#fffaef',   // docs code-block background
          muted: '#f8f7f4',  // slightly warm gray
          dim: '#f3f3f3',    // docs --accent-super-dim
        },
        // Text
        ink: {
          DEFAULT: '#34393e', // docs --font-color
          muted: '#6b7280',
          faint: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(61,65,68,0.06), 0 1px 3px 1px rgba(61,65,68,0.16)',
      },
    },
  },
  plugins: [],
}
