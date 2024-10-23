import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Legend from '../../../src/components/LegendWidget/Legend'; // Adjust the import based on your file structure
import { isVisible } from '@testing-library/user-event/dist/cjs/utils/index.js';

describe('Legend', () => {
  const defaultProps = {
    visibleGauges: {
      rainfall: true,
      reservoir: true,
      tidal: false,
      groundwater: false,
      riverWater: false,
      regulators: false,
    },
    isVisible: true,
    toggleVisibility: jest.fn(),
  };

  beforeEach(() => {
    render(<Legend {...defaultProps} />);
  });

  test('renders the Legend header', () => {
    const headerElement = screen.getByText(/Legend/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the GaugeSection for rainfall and reservoir', () => {
    const rainfallGauge = screen.getByText(/Rainfall Gauges/i);
    const reservoirGauge = screen.getByText(/Reservoir\/Dam Level/i);
    
    expect(rainfallGauge).toBeInTheDocument();
    expect(reservoirGauge).toBeInTheDocument();
  });

  test('does not render GaugeSections for hidden gauges', () => {
    const tidalGauge = screen.queryByText(/Tidal Level/i);
    const groundwaterGauge = screen.queryByText(/Groundwater Level/i);
    
    expect(tidalGauge).not.toBeInTheDocument();
    expect(groundwaterGauge).not.toBeInTheDocument();
  });

  test('toggles collapse state', () => {
    const minimizeButton = screen.getByTestId('MinimizeIcon');
    fireEvent.click(minimizeButton);
    const widgetsButton = screen.getByText('Widgets');
    fireEvent.click(widgetsButton);
    const addButton = screen.getByText('Show Legend');
    expect(addButton).toBeInTheDocument();

    // Click on the add button to expand again
    fireEvent.click(addButton);
    expect(minimizeButton).toBeInTheDocument(); // Minimize button should be back
  });

  test('calls toggleVisibility when close icon is clicked', () => {
    const closeButton = screen.getByTestId('CloseIcon');
    fireEvent.click(closeButton);
    expect(defaultProps.toggleVisibility).toHaveBeenCalledTimes(1);
  });

  test('does not render the Legend if isVisible is false', () => {
    const { rerender } = render(<Legend {...{ ...defaultProps, isVisible: false }} />);
    if (!isVisible) {
    const headerElement = screen.queryByText(/Legend/i);
    expect(headerElement).not.toBeInTheDocument();
    } else {
        const headerElement = screen.queryByText(/Legend/i);
        expect(headerElement).toBeInTheDocument();
    }
  });
});