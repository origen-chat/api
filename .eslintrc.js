module.exports = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },

  plugins: [
    'node',
    'promise',
    'unicorn',
    'jest',
    'react',
    'import',
    'security',
    'jsx-a11y',
    '@typescript-eslint',
    'ramda',
    'graphql',
    'fp',
    'eslint-comments',
    'prettier',
  ],

  env: {
    es6: true,
    jest: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'plugin:jest/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:ramda/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:fp/recommended',
    'prettier',
    'prettier/react',
  ],

  rules: {
    'no-use-before-define': 'off',

    'unicorn/filename-case': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',

    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],

    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],

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

    '@typescript-eslint/indent': 'off',
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
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },

      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-restricted-globals': 'off',
        'no-shadow': 'off',
        'prefer-destructuring': 'off',
        'no-multi-str': 'off',

        'react/prop-types': 'off',
        'react/sort-comp': 'off',
        'react/destructuring-assignment': 'off',

        'import/export': 'off',

        '@typescript-eslint/generic-type-naming': [
          'error',
          '^T[A-Z][a-zA-Z]+$',
        ],
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
