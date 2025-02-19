module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.(js|jsx)$': 'babel-jest', // Use ts-jest for TypeScript files
  },
  collectCoverage: false,
  collectCoverageFrom : ["src/**/*.tsx"],
  coveragePathIgnorePatterns: ["src/components/Screens/ForecastScreen.tsx"],
  coverageReporters: ["text", "cobertura", "html", "json", "lcov"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // ... other configurations ...
  setupFilesAfterEnv: [
    './setupTests.ts',
    "@testing-library/jest-dom"
  ],
  setupFiles: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
     '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  }
};
