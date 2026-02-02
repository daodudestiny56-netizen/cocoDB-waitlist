/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#030303", // True Black
        surface: "#0A0A0A",   // Almost Black
        primary: "#F97316",   // Orange-500
        secondary: "#FB923C", // Orange-400
        accent: "#FDBA74",    // Orange-300
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #F97316, 0 0 10px #F97316' },
          '100%': { boxShadow: '0 0 20px #F97316, 0 0 40px #F97316' },
        }
      }
    },
  },
  plugins: [],
}
