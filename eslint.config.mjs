import pluginJs from '@eslint/js';
import playwrightPlugin from 'eslint-plugin-playwright';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ...playwrightPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: {
        process: true,
      },
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  // Add Prettier configuration to disable conflicting ESLint rules
  {
    ...prettierConfig,
  },
];
