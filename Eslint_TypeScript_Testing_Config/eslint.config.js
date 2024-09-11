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
      testingLibrary['flat/recommended'],
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
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
      // 'plugin:testing-library/react': testingLibrary,
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
    },
  }
);
