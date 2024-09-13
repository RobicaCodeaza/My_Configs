import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import vitest from 'eslint-plugin-vitest';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default tseslint.config(
  { ignores: ['dist', 'build'] },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      vitest.configs.recommended,
      jestDom.configs['flat/recommended'],
      // testingLibraryReact.configs['flat/react'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      globals: { ...vitest.environments.env.globals, ...globals.browser },
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    }, // What version of react we use to be available to the eslint-plugin-react

    plugins: {
      'testing-library': testingLibrary,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      // 'plugin:vitest': vitest,
      // 'plugin:jest-dom/recommended': jestDom,
    },
    rules: {
      //-----------------------------------------
      //React Hooks Rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      //-----------------------------------------

      //-----------------------------------------
      // React Plugin Rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-target-blank': 'off',
      //-----------------------------------------

      //-----------------------------------------
      //TypeScript Rules
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      //-----------------------------------------

      //-----------------------------------------
      //Vitest Rules
      'vitest/expect-expect': 'off',
      //-----------------------------------------

      //-----------------------------------------
      //testingLibraryReact Rules

      'testing-library/await-async-events': [
        'error',
        { eventModule: 'userEvent' },
      ],
      'testing-library/await-async-queries': 'error',
      'testing-library/await-async-utils': 'error',
      'testing-library/no-dom-import': ['error', 'react'],
      'testing-library/no-global-regexp-flag-in-query': 'error',
      'testing-library/no-manual-cleanup': 'error',
      'testing-library/no-node-access': 'error',
      'testing-library/no-promise-in-fire-event': 'error',
      'testing-library/no-unnecessary-act': 'error',
      'testing-library/no-wait-for-multiple-assertions': 'error',
      'testing-library/no-wait-for-side-effects': 'error',
      'testing-library/no-wait-for-snapshot': 'error',
      'testing-library/prefer-find-by': 'error',
      'testing-library/prefer-presence-queries': 'error',
      'testing-library/prefer-query-by-disappearance': 'error',
      //-----------------------------------------
    },
  }
);
