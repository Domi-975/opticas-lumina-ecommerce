module.exports = {
  env: {
    es2022: true,
    node: true
  },
  overrides: [
    {
      files: ['tests/**/*.js', '**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
        node: true
      }
    }
  ]
}
