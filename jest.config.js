module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['/__fixtures__/'],
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['/dist/', '/typings/'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}
