/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 2px #80e8c6, 0 0 2px #ff0000, 0 0 5px #ff0000, 0 0 2px #fb002c' },
          '50%': { boxShadow: '0 0 4px #ff0000, 0 0 2px #ff0000, 0 0 3px #ff0000, 0 0 4px #ff0000' }
        }
      },
      fontFamily: {
        rubik: ['Rubik Doodle Shadow'],
        sans: ["Roboto", "sans-serif"],
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}