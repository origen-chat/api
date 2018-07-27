module.exports = {
  testEnvironment: 'jsdom',
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
  setupTestFrameworkScriptFile: './src/jest.setup.ts',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.(jsx?|tsx?)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpe?g|png)$': '<rootDir>/__mocks__/fileMock.ts',
  },
};
