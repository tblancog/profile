import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        jetbrains: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            background: "#0A0F14",
            foreground: "#FFFFFF",
            primary: {
              DEFAULT: "#FFD700",
              foreground: "#0A0F14",
            },
            secondary: {
              DEFAULT: "#1E293B",
              foreground: "#94A3B8",
            },
            content1: "#0F1419",
            content2: "#1E293B",
            content3: "#334155",
            default: {
              100: "#1E293B",
              200: "#334155",
              foreground: "#94A3B8",
            },
          },
        },
      },
    }),
  ],
};

export default config;
