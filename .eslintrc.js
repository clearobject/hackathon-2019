module.exports = {
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  'env': {
    'node': true,
    'es6': true
  },
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 2017
  },
  'rules': {
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'curly': ['error', 'multi-line', 'consistent'],
    'dot-location': ['error', 'property'],
    'handle-callback-err': 'off',
    indent: ['error', 'tab', {
      'VariableDeclarator': {
        'var': 2,
        'let': 2,
        'const': 3,
      }
    }],
    'max-nested-callbacks': ['error', {
      'max': 4
    }],
    'max-statements-per-line': ['error', {
      'max': 4
    }],
    'no-case-declarations': 'error',
    'no-console': 'off',
    'no-empty-function': 'error',
    'no-floating-decimal': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxEOF': 1,
      'maxBOF': 0
    }],
    // 'multiline-comment-style': ["error", "starred-block"],
    'no-shadow': ['error', {
      'allow': ['err', 'resolve', 'reject']
    }],
    'no-trailing-spaces': ['error'],
    'no-var': 'error',
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'yoda': 'error'
  }
}
