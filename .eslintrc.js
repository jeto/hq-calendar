module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "no-trailing-spaces": 1,
    "indent": ["error", 2],
    "quotes": [1, "single", "avoid-escape"],
    "comma-spacing": ["error", {"before": false, "after": true}],
    "semi": ["error", "always"]
  }
};