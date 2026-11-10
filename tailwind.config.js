/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grit: {
          50: '#f0fdf4',
          500: '#10b981',
          gold: '#f59e0b',
          navy: '#0b0f19',
          card: '#131b2e',
          cardBorder: '#1e293b',
          accent: '#6366f1',
          orange: '#ff6b35'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
