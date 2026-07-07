import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — Bombay Fry & Grill
        indian: {
          DEFAULT: "#B71C1C", // Indian Red
          600: "#B71C1C",
          700: "#8E1414",
          800: "#5E0D0D",
        },
        saffron: {
          DEFAULT: "#FF8C00", // Saffron
          400: "#FFA733",
          500: "#FF8C00",
        },
        mehndi: {
          DEFAULT: "#2E7D32", // Mehndi Green
          600: "#2E7D32",
          700: "#1F5A23",
        },
        tandoori: {
          DEFAULT: "#F2B705", // Tandoori Gold
          400: "#FFCB2B",
          500: "#F2B705",
        },
        cream: {
          DEFAULT: "#FFF3E0", // Masala Cream
          50: "#FFF8EE", // bianco caldo — sfondo base del sito
          200: "#FCE6C4", // sabbia — sfumature di sezione
        },
        sunny: {
          DEFAULT: "#FFCB2B", // giallo squillante da insegna
        },
        ink: {
          DEFAULT: "#1A0606", // deepest maroon-black
          900: "#1A0606",
          800: "#2A0A0A",
          700: "#3A1010",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        accent: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "spice-radial":
          "radial-gradient(120% 120% at 50% 0%, rgba(255,140,0,0.18) 0%, rgba(183,28,28,0.10) 35%, rgba(26,6,6,0) 70%)",
        "ember": "linear-gradient(135deg, #FF8C00 0%, #B71C1C 100%)",
        "gold-flare": "linear-gradient(135deg, #FFCB2B 0%, #F2B705 50%, #FF8C00 100%)",
      },
      boxShadow: {
        // Ombre CALDE (oro/arancio a bassa alpha): niente glow "notturno"
        glow: "0 0 0 1px rgba(242,183,5,0.35), 0 18px 45px -12px rgba(255,140,0,0.4)",
        "glow-red": "0 18px 45px -12px rgba(183,28,28,0.45)",
        card: "0 25px 50px -20px rgba(150,80,15,0.35)",
        warm: "0 22px 45px -18px rgba(255,140,0,0.35)",
        "warm-red": "0 20px 45px -15px rgba(183,28,28,0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(6deg)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-5deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.85" },
          "55%": { opacity: "0.92" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "floatSlow 9s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        flicker: "flicker 4s ease-in-out infinite",
        "spin-slow": "spinSlow 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
