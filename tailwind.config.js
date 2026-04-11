module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#151515",
        secondary: "#4a4742",
        muted: "#7f766a",
        background: "#f2ede6",
        surface: "#f8f4ee",
        border: "#d8d0c4",
        accent: "#b65a3a",
      },
      fontFamily: {
        display: ['"Zen Old Mincho"', "serif"],
        sans: ['"Zen Old Mincho"', "serif"],
      },
      maxWidth: {
        site: "1160px",
        prose: "68ch",
      },
      boxShadow: {
        card: "0 24px 80px rgba(21, 21, 21, 0.08)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
