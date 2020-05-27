// finds all html in our files and removes unused classes in tailwind stylesheet
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
  css: ['./src/tailwind.css'],

  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
})
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : []),
  ],
}
