/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#E0E7FF",
          500: "#2563EB",
          700: "#1E40AF",
          gradient: "#E0E7FF", // opcional
        },
        neutral: {
          900: "#0F172A",
          700: "#334155",
          600: "#475569",
          200: "#E2E8F0",
          50: "#F8FAFC",
        },
        accent: "#FACC15",
        success: "#22C55E",
        error: "#EF4444",
        info: "#3B82F6",
      },
    },
  },
  plugins: [],
};
