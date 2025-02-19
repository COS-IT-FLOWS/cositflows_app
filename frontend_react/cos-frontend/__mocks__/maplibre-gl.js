// __mocks__/maplibre-gl.js
jest.mock('maplibre-gl', () => ({
    Map: jest.fn(() => ({
      on: jest.fn(),
      remove: jest.fn(),
      loadImage: jest.fn(),
      addSource: jest.fn(),
      addLayer: jest.fn(),
      getCanvas: jest.fn(() => ({
        style: {}
      })),
      setStyle: jest.fn()
    })),
    NavigationControl: jest.fn(),
    Marker: jest.fn(() => ({
      setLngLat: jest.fn().mockReturnThis(),
      addTo: jest.fn().mockReturnThis(),
      remove: jest.fn()
    }))
  }));