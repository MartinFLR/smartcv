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
};
