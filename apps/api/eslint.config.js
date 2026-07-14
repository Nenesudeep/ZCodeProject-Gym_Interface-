import anchorConfig from '@anchor/config/eslint'

export default [
  ...anchorConfig,
  {
    // Nest uses experimental decorators + DI; relax the unused-expressions rule
    // that trips on decorator metadata.
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    ignores: ['dist/**', 'prisma/migrations/**'],
  },
]
