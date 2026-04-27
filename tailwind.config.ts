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
        primary: "#2C1622",
        secondary: "#999570",
        background: "#E1E0D4",
        foreground: "#2C1622",
        accent: "#B0B8C9",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        "accent-foreground": "var(--accent-foreground)",
      },
      fontFamily: {
        serif: ['"GT Super Ds Trial"', "Georgia", "serif"],
        sans: ['"Neue Haas Grotesk Display Pro"', '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        container: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
