module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['unicorn', 'jest', 'typescript', 'prettier'],

  env: {
    es6: true,
    jest: true,
    browser: true,
    serviceworker: true,
    node: true,
  },

  globals: {
    page: true,
    browser: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'airbnb',
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
        'no-unused-vars': 'off',
        'no-restricted-globals': 'off',
        'prefer-destructuring': 'off',
        camelcase: 'off',

        'react/prop-types': 'off',
        'react/sort-comp': 'off',
        'react/destructuring-assignment': 'off',

        'import/export': 'off',
      },
    },
  ],
};
