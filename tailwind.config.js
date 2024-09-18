/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    extend: {
      fontFamily: {
        playwright: ['Playwright Cuba', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
