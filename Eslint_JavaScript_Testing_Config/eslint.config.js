import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import vitest from 'eslint-plugin-vitest';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';

export default [
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  js.configs.recommended,
  vitest.configs.recommended,
  // ...testingLibrary.configs['flat/dom'],
  // testingLibrary.configs.recommended,
  // jestDom.configs['flat/recommended'],
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...vitest.environments.env.globals, ...globals.browser },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'plugin:testing-library/react': testingLibrary,
    },
    rules: {
      'no-unused-vars': 'off',
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

      'vitest/expect-expect': 'off',
    },
  },
];
