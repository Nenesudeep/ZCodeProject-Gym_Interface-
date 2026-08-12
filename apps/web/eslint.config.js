import anchorConfig from '@anchor/config/eslint'

export default [
  ...anchorConfig,
  {
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/build/**',
      '**/.cache/**',
    ],
  },
]
