module.exports = {
  env: {
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended'
  ],
  plugins: [ 'jest' ],
  rules: {
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-console': 'warn',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'no-eval': 'error',
    'no-path-concat': 'error',
    'brace-style': 'error',
    'comma-dangle': ['error', 'never'],
    'func-style': ['error', 'expression'],
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error'
  }
}