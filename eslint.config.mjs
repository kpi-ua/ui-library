import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

const nextRestriction = {
  patterns: [
    {
      group: ['next', 'next/*'],
      message:
        'Keep UI, hooks and lib framework-agnostic; Next imports belong in auth/next or fonts.',
    },
  ],
};

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    files: ['src/ui/**', 'src/hooks/**', 'src/lib/**', 'src/auth/server/**', 'src/auth/client/**'],
    rules: { 'no-restricted-imports': ['error', nextRestriction] },
  },
);
