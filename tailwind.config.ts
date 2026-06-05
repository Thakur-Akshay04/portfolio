import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card-bg)",
        "card-border": "var(--card-border)",
        accent: {
          purple: "var(--accent-purple)",
          teal: "var(--accent-teal)",
          "purple-hover": "var(--accent-purple-hover)",
          "teal-hover": "var(--accent-teal-hover)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(158, 158, 255, 0.15)",
        "glow-teal": "0 0 25px rgba(125, 212, 147, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
