/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('sidebar-expanded', ['&.sidebar-expanded', '.sidebar-expanded &']);
    },
  ],
};
