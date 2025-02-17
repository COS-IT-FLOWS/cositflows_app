import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonitorScreen from '../../../src/components/Screens/MonitorScreen'; // Adjust the import based on your file structure

describe('MonitorScreen', () => {
  const mockOnWidgetToggle = jest.fn();
  const defaultProps = {
    visibleWidgets: {
      alerts: true,
      layers: true,
      legend: true,
    },
    onWidgetToggle: mockOnWidgetToggle,
  };

  beforeEach(() => {
    render(<MonitorScreen {...defaultProps} />);
  });

  test('renders the Map component', () => {
    const mapElement = screen.getByRole('img'); // Assuming Map component has an img or similar role
    expect(mapElement).toBeInTheDocument();
  });

  test('renders LayerComponent when layers widget is visible', () => {
    const layerComponent = screen.getByText(/layer component text/i); // Replace with actual text in LayerComponent
    expect(layerComponent).toBeInTheDocument();
  });

  test('renders AlertWidgetComponent when alerts widget is visible', () => {
    const alertComponent = screen.getByText(/alert widget text/i); // Replace with actual text in AlertWidgetComponent
    expect(alertComponent).toBeInTheDocument();
  });

  test('renders Legend component when at least one gauge is visible', () => {
    const legendComponent = screen.getByText(/legend component text/i); // Replace with actual text in Legend
    expect(legendComponent).toBeInTheDocument();
  });

  test('toggles gauge visibility', () => {
    const toggleButton = screen.getByRole('button', { name: /toggle rainfall/i }); // Replace with actual button text
    fireEvent.click(toggleButton);

    expect(mockOnWidgetToggle).toHaveBeenCalledWith('layers', false);
  });

  test('does not render Legend component if no gauges are visible', () => {
    // Update props to simulate no gauges visible
    const updatedProps = {
      ...defaultProps,
      visibleWidgets: {
        alerts: true,
        layers: true,
        legend: false,
      },
    };

    render(<MonitorScreen {...updatedProps} />);
    
    const legendComponent = screen.queryByText(/legend component text/i); // Replace with actual text in Legend
    expect(legendComponent).not.toBeInTheDocument();
  });
});