import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        rowdies: ["Rowdies", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        rubik: ['var(--font-rubik)'],
        poppins: ['Poppins', 'sans-serif'],  // Added Poppins font
        baskervville: ['Baskervville', 'serif'],
        Tinos: ["Tinos", 'serif'],
        Cormorant: ["Cormorant Garamond", 'serif'] ,
        Montserrat :["Montserrat", 'sans-serif']
     
      },
      colors: {

        background: "var(--background)",
        foreground: "var(--foreground)",
        
        primary: "#6a0304", // Example primary color (indigo-600 from Tailwind's palette)
      },
      animation: {
        'gradient': 'gradient 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 1s ease-in-out',
        'highpulse': 'pulse 0.7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundSize: {
        'gradient-size': '200% 100%', // Ensure gradient spans wider for smooth transition
      },

      keyframes: {
        
        gradient: {
          '0%': { backgroundPosition: '0% 50%' }, // Start at the left
          '50%': { backgroundPosition: '100% 50%' }, // Move to the right
          '100%': { backgroundPosition: '0% 50%' }, // Loop back to the left
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
