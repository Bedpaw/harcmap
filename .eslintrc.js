/**
 * !!! IMPORTANT BEFORE CHANGE !!!
 * Remember to update code style scheme for projected after any change here and apply rules to IDE.
 * script: npm run export-code-style-scheme
 */

module.exports = {
  extends: [
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
    amd: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off',
    'eqeqeq': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'no-useless-call': 'warn',
    'no-useless-escape': 'warn',
    'padded-blocks': 'off',
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': false }],
    'operator-linebreak': ['error', 'before', { 'overrides': { '=': 'after' } }],
    'curly': ['error', 'multi-or-nest'],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'quote-props': [
      'error',
      'consistent',
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
      },
    ],
    'vue/html-indent': [
      'error',
      2,
    ],
    'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': true }],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
    '@typescript-eslint/no-var-requires': 0,
  },
};
