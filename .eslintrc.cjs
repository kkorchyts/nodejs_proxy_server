module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    },
    "ignorePatterns": ["build/*"]
}
