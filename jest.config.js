module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<roodDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],
  testEnvironment: 'node',
  transform: { '.+\\.ts$': 'ts-jest' }
}
