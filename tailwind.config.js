/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik Doodle Shadow'],
        sans: ["Roboto", "sans-serif"],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'shantell': ['Shantell Sans', 'serif'] 
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}