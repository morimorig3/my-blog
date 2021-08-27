module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,css}', './*.{js,jsx,ts,tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        twitter: '#55acee',
        github: '#24292e',
        qiita: '#55c500',
      },
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
