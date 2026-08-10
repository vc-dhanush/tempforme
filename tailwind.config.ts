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
        ink: {
          950: "#06080d",
          900: "#0b0f17",
          850: "#101622",
          800: "#151d2c",
          700: "#1e293b",
          600: "#334155",
        },
        mist: {
          50: "#f4f7fb",
          100: "#e8eef6",
          200: "#c9d4e3",
          300: "#9aabbf",
          400: "#6b7f98",
          500: "#4a5d75",
        },
        accent: {
          DEFAULT: "#3ecfb2",
          soft: "#7ee7d1",
          deep: "#1f9f88",
          muted: "rgba(62, 207, 178, 0.12)",
        },
        copper: {
          DEFAULT: "#d4a574",
          soft: "#e8c9a8",
          muted: "rgba(212, 165, 116, 0.14)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.35)",
        glow: "0 0 0 1px rgba(62,207,178,0.18), 0 12px 40px rgba(62,207,178,0.08)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(ellipse 70% 50% at 70% 20%, rgba(62,207,178,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(212,165,116,0.08), transparent 50%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
