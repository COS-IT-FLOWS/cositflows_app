// RiverAnalytics.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RiverAnalytics from '../../../src/components/AnalyticsWidgets/RiverWidgets'; // Adjust the import based on your file structure

// At the top of your test file or in a setup file
class ResizeObserverMock {
  private observers: Set<Element> = new Set();
  constructor(callback: ResizeObserverCallback) {
    // Store the callback if needed
  }
  observe(element: Element) {
    this.observers.add(element);
  }
  unobserve(element: Element) {
    this.observers.delete(element);
  }
  disconnect() {
    this.observers.clear();
  }
}

// Assign the mock to the global object
global.ResizeObserver = ResizeObserverMock;

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        Station_ID: 'CWCRV0002',
        Station_Name: 'Test Station',
        River: 'Chalakudy',
        'Warning_Level(m)': 5,
        'Danger_Level(m)': 10,
      },
    ]),
  })
) as jest.Mock;

// Mock the MonitoringMapComponent
jest.mock('../../../src/components/Maps/MonitoringMapComponent', () => {
  return function MockedMonitoringMapComponent() {
    return <div>Mocked Map Component</div>;
  };
});

describe('RiverAnalytics', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('renders without crashing', async () => {
    render(
    <RiverAnalytics />);
    expect(screen.getByText(/mocked map component/i)).toBeInTheDocument();
  });

  it('fetches and displays river station data', async () => {
    render(<RiverAnalytics />);
    
    // Wait for the station data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Test Station Levels in Chalakudy')).toBeInTheDocument();
    });
  });

  it('displays warning and danger levels', async () => {
    render(<RiverAnalytics />);
    
    // Wait for the station data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Warning Level')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Danger Level')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  it('displays no data available when there is no time series data', async () => {
    // Mock the fetch for time series data to return an empty array
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<RiverAnalytics />);

    // Wait for the station data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('No Data Available')).toBeInTheDocument();
    });
  });
});