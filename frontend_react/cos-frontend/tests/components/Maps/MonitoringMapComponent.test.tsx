import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MonitoringMapComponent } from '../../../src/components/Maps/MonitoringMapComponent';
import { useConfig } from '../../../src/ConfigContext';

// Mock the useConfig hook
jest.mock('../../../src/ConfigContext', () => ({
  useConfig: jest.fn(),
}));

// Mock the maplibregl and other dependencies
jest.mock('maplibre-gl', () => ({
  Map: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    remove: jest.fn(),
  })),
}));

describe('MonitoringMapComponent', () => {
  const mockConfig = {
    MAP_CONFIG: {
      LON: 77.5946,
      LAT: 12.9716,
      ZOOM: 10,
    },
    MAPTILER_API_KEY: 'mock-api-key',
    MAPS: {
      MONITORING: 'mock-map-style-url',
    },
  };

  beforeEach(() => {
    (useConfig as jest.Mock).mockReturnValue({ config: mockConfig });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the map container', () => {
    const visibleGauges = {
      PRECIPITATION: true,
      RESERVOIR: true,
      TIDAL: true,
      GROUNDWATER: true,
      RIVER: true,
      REGULATOR: true,
    };

    render(<MonitoringMapComponent visibleGauges={visibleGauges} />);

    const mapContainer = screen.getByRole('generic', { hidden: true });
    expect(mapContainer).toBeInTheDocument();
  });

  it('initializes the map with correct parameters', () => {
    const visibleGauges = {
      PRECIPITATION: true,
      RESERVOIR: true,
      TIDAL: true,
      GROUNDWATER: true,
      RIVER: true,
      REGULATOR: true,
    };

    render(<MonitoringMapComponent visibleGauges={visibleGauges} />);

    // Check if the map was initialized with the correct parameters
    expect(require('maplibre-gl').Map).toHaveBeenCalledWith({
      container: expect.anything(),
      style: mockConfig.MAPS.MONITORING,
      center: [mockConfig.MAP_CONFIG.LON, mockConfig.MAP_CONFIG.LAT],
      zoom: mockConfig.MAP_CONFIG.ZOOM,
    });
  });

  it('cleans up the map on unmount', () => {
    const visibleGauges = {
      PRECIPITATION: true,
      RESERVOIR: true,
      TIDAL: true,
      GROUNDWATER: true,
      RIVER: true,
      REGULATOR: true,
    };

    const { unmount } = render(<MonitoringMapComponent visibleGauges={visibleGauges} />);
    
    unmount();

    // Check if the map's remove method was called
    const mapInstance = require('maplibre-gl').Map.mock.instances[0];
    expect(mapInstance.remove).toHaveBeenCalled();
  });
});