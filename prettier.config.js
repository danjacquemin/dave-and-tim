/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
};

module.exports = {
  config,
  plugins: ["prettier-plugin-tailwindcss"],
};
