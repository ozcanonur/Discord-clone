module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-shadow': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-indent': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
