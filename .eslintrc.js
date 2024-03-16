module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['unused-imports'],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@apps/**',
            group: 'internal',
            position: 'before',
          },
        ],
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
  },
};
