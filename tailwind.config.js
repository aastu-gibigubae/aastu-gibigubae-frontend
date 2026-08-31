/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core brand palette — from Figma design tokens
        primary: {
          DEFAULT: "#24468F", // main blue
          dark: "#14275C",    // deep navy (headers, footer, high-contrast surfaces)
        },
        accent: {
          DEFAULT: "#FFC800", // gold — CTAs, highlights, active states
        },
      },
      fontFamily: {
        // English display/body faces from Figma
        heading: ["Gotham", "League Spartan", "sans-serif"],
        body: ["League Spartan", "sans-serif"],
        accentEn: ["exodus", "cursive"],
        // Amharic faces — applied via lang="am" / .font-am utility
        am: ["Abyssinica SIL", "Adwa", "sans-serif"],
        amDisplay: ["Adwa", "Abyssinica SIL", "sans-serif"],
      },
    },
  },
  plugins: [],
};
