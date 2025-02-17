import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RainfallAnalytics from '../../../src/components/AnalyticsWidgets/RainfallWidgets';
import Papa from 'papaparse';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(`Name,01/01/22,01/02/22,01/03/22
    Gauge1,10,20,30
    Gauge2,15,25,35`),
  })
);

describe('RainfallAnalytics Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<RainfallAnalytics />);
    expect(screen.getByText(/Today's Rainfall/i)).toBeInTheDocument();
  });

  test('fetches and displays rainfall data', async () => {
    render(<RainfallAnalytics />);

    // Wait for the data to be processed and rendered
    await waitFor(() => {
      expect(screen.getByText(/Gauge1/i)).toBeInTheDocument();
      expect(screen.getByText(/Gauge2/i)).toBeInTheDocument();
    });

    // Check if the maximum rainfall is displayed correctly
    expect(screen.getByText(/30 mm/i)).toBeInTheDocument();
    expect(screen.getByText(/35 mm/i)).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    // Mock fetch to reject
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<RainfallAnalytics />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to load rainfall data/i)).toBeInTheDocument();
    });
  });

  test('displays loading state while fetching data', () => {
    render(<RainfallAnalytics />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Assuming you implement a loading state
  });
});