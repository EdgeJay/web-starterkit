module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // add your custom rules here
  rules: {
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': true,
    }],
    'react/jsx-filename-extension': [1, {
      'extensions': ['.js', '.jsx'],
    }]
  },
};
  