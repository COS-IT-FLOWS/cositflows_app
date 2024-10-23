import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayersComponent from '../../../src/components/LayerWidget/LayersComponent'; // Adjust the import based on your file structure

describe('LayersComponent', () => {
  const defaultProps = {
    visibleGauges: {
      rainfall: true,
      reservoir: false,
      tidal: false,
      groundwater: false,
      riverWater: false,
      regulators: false,
    },
    toggleGauge: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    render(<LayersComponent {...defaultProps} />);
  });

  test('renders the component with the correct initial state', () => {
    expect(screen.getByText('Layers')).toBeInTheDocument();
    expect(screen.getByText('Rainfall gauges')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /Rainfall gauges/i })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: /Reservoir\/Dam level/i })).not.toBeChecked();
  });

  test('calls toggleGauge when a checkbox is clicked', () => {
    const rainfallCheckbox = screen.getByRole('checkbox', { name: /Rainfall gauges/i });
    fireEvent.click(rainfallCheckbox);
    expect(defaultProps.toggleGauge).toHaveBeenCalledWith('rainfall');

    const reservoirCheckbox = screen.getByRole('checkbox', { name: /Reservoir\/Dam level/i });
    fireEvent.click(reservoirCheckbox);
    expect(defaultProps.toggleGauge).toHaveBeenCalledWith('reservoir');
  });

  test('collapses and expands the component when icons are clicked', () => {
    const minimizeButton = screen.getByTestId('MinimizeIcon');
    fireEvent.click(minimizeButton); // Collapse the component

    expect(screen.queryByText('Rainfall gauges')).not.toBeInTheDocument(); // Check if gauges are hidden
    const addButton = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(addButton); // Expand the component again

    expect(screen.getByText('Rainfall gauges')).toBeInTheDocument(); // Check if gauges are visible
  });

  test('displays the correct tab content when tabs are clicked', () => {
    const manualTab = screen.getByText('Manual');
    const realTimeTab = screen.getByText('Real time');

    // Check if Manual tab content is displayed initially
    expect(screen.getByText('IMD Grid Data')).toBeInTheDocument();
    expect(screen.getByText('Satellite Data')).toBeInTheDocument();

    // Click on Real Time tab
    fireEvent.click(realTimeTab);

    // Check if Real Time tab content is displayed
    expect(screen.getByText('Satellite Data')).toBeInTheDocument();
    expect(screen.queryByText('IMD Grid Data')).not.toBeInTheDocument(); // Ensure Manual content is hidden
  });

  test('calls onClose when the close icon is clicked', () => {
    const closeButton = screen.getByTestId('CloseIcon');
    fireEvent.click(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});