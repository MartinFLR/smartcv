export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.includes('dependabot[bot]')],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'require-full-header': [2, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'config',
        'ai',
        'wip',
        'release',
        'deps',
        'infra',
        'security',
        'ux',
        'ui'
      ]
    ],
  },
  plugins: [
    {
      rules: {
        'require-full-header': (parsed) => {
          const { type, subject } = parsed;
          const errors = [];

          if (!type) {
            errors.push(
              'You must specify a valid commit type. Accepted types are:\n' +
              'feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert, config, wip, release, deps, ai, infra, security, ux, ui'
            );
          }

          if (!subject) {
            errors.push('You must provide a subject describing what was changed');
          }

          if (errors.length > 0) {
            errors.push('\nExample of a valid commit:\nfeat: add login with token');
            return [false, errors.join('\n')];
          }

          return [true, ''];
        }
      }
    }
  ]
};
