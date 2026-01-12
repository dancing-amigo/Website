module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#4a4a4a",
        muted: "#8a8a8a",
        background: "#fafafa",
        surface: "#ffffff",
        border: "#e5e5e5",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        title: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        body: ["1.125rem", { lineHeight: "1.7" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      maxWidth: {
        prose: "65ch",
        content: "720px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#1a1a1a",
            lineHeight: "1.8",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
