import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ReservoirAnalytics from '../../../src/components/AnalyticsWidgets/ReservoirAnalytics'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

// Mocking the fetch function
global.fetch = jest.fn() as jest.Mock;

describe('ReservoirAnalytics', () => {
  beforeEach(() => {
    // Clear all instances and calls to the mock function
    (fetch as jest.Mock).mockClear();
  });

  test('renders loading state initially', () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    }));

    render(<ReservoirAnalytics />);
    
    // Check for loading indicators or initial state
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Adjust based on your loading state
  });

  test('renders reservoir levels after data is fetched', async () => {
    // Mocking the reservoir data response
    const mockReservoirData = [
      {
        Station_ID: 'RSVR4717',
        Station: 'Reservoir 1',
        River_Basin: 'Chalakudy',
        FRL: 10,
        Spillway: 12,
        MWL: 15,
        MDDL: 8,
      },
    ];

    // Mocking the time series data response
    const mockTimeSeriesData = [
      { timestamp: '2023-10-01T00:00:00Z', Level: 5 },
      { timestamp: '2023-10-02T00:00:00Z', Level: 6 },
    ];

    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockReservoirData),
    }));

    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTimeSeriesData),
    }));

    render(<ReservoirAnalytics />);

    // Wait for the data to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Reservoir 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Today's Reservoir Levels/i)).toBeInTheDocument();
    });
  });

  test('handles error when fetching reservoir data', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));

    render(<ReservoirAnalytics />);

    // Wait for the error handling to be rendered
    await waitFor(() => {
      expect(screen.getByText(/error fetching reservoir data/i)).toBeInTheDocument(); // Adjust based on your error handling
    });
  });

  test('renders no data available message for selected reservoir', async () => {
    const mockReservoirData = [
      {
        Station_ID: 'RSVR4717',
        Station: 'Reservoir 1',
        River_Basin: 'Chalakudy',
        FRL: 10,
        Spillway: 12,
        MWL: 15,
        MDDL: 8,
      },
    ];

    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockReservoirData),
    }));

    (fetch as jest.Mock).mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // No time series data
    }));

    render(<ReservoirAnalytics />);

    // Wait for the data to be rendered
    await waitFor(() => {
      expect(screen.getByText(/No data available for the selected reservoir/i)).toBeInTheDocument();
    });
  });
});