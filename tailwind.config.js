// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Usada por "font-sans" (já aplicada no <body>)
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        // Para títulos quando quisermos: className="font-heading"
        heading: ["Poppins", "Manrope", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
