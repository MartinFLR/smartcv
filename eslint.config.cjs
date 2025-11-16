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
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.cache/**',
      '**/.angular/**',

      // Nx generated project configs (OK ignorarlos)
      'project.json',

      // Build artifacts
      'frontend/vite/**',
      'frontend/deps/**',

      // No ignores peligrosos ↓↓↓
      // ❌ '*.js' --> rompe porque eslint usa archivos JS de config internamente
      // ❌ '*.json' --> eslint NECESITA leer tsconfig.json
      // ❌ 'tsconfig*.json' --> rompe el parser de TS
      // ❌ 'package.json' --> eslint usa config y scripts
      // ❌ 'package-lock.json' --> warning innecesario

      // Si querés ignorar package-lock específicamente:
      'package-lock.json',
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
