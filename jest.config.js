module.exports = {
  roots: ['<rootDir>/tests'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<roodDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],
  testEnvironment: 'node',
  transform: { '.+\\.ts$': 'ts-jest' }
}
