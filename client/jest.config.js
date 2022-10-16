module.exports = {
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@/components(.*)$': '<rootDir>/components/$1',
    '^@/contexts(.*)$': '<rootDir>/contexts',
    '^@/constants(.*)$': '<rootDir>/constants',
    '^@/services(.*)$': '<rootDir>/services/$1',
    '^@/utils(.*)$': '<rootDir>/utils/$1',
    '^@/types(.*)$': '<rootDir>/types/$1',
    '^@/hooks(.*)$': '<rootDir>/hooks/$1',
    '^@/styles(.*)$': '<rootDir>/styles/$1',
    '^@/test(.*)$': '<rootDir>/test/$1',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};
