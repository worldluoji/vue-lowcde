module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    node: true
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    'vue/v-on-event-hyphenation': 'off'
  },
  settings: {
    vue: {
      version: 'detect'
    }
  }
};