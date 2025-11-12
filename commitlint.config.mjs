export default {
  extends: ['@commitlint/config-conventional'],
  ignores: [(commit) => commit.includes('dependabot[bot]')],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'require-full-header': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'require-full-header': (parsed) => {
          const { type, subject } = parsed;
          const errors = [];

          if (!type) {
            errors.push('You must specify the commit type (feat, fix, docs, chore, etc.)');
          }
          if (!subject) {
            errors.push('You must provide a subject describing what was changed');
          }

          if (errors.length > 0) {
            errors.push('\nExample of a valid commit:\nfeat(auth): add login with token');
            return [false, errors.join('\n')];
          }

          return [true, ''];
        }
      }
    }
  ]
};
