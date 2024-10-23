module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.jsx?$': 'babel-jest', // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // ... other configurations ...
  setupFilesAfterEnv: ['./setupTests.ts'],
    // ... other configurations ...
  };