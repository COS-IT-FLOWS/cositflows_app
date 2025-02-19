// setupTests.ts
import '@testing-library/jest-dom';

beforeAll(() => {
// Mock the URL.createObjectURL method
window.URL.createObjectURL = jest.fn();
});