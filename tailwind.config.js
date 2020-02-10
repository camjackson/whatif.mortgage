module.exports = {
  theme: {
    extend: {
      screens: {
        '2xl': '1620px',
      },
    },
  },
  variants: {
    textColor: ['hover', 'group-hover'],
  },
  plugins: [],
};

// To generate the monster version of this:
// npx tailwind init tailwind.js --full
