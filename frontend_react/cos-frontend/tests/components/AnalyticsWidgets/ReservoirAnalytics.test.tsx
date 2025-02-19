import React, { ReactNode } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ReservoirAnalytics from '../../../src/components/AnalyticsWidgets/ReservoirAnalytics';
import '@testing-library/jest-dom';

// Mock the fetch function
global.fetch = jest.fn();

// Mock recharts components with proper types
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  BarChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  LineChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Bar: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Line: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  XAxis: () => null,
  YAxis: () => null,
  Cell: ({ onClick }: { onClick?: () => void }) => <div onClick={onClick}>Cell</div>,
}));

// Mock the MonitoringMapComponent
jest.mock('../../../src/components/Maps/MonitoringMapComponent', () => {
  return function MockedMonitoringMapComponent() {
    return <div>Mocked Map Component</div>;
  };
});

const mockReservoirData = [
  {
    Station_ID: "RSVR4717",
    Station: "Test Dam 1",
    River_Basin: "Chalakudy",
    FRL: 100.5,
    Spillway: 95.0,
    MWL: 102.0,
    MDDL: 80.0
  },
  {
    Station_ID: "RSVR5143",
    Station: "Test Dam 2",
    River_Basin: "Chalakudy",
    FRL: 110.5,
    Spillway: 105.0,
    MWL: 112.0,
    MDDL: 90.0
  }
];

const mockTimeSeriesData = [
  {
    timestamp: "2024-02-19",
    Level: 95.5,
    Storage_Percent: 75
  },
  {
    timestamp: "2024-02-20",
    Level: 96.0,
    Storage_Percent: 78
  }
];

describe('ReservoirAnalytics', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock the fetch calls
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/Reservoir.json') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockReservoirData)
        });
      } else if (url.includes('RSVRTimeSeries')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTimeSeriesData)
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('renders without crashing', async () => {
    render(<ReservoirAnalytics />);
    await waitFor(() => {
      expect(screen.getByText("Today's Reservoir Levels")).toBeInTheDocument();
    });
  });

  it('loads and displays reservoir data', async () => {
    render(<ReservoirAnalytics />);
    
    await waitFor(() => {
      expect(screen.getByText('Reservoir Data in Basin Today')).toBeInTheDocument();
    });
    
    expect(global.fetch).toHaveBeenCalledWith('/Reservoir.json');
  });

  it('displays correct number of reservoirs', async () => {
    render(<ReservoirAnalytics />);
    
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('updates selected reservoir when clicking on bar', async () => {
    render(<ReservoirAnalytics />);
    
    await waitFor(() => {
      const cells = screen.getAllByText('Cell');
      fireEvent.click(cells[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Dam 1')).toBeInTheDocument();
    });
  });

  it('displays reservoir details when selected', async () => {
    render(<ReservoirAnalytics />);
    
    await waitFor(() => {
      const cells = screen.getAllByText('Cell');
      fireEvent.click(cells[0]);
    });

    await waitFor(() => {
      expect(screen.getByText('100.5')).toBeInTheDocument(); // FRL
      expect(screen.getByText('80.0')).toBeInTheDocument(); // MDDL
      expect(screen.getByText('102.0')).toBeInTheDocument(); // MWL
    });
  });

  it('handles fetch errors gracefully', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.reject(new Error('Failed to fetch'))
    );

    render(<ReservoirAnalytics />);
    
    await waitFor(() => {
      expect(screen.getByText('Reservoir Data in Basin Today')).toBeInTheDocument();
    });
  });

  it('displays no data message when time series data is empty', async () => {
    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/Reservoir.json') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockReservoirData)
        });
      } else if (url.includes('RSVRTimeSeries')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        });
      }
      return Promise.reject(new Error('Not found'));
    });

    render(<ReservoirAnalytics />);
    
    await waitFor(() => {
      expect(screen.getAllByText('No data available for the selected reservoir.')).toHaveLength(2);
    });
  });
});