export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'require-full-header': [2, 'always'] // nota: guiones normales
  },
  plugins: [
    {
      rules: {
        'require-full-header': (parsed) => {
          const { type, scope, subject } = parsed;
          const errors = [];

          if (!type) {
            errors.push('❌ Debes definir el tipo del commit (feat, fix, docs, chore…)');
          }
          if (!scope) {
            errors.push('❌ Debes definir el scope del commit (módulo o área afectada)');
          }
          if (!subject) {
            errors.push('❌ Debes escribir un asunto que explique qué se hizo');
          }

          if (errors.length > 0) {
            errors.push('\nEjemplo de commit válido:\nfeat(auth): agregar login con token');
            return [false, errors.join('\n')];
          }

          return [true, ''];
        }
      }
    }
  ]
};
