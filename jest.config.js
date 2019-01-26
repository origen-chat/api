module.exports = {
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coveragePathIgnorePatterns: ['node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  globalSetup: '<rootDir>/src/testHelpers/globalSetup.ts',
  globalTeardown: '<rootDir>/src/testHelpers/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/testHelpers/setupTestFramework.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/', 'node_modules'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
