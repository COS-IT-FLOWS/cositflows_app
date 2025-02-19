// jest.setup.js
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('mocked,csv,data'), // Mocked CSV data
  })
);

global.URL.createObjectURL = jest.fn();
