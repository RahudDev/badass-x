module.exports = {
  content: [
    "./src/pages/LandingPage.js", // Scan only this specific file
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'gradient-x': 'gradientX 6s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      spacing: {
        // Add spacing to control the delay (e.g., delay-1 for 1s)
        delay: '1s',
      },
    },
  },
  plugins: [],
}
