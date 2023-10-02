/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        barlow: ['Barlow', 'sans-serif']
      },
      colors: {
        app:"#EA580C",
        primary: '#ffffff', 
        primary_accent:"#a8a8a8",
        primary_hover:"#ffffff15",
        secondary_accent:"#2e2e2e",
        secondary: "#0b0b0d",
        tertiary:"#1a1a1a"
      },
    },
  },
  plugins: [],
}

