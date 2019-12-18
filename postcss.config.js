const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.tsx', './src/**/*.ts', './public/index.html'],
  css: ['./src/styles/output.css'], // TODO: Is this needed? What does it do?
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};
