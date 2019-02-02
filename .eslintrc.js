module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['warn', 'always'],
    'no-console': 'off',
    'no-unused-vars': 0,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
};
