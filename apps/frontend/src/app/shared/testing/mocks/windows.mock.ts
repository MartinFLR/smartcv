import { jest } from '@jest/globals';

export const windowMock = {
  matchMedia: jest.fn().mockReturnValue({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  localStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  document: {
    createElement: jest.fn().mockReturnValue({
      style: {},
      setAttribute: jest.fn(),
      getAttribute: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }),
    querySelectorAll: jest.fn().mockReturnValue([]),
    querySelector: jest.fn().mockReturnValue(null),
    getElementById: jest.fn().mockReturnValue(null),
    body: {
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      querySelector: jest.fn().mockReturnValue(null),
      querySelectorAll: jest.fn().mockReturnValue([]),
    },
    head: {
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      querySelector: jest.fn().mockReturnValue(null),
      querySelectorAll: jest.fn().mockReturnValue([]),
    },
  },
};
