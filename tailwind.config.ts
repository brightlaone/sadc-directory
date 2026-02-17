import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fecdc9",
          300: "#fda9a3",
          400: "#fa776e",
          500: "#f04d42",
          600: "#dd2f24",
          700: "#ba241a",
          800: "#9a2219",
          900: "#80231b",
          950: "#460d09",
        },
        gold: {
          400: "#f5c518",
          500: "#e6b800",
          600: "#c9a000",
        },
        earth: {
          50: "#faf8f5",
          100: "#f2ede4",
          200: "#e3d9c8",
          300: "#cebda4",
          400: "#b79b7a",
          500: "#a78060",
          600: "#956b50",
          700: "#7c5443",
          800: "#67453a",
          900: "#563b33",
        }
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Source Sans 3'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
