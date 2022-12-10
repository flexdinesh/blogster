module.exports = {
  extends: [
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  // don't lint astro themes
  // don't lint cli package (it has its own lint config)
  ignorePatterns: [
    "themes/**/*",
    ".eslintrc.js",
    "packages/cli",
    "packages/@repoconfig",
  ],
};
