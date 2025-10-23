export default {
  endOfLine: 'auto',
  printWidth: 100,
  requirePragma: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  quoteProps: 'as-needed',
  arrowParens: 'always',
  bracketSpacing: true,
  tabWidth: 2,
  overrides: [
    {
      excludeFiles: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/public/**',
        '**/*.d.ts',
        '**/deployment/**',
      ],
      files: '{**/*,*}.{css,scss,sass,less,js,jsx,ts,tsx,json,md,mdx}',
      options: { requirePragma: false },
      importOrder: [
        '^react$',
        '<THIRD_PARTY_MODULES>', // Любые сторонние библиотеки
        '',
        '^@/entities/(.*)$',
        '^@/shared/(.*)$',
        '',
        '^../',
        '^./',
      ],
      importOrderSeparation: true,
      importOrderSortSpecifiers: true,
    },
  ],
};
