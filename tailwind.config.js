/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        google: ['Lato', 'sans-serif'],
        google2: ['Space Grotesk', 'sans-serif'],
      },
      height: {
        'banner': '100vh-6rem',
      }
    },
  },
  plugins: [],
}