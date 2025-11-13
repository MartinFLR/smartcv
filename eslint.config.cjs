// eslint.config.cjs
const { defineConfig } = require('eslint/config');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    ignores: [
      'frontend/.angular/**',
      'frontend/node_modules/**',
      'frontend/dist/**',
      'frontend/coverage/**',
      'frontend/.cache/**',
      'frontend/vite/**',
      'frontend/deps/**',

      'backend/node_modules/**',
      'backend/dist/**',
      'backend/coverage/**',
      'backend/.cache/**',

      'package*.json',
      'project.json',
      'tsconfig*.json',
      '*.js',
    ],
  },
  tseslint.config({
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': 'off',
    },
  }),

  // Bloque HTML
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
]);
