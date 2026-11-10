/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#ECE3D4',
          400: '#DDD0BC',
          card: '#FFFFFF',
          surface: '#FBF9F5',
          border: '#E8E1D5',
          darkBorder: '#D8CEBF'
        },
        grit: {
          rust: '#C2410C',
          orange: '#EA580C',
          amber: '#D97706',
          forest: '#059669',
          crimson: '#DC2626',
          indigo: '#4F46E5',
          charcoal: '#1C1917',
          stone: '#292524'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
