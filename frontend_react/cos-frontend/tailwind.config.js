/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    ],
  theme: {
    extend: {
      width: {
        '1440':'1440px',
      },
      height: {
        '900':'900px',
      },
    },
  },
  plugins: [],
}

