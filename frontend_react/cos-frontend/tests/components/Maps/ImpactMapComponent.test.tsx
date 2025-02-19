// ImpactMapComponent.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ImpactMapComponent from '../../../src/components/Maps/ImpactMapComponent'; // Adjust the import based on your file structure
import { ConfigProvider } from '../../../src/ConfigContext'; // Adjust the import based on your file structure

// Mock the maplibregl library
jest.mock('maplibre-gl', () => {
  return {
    Map: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      remove: jest.fn(),
    })),
  };
});

// Mock the useConfig hook
jest.mock('../../../src/ConfigContext', () => ({
  useConfig: jest.fn(),
}));

describe('ImpactMapComponent', () => {
  const mockConfig = {
    MAP_CONFIG: {
      LON: 76.2673,
      LAT: 10.0000,
      ZOOM: 15,
    },
    MAPTILER_API_KEY: 'mock-api-key',
    MAPS: {
      IMPACT: 'https://mock.mapstyle.url',
    },
    LAYERS: {
      BOUNDARY: {
        flood: 'flood-inundation',
        population: 'population',
        households: 'households',
        agriculture: 'agriculture',
      },
    },
  };

  beforeEach(() => {
    (require('../../../src/ConfigContext').useConfig as jest.Mock).mockReturnValue({ config: mockConfig });
  });

  it('renders without crashing', () => {
    render(<ImpactMapComponent selectedMap='population' />);
    expect(screen.getByText(/map/i)).toBeInTheDocument(); // Check if the map container is rendered
  });

  it('initializes the map correctly', async () => {
    render(<ImpactMapComponent selectedMap='population' />);
    
    // Wait for the map to be initialized
    await waitFor(() => {
      expect(require('maplibre-gl').Map).toHaveBeenCalledTimes(1); // Check if the Map constructor was called
    });
  });

  it('adds boundary layers on map load', async () => {
    const { addBoundaryLayerLocal } = require('../../layers/PolygonLayer');
    const mockAddBoundaryLayerLocal = jest.spyOn(addBoundaryLayerLocal, 'mockImplementation');

    render(<ImpactMapComponent selectedMap='population'/>);

    // Wait for the map to load and check if the boundary layer is added
    await waitFor(() => {
      expect(mockAddBoundaryLayerLocal).toHaveBeenCalled(); // Check if the boundary layer was added
    });
  });

  it('removes the map on unmount', () => {
    const { unmount } = render(<ImpactMapComponent selectedMap='population' />);
    unmount();
    
    // Check if the remove method was called on the map instance
    expect(require('maplibre-gl').Map.prototype.remove).toHaveBeenCalled();
  });
});