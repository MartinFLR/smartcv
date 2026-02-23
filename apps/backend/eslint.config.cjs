const baseConfig = require('../../eslint.config.cjs');

module.exports = [
    ...baseConfig,
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/prefer-inject': 'off',
        },
    },
];
