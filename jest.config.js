module.exports = {
  roots: ['<rootDir>/src'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<roodDir>/src/**/*.ts'],
  testEnvironment: 'node',
  transforms: { '.+\\.ts$': 'ts-jest' }
}
