/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      rotate: {
        '360': '360deg',
      },
      transitionDuration: {
        '3000': '3000ms', // Add your custom duration here
      },
    },
  },
  plugins: [],
}
