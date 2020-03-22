module.exports = {
  extends: ['@cenk1cenk2/eslint-config/react-typescript'],
  rules: {
    'indent': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@src/**',
            group: 'index'
          },
          {
            pattern: '@components/**',
            group: 'index'
          },
          {
            pattern: '@hooks/**',
            group: 'index'
          },
          {
            pattern: '@interfaces/**',
            group: 'index'
          },
          {
            pattern: '@context/**',
            group: 'index'
          },
          {
            pattern: '@pages/**',
            group: 'index'
          },
          {
            pattern: '@themes/**',
            group: 'index'
          },
          {
            pattern: '@templates/**',
            group: 'index'
          },
          {
            pattern: '@page-templates/**',
            group: 'index'
          },
          {
            pattern: '@utils/**',
            group: 'index'
          }
        ],
        pathGroupsExcludedImportTypes: [
          'builtin'
        ],
        groups: [
          [
            'builtin',
            'external'
          ],
          [
            'index',
            'parent',
            'sibling'
          ]
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}