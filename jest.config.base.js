module.exports = {
  maxWorkers: '25%',
  //   roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testRegex: '^.+\\.spec\\.ts$',
  collectCoverageFrom: [
    'src/**/*',
    '!src/**/index.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  verbose: true,
};
