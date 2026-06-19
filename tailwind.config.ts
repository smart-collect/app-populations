import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "480px",
      },
    },
    extend: {
      maxWidth: {
        mobile: "480px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Smart-Collect Primary Palette
        primary: {
          50: "#E8F4F0",
          100: "#C5EAE1",
          200: "#8ED4C0",
          300: "#4DB898",
          400: "#1A9B73",
          500: "#138060",
          600: "#0F6E56",
          700: "#085D4A",
          800: "#064D3D",
          900: "#032E24",
          DEFAULT: "#0F6E56",
          light: "#1D9E75",
          foreground: "#FFFFFF",
        },
        // Smart-Collect Secondary Palette
        secondary: {
          50: "#E5F5EE",
          100: "#CCEEDA",
          200: "#A3E8CE",
          300: "#70D9B4",
          400: "#3EC99A",
          500: "#22B585",
          600: "#1D9E75",
          700: "#0D7347",
          800: "#085431",
          900: "#04341E",
          DEFAULT: "#1D9E75",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // Semantic Colors
        success: {
          DEFAULT: "#16A34A",
          light: "#DCFCE7",
          dark: "#14532D",
        },
        warning: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
          dark: "#78350F",
        },
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
          dark: "#7F1D1D",
        },
        info: {
          DEFAULT: "#2563EB",
          light: "#DBEAFE",
          dark: "#1E3A8A",
        },
        // Bin Status Colors
        bin: {
          normal: "#0F6E56",
          almost: "#E65100",
          full: "#A32D2D",
          fire: "#7A0000",
          offline: "#707070",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
        "11": "2.75rem",
        "12": "3rem",
        "13": "3.25rem",
        "14": "3.5rem",
        "15": "3.75rem",
        "16": "4rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,.06), 0 1px 3px 0 rgba(0,0,0,.1)",
        md: "0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -1px rgba(0,0,0,.06)",
        lg: "0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -2px rgba(0,0,0,.05)",
        xl: "0 20px 25px -5px rgba(0,0,0,.12), 0 10px 10px -5px rgba(0,0,0,.04)",
      },
      zIndex: {
        base: "0",
        raised: "10",
        dropdown: "100",
        sticky: "200",
        overlay: "300",
        modal: "400",
        toast: "500",
        tooltip: "600",
        max: "9999",
      },
      keyframes: {
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(29,158,117,0.3)" },
          "50%": { boxShadow: "0 0 0 6px rgba(29,158,117,0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        "pulse-green": "pulse-green 2.5s ease-in-out infinite",
        blink: "blink 0.9s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
