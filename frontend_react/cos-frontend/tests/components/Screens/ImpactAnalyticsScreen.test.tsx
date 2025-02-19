// ImpactAnalytics.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImpactAnalytics from '../../../src/components/Screens/ImpactAnalyticsScreen'; // Adjust the import based on your file structure
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]), // Mock the JSON response
  })
) as jest.Mock;

describe('ImpactAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('renders without crashing', () => {
    render(
      <Router>
        <ImpactAnalytics />
      </Router>
    );
    expect(screen.getByText(/District/i)).toBeInTheDocument(); // Check for the presence of the District label
  });

  it('displays the correct initial selected panchayat', async () => {
    render(
      <Router>
        <ImpactAnalytics />
      </Router>
    );

    // Wait for the fetch to complete and the component to update
    await waitFor(() => {
      expect(screen.getByText(/Puthenvelikkara/i)).toBeInTheDocument(); // Check for the initial selected panchayat
    });
  });

  it('updates the selected panchayat when a new one is selected', async () => {
    render(
      <Router>
        <ImpactAnalytics />
      </Router>
    );

    // Wait for the fetch to complete and the component to update
    await waitFor(() => {
      expect(screen.getByText(/Puthenvelikkara/i)).toBeInTheDocument(); // Check for the initial selected panchayat
    });

    // Simulate changing the selected panchayat
    const select = screen.getByRole('button'); // Get the Select component
    fireEvent.mouseDown(select); // Open the dropdown

    // Select a new panchayat (assuming there is another panchayat in the mocked data)
    fireEvent.click(screen.getByText(/Another Panchayat/i)); // Replace with an actual panchayat name from your data

    // Check if the selected panchayat has been updated
    expect(screen.getByText(/Another Panchayat/i)).toBeInTheDocument(); // Check for the new selected panchayat
  });

  it('displays the correct chart data when a panchayat is selected', async () => {
    render(
      <Router>
        <ImpactAnalytics />
      </Router>
    );

    // Wait for the fetch to complete and the component to update
    await waitFor(() => {
      expect(screen.getByText(/Puthenvelikkara/i)).toBeInTheDocument(); // Check for the initial selected panchayat
    });

    // Simulate changing the selected panchayat
    const select = screen.getByRole('button'); // Get the Select component
    fireEvent.mouseDown(select); // Open the dropdown

    // Select a new panchayat (assuming there is another panchayat in the mocked data)
    fireEvent.click(screen.getByText(/Another Panchayat/i)); // Replace with an actual panchayat name from your data

    // Check if the chart data updates accordingly
    await waitFor(() => {
      expect(screen.getByText(/Population Impact/i)).toBeInTheDocument(); // Check for the chart title
      // Add more assertions to check if the chart data is displayed correctly
    });
  });
});