module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<roodDir>/src/**/*.ts'],
  testEnvironment: 'node',
  transform: { '.+\\.ts$': 'ts-jest' }
}
