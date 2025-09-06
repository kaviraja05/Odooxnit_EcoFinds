/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': '#22c55e',
        'eco-dark': '#15803d',
      }
    },
  },
  plugins: [],
}
