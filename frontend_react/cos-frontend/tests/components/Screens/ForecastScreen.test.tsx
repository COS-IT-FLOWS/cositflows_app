// ForecastScreen.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForecastScreen from '../../../src/components/Screens/ForecastScreen'; // Adjust the import based on your file structure
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the necessary components and functions
jest.mock('papaparse', () => ({
  parse: jest.fn((text, options) => {
    options.complete({ data: [] }); // Mock the CSV parsing
  }),
}));

describe('ForecastScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('renders without crashing', () => {
    render(
      <Router>
        <ForecastScreen />
      </Router>
    );
    expect(screen.getByText(/Welcome to Forecast/i)).toBeInTheDocument();
  });

//   it('displays the tutorial content initially', () => {
//     render(
//       <Router>
//         <ForecastScreen />
//       </Router>
//     );
//     expect(screen.getByText(/How it works/i)).toBeInTheDocument();
//     expect(screen.getByText(/Begin/i)).toBeInTheDocument();
//   });

//   it('hides the tutorial and shows the input fields when "Begin" is clicked', async () => {
//     render(
//       <Router>
//         <ForecastScreen />
//       </Router>
//     );

//     // Click the "Begin" button
//     fireEvent.click(screen.getByText(/Begin/i));

//     // Wait for the tutorial to be hidden and input fields to be displayed
//     await waitFor(() => {
//       expect(screen.queryByText(/How it works/i)).not.toBeInTheDocument();
//       expect(screen.getByLabelText(/Runoff for Dam 1/i)).toBeInTheDocument();
//     });
//   });

//   it('updates runoff values when input fields change', async () => {
//     render(
//       <Router>
//         <ForecastScreen />
//       </Router>
//     );

//     // Click the "Begin" button to show input fields
//     fireEvent.click(screen.getByText(/Begin/i));

//     // Change the runoff value for Dam 1
//     const runoffInput = screen.getByLabelText(/Runoff for Dam 1/i);
//     fireEvent.change(runoffInput, { target: { value: '150' } });

//     expect(runoffInput.value).toBe('150'); // Check if the value is updated
//   });

//   it('calls the simulation function when "Run Simulation" is clicked', async () => {
//     render(
//       <Router>
//         <ForecastScreen />
//       </Router>
//     );

//     // Click the "Begin" button to show input fields
//     fireEvent.click(screen.getByText(/Begin/i));

//     // Change the runoff value for Dam 1
//     const runoffInput = screen.getByLabelText(/Runoff for Dam 1/i);
//     fireEvent.change(runoffInput, { target: { value: '150' } });

//     // Click the "Run Simulation" button
//     fireEvent.click(screen.getByText(/Run Simulation/i));

//     // Check if the results overlay is displayed
//     await waitFor(() => {
//       expect(screen.getByText(/Results/i)).toBeInTheDocument();
//     });
//   });

//   it('closes the results overlay when the close button is clicked', async () => {
//     render(
//       <Router>
//         <ForecastScreen />
//       </Router>
//     );

//     // Click the "Begin" button to show input fields
//     fireEvent.click(screen.getByText(/Begin/i));

//     // Change the runoff value for Dam 1
//     const runoffInput = screen.getByLabelText(/Runoff for Dam 1/i);
//     fireEvent.change(runoffInput, { target: { value: '150' } });

//     // Click the "Run Simulation" button
//     fireEvent.click(screen.getByText(/Run Simulation/i));

//     // Check if the results overlay is displayed
//     await waitFor(() => {
//       expect(screen.getByText(/Results/i)).toBeInTheDocument();
//     });

//     // Click the close button
//     fireEvent.click(screen.getByRole('button', { name: /close/i }));

//     // Check if the results overlay is hidden
//     await waitFor(() => {
//       expect(screen.queryByText(/Results/i)).not.toBeInTheDocument();
//     });
//   });
});