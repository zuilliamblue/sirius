/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        siriusNavy: "#0b1022",
        siriusBlue: "#2e338a",
      },
    },
  },
  plugins: [],
};
