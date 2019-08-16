module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      experimentalDecorators: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-var-requires': 0,
    semi: ['error', 'never'],
    'max-lines': ['error'],
    'max-depth': ['error'],
    complexity: ['error', 5],
  },
}
