export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'require‑full‑header': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'require‑full‑header': (parsed) => {
          const { type, scope, subject } = parsed;
          if (!type) {
            return [false, '❌ Debes definir el tipo del commit (feat, fix, docs, chore…)'];
          }
          if (!scope) {
            return [false, '❌ Debes definir el scope del commit (módulo o área afectada)'];
          }
          if (!subject) {
            return [false, '❌ Debes escribir un asunto que explique qué se hizo'];
          }
          return [true, ''];
        }
      }
    }
  ]
};
