import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:    { DEFAULT: "#1A1A1A", deep: "#0F0F0F", surface: "#3A3A3A" },
        orange:  { DEFAULT: "#B79B6A", dark: "#97825A" },
        muted:   "#B0A898",
        ink:     { DEFAULT: "#1A1A1A", soft: "#4A4A4A" },
        border:  "#E8E2D2",
        softbg:  "#F8F5EE",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans:  ["var(--font-sans)",  "system-ui", "sans-serif"],
        mono:  ["var(--font-mono)",  "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
