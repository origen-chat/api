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
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  globalSetup: '<rootDir>/src/testHelpers/globalSetup.js',
  globalTeardown: '<rootDir>/src/testHelpers/globalTeardown.js',
  setupTestFrameworkScriptFile:
    '<rootDir>/src/testHelpers/setupTestFramework.js',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
