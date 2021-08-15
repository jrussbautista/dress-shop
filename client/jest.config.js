module.exports = {
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '@/components(.*)$': '<rootDir>/components/$1',
    '@/contexts(.*)$': '<rootDir>/contexts/$1',
    '@/services(.*)$': '<rootDir>/services/$1',
    '@/utils(.*)$': '<rootDir>/utils/$1',
    '@/types(.*)$': '<rootDir>/types/$1',
    '@/hooks(.*)$': '<rootDir>/hooks/$1',
    '@/styles(.*)$': '<rootDir>/styles/$1',
    '@/test(.*)$': '<rootDir>/test/$1',
  },
  testEnvironment: 'jsdom',
};
