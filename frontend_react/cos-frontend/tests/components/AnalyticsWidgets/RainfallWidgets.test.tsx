// RainfallAnalytics.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RainfallAnalytics from '../../../src/components/AnalyticsWidgets/RainfallWidgets';
import { ConfigProvider } from '../../../src/ConfigContext';


// Mock maplibre-gl
jest.mock('maplibre-gl', () => {
  return {
    Map: jest.fn().mockImplementation(() => {
      return {
        on: jest.fn(),
        setCenter: jest.fn(),
        setZoom: jest.fn(),
        remove: jest.fn(),
      };
    }),
  };
});

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

// // Mock the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     text: () => Promise.resolve(`Sl no,Name,Whatsapp name,Phone number,Place,lattitude,longitude,Panchayath,District,Basin,New gauge deployed on,Station ID,10/10/24,11/10/24,12/10/24,
// 1,Gauge 1,Address 1,w-gauge-1,9999999999,place-1,10.0,70,0,,,,XXXX0001,23,42,13,
// 2,Gauge 2,Address 2,w-gauge-2,8888888888,place-2,20.0,80.0,,,,XXXX0002,9,35,24`),
//   })
// ) as jest.Mock;


// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve(`Sl no,Name,Whatsapp name,Phone number,Place,lattitude,longitude,Panchayath,District,Basin,New gauge deployed on,Station ID,10/10/24,11/10/24,12/10/24,
1,Gauge 1,Address 1,w-gauge-1,9999999999,place-1,10.0,70,0,,,,XXXX0001,23,42,13,
2,Gauge 2,Address 2,w-gauge-2,8888888888,place-2,20.0,80.0,,,,XXXX0002,9,35,24`),
  })
) as jest.Mock;




describe('RainfallAnalytics', () => {

  beforeEach(() => {
    render(
      <ConfigProvider>
        <RainfallAnalytics />
      </ConfigProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('renders the component without crashing', () => {
  //   expect(screen.getByText("Today's Rainfall")).toBeInTheDocument();
  //   expect(screen.getByText("Today's Max Rainfall")).toBeInTheDocument();
  //   expect(screen.getByText("Today's Avg Rainfall")).toBeInTheDocument();
  //   expect(screen.getByText("No. of Gauges")).toBeInTheDocument();
    

  // });

  it('fetches and displays rainfall data', async () => {
    await waitFor(() => {
      expect(screen.getByText("24")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

//   it('displays the correct maximum rainfall', async () => {
//     await waitFor(() => {
//       expect(screen.getByText("30 mm")).toBeInTheDocument(); // Max rainfall from Gauge1
//     });
//   });

//   it('displays the correct average rainfall', async () => {
//     await waitFor(() => {
//       expect(screen.getByText("25.00 mm")).toBeInTheDocument(); // Average of Gauge1 and Gauge2
//     });
//   });

//   it('displays the cumulative rainfall chart', async () => {
//     await waitFor(() => {
//       expect(screen.getByText("Cumulative Rainfall in Basin")).toBeInTheDocument();
//     });
//   });

//   it('displays the basin highlights', async () => {
//     await waitFor(() => {
//       expect(screen.getByText("Basin Average")).toBeInTheDocument();
//       expect(screen.getByText("Extreme Rainy Days")).toBeInTheDocument();
//       expect(screen.getByText("Season Maximum")).toBeInTheDocument();
//     });
//   });
});