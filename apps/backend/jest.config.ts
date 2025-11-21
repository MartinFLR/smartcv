// apps/backend/jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  displayName: 'backend',
  // Extiende el preset global del monorepo
  preset: '../../jest.preset.js',

  // CRÍTICO: Especifica el entorno Node.js para Express
  testEnvironment: 'node',

  rootDir: '.',

  // Directorios a ignorar
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],

  // Cómo transformar archivos (usa ts-jest y apunta a tsconfig.spec.json)
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },

  moduleNameMapper: {
    '^@smartcv/types$': '<rootDir>/../../libs/types/src/index.ts',
    '^@smartcv/shared$': '<rootDir>/../../libs/shared/src/index.ts',
  },

  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[tj]s'],
  coverageDirectory: '../../coverage/apps/backend',
};

export default config;
