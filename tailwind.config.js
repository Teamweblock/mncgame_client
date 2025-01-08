/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    ".src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        lg: '0 2px 4px rgba(255, 255, 255, 0.5)',
        xl: '0 4px 6px rgba(255, 255, 255, 0.7)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'transparent' },
        },
        shine: {
          '0%': { backgroundPosition: '-200%' },
          '100%': { backgroundPosition: '200%' },
        },
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite"
      },
      animation: {
        typing: 'typing 2s steps(30, end), blink-caret 0.7s step-end infinite',
        shine: 'shine 2s infinite linear',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}


