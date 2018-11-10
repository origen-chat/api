module.exports = {
  root: false,

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: [
    'node',
    'promise',
    'unicorn',
    'jest',
    'react',
    'import',
    'jsx-a11y',
    'typescript',
    'ramda',
    'graphql',
    'fp',
    'eslint-comments',
    'prettier',
  ],

  env: {
    es6: true,
    browser: true,
    serviceworker: true,
    jest: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'airbnb',
    'plugin:ramda/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:fp/recommended',
    'prettier',
    'prettier/react',
  ],

  rules: {
    'no-use-before-define': 'off',

    'unicorn/filename-case': 'off',

    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],

    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'prettier/prettier': 'error',

    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/node-builtins': 'off',
    'node/no-unpublished-require': 'off',

    'promise/valid-params': 'off',

    'fp/no-mutation': 'off',
    'fp/no-throw': 'off',
    'fp/no-nil': 'off',
    'fp/no-let': 'off',
    'fp/no-unused-expression': 'off',
    'fp/no-rest-parameters': 'off',
    'fp/no-this': 'off',
    'fp/no-class': 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: 'typescript-eslint-parser',

      rules: {
        'no-undef': 'off',
        'no-restricted-globals': 'off',
        'no-shadow': 'off',
        camelcase: 'off',
        'prefer-destructuring': 'off',
        'no-multi-str': 'off',

        'react/prop-types': 'off',
        'react/sort-comp': 'off',
        'react/destructuring-assignment': 'off',

        'import/export': 'off',

        'typescript/no-unused-vars': 'error',
        'typescript/class-name-casing': 'error',
        'typescript/generic-type-naming': ['error', '^T[A-Z][a-zA-Z]+$'],
        'typescript/no-non-null-assertion': 'error',
      },
    },
  ],
};
