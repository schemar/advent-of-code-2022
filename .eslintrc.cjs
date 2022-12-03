module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': ['error', 'after'],
    'max-len': [
      'error',
      {
        code: 80,
      },
    ],
    'no-console': 'off',
  },
};
