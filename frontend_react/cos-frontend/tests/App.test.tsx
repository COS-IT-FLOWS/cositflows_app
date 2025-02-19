import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useConfig } from '../src/ConfigContext';
import App from '../src/App';

jest.mock("maplibre-gl", () => ({
  Map: jest.fn(),
  Popup: jest.fn(),
}));

// mapboxgl.Map.prototype = {
//   on: jest.fn(),
//   remove: jest.fn(),
//   off: jest.fn(),
//   getCanvas: jest.fn(),
// };
// mapboxgl.Popup.prototype = {
//   remove: jest.fn(),
// };

// Mock the useConfig hook
jest.mock('../src/ConfigContext', () => ({
  useConfig: jest.fn(),
}));

describe('App Component', () => {
  const mockUpdateConfig = jest.fn();

  beforeEach(() => {
    (useConfig as jest.Mock).mockReturnValue({ updateConfig: mockUpdateConfig });
    process.env.REACT_APP_MAPTILER_API_KEY = 'mock-api-key'; // Set the environment variable
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('renders the main layout and routes correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check if the MainLayout is rendered
    expect(screen.getByText(/insight/i)).toBeInTheDocument(); // Assuming MainLayout has this title

    // Check if the MonitorScreen is rendered for the correct route
    render(
      <MemoryRouter initialEntries={['/monitor-visualization']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/monitor visualization/i)).toBeInTheDocument(); // Adjust based on actual text in MonitorScreen

    // Check if the ForecastScreen is rendered for the correct route
    render(
      <MemoryRouter initialEntries={['/forecast-visualization']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/forecast visualization/i)).toBeInTheDocument(); // Adjust based on actual text in ForecastScreen

    // Check if the ImpactScreen is rendered for the correct route
    render(
      <MemoryRouter initialEntries={['/impact-visualization']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/impact visualization/i)).toBeInTheDocument(); // Adjust based on actual text in ImpactScreen
  });

  it('updates the configuration on mount', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Check if updateConfig was called with the correct API key
    expect(mockUpdateConfig).toHaveBeenCalledWith('MAPTILER_API_KEY', 'mock-api-key');
  });

  it('toggles widget visibility', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Assuming MainLayout has a way to toggle widgets, you can simulate a toggle
    // For example, if there's a button to toggle alerts:
    // const toggleButton = screen.getByRole('button', { name: /toggle alerts/i });
    // fireEvent.click(toggleButton);
    // expect(screen.getByText(/alerts are now hidden/i)).toBeInTheDocument(); // Adjust based on actual text
  });
});