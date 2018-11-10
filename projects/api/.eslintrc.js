module.exports = {
  root: false,

  env: {
    es6: true,
    jest: true,
    node: true,
    browser: false,
  },

  rules: {},

  overrides: [
    {
      files: ['**/*.ts'],
      parser: 'typescript-eslint-parser',

      rules: {},
    },
  ],
};
