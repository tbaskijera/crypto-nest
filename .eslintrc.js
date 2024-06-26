module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/self-closing-comp": "error",
    "react/display-name": "off",
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "off",
  },
};
