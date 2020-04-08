module.exports = {
  extends: ['alloy', 'alloy/react', '@cru/eslint-config-lyra'],
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jquery: true
  },
  globals: {
    React: true,
    document: false,
    navigator: false,
    window: false,
    TEST: true,
    PRE: true
  },
  rules: {
    'no-invalid-this': 0,
    'max-nested-callbacks': 0,
    'max-depth': 0
  }
}
