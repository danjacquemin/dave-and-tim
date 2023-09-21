/** @type {import("prettier").Config} */

// this is ABSOLUTELY not getting respected here
// so while it may work at some point in the future
// if you want changes to prettier, also add them to
// .prettierrc :-|
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
}

module.exports = {
  config,
  plugins: ['prettier-plugin-tailwindcss'],
}
