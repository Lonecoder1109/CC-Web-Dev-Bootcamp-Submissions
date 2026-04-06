/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: "#0a0a0f",
        paper: "#f5f0e8",
        accent: "#ff4d00",
        muted: "#8b8680",
        surface: "#1a1a24",
        border: "#2a2a38",
      },
    },
  },
  plugins: [],
};
