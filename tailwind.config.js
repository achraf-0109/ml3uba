/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        morocco: {
          red: '#C1272D',
          gold: '#FFD700',
          dark: '#1A0000',
        },
      },
      boxShadow: {
        'glow-red': '0 0 15px rgba(193, 39, 45, 0.5), 0 0 30px rgba(193, 39, 45, 0.3)',
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
