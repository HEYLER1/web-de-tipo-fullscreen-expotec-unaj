/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "banner-bg": "url('/bannerBg.jpg')", // Ajuste en la URL
      },
    },
  },
  plugins: [],
}
