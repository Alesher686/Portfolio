import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
        node: {
          paths: ['src'],
          extensions: ['.js', '.ts', '.jsx', '.tsx'],
        },
      },
    },
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-arrow-callback': 'error',
      'no-alert': 'error',
      'no-plusplus': 'error',
      'max-depth': ['error', 4],
      'prefer-template': 'error',
      camelcase: ['error', { properties: 'always' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
        { selector: 'typeParameter', format: ['PascalCase'], prefix: ['T'] },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      'no-nested-ternary': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'keyword-spacing': ['error', { before: true, after: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'no-restricted-globals': ['error', 'event'],
      'react/style-prop-object': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: ['react-router-dom'],
        },
      ],
      'import/order': [
        'error', // Уровень ошибки
        {
          groups: ['builtin', ['external', 'internal'], ['sibling', 'parent'], 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@mui/material',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/*',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always', // разделение импортов пустыми строками
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
)
