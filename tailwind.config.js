module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        righteous: ['Righteous', 'cursive'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
