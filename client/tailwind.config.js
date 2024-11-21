/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#B4A967',
        'secondary': '#FFFFFF',
        'bgdark': '#101517',
        'accent': '#CCCCCC',
        'secondary-accent': '#A0A09F',
        'tertiary-accent' : "#2F2E2E"
      },
      fontFamily: {
        'primary': ["Roboto", "sans-serif"],
        'secondary': ["Poppins", "sans-serif"],
        'tertiary': ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [],
}

