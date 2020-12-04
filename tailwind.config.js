module.exports = {
  purge: ['./src/**/*.ts', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        orbit: {
          '0%, 100%': { 
            transform: 'rotate(360deg)' 
          },
          '50%': { 
            transform: 'rotate(0deg)' 
          },
        }
      },
      animation: {
        orbit: 'orbit 5s ease-in-out infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
