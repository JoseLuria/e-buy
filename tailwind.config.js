/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "low-gray": "#ECEFF4",
        gray: "#D8DEE9",
        red: "#CD2C2C",
        green: "#2E7D32",
        dark: "#000000",
        black: "#141414",
      },
    },
    maxWidth: {
      container: "1110px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
