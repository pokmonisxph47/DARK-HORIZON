import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-abyss": "#0a0f2e",
        "purple-deep": "#1a0a2e",
        "purple-mid": "#2d1b4e",
        gold: "#c9a84c",
        "gold-light": "#f0d080",
      },
      fontFamily: {
        cinzel: ["'Cinzel'", "serif"],
        "cinzel-deco": ["'Cinzel Decorative'", "serif"],
        crimson: ["'Crimson Text'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
