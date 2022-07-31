/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      lineHeight: {

        '14': '3.75rem',
      },
      textColor: {
        'primary': '#1890ff',
      }
    },
  },
  plugins: [],
}
