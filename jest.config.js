module.exports = {
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  globalSetup: '<rootDir>/src/testHelpers/globalSetup.ts',
  setupFilesAfterEnv: ['<rootDir>/src/testHelpers/setupTestFramework.ts'],
  modulePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  errorOnDeprecated: true,
};
