/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // If you're using Vite
    './src/**/*.{js,ts,jsx,tsx}', // Include all source files
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.3s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-4px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
