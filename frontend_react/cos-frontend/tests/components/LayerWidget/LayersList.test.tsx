// LayersList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayersList from '../../../src/components/LayerWidget/LayersList'; // Adjust the import based on your file structure

describe('LayersList', () => {
  const toggleGaugeMock = jest.fn(); // Mock function for toggleGauge

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('renders without crashing', () => {
    render(<LayersList toggleGauge={toggleGaugeMock} />);
    
    // Check if all layer items are rendered
    expect(screen.getByText(/rainfall/i)).toBeInTheDocument();
    expect(screen.getByText(/reservoir/i)).toBeInTheDocument();
    expect(screen.getByText(/groundwater/i)).toBeInTheDocument();
    expect(screen.getByText(/riverWater/i)).toBeInTheDocument();
    expect(screen.getByText(/tidal/i)).toBeInTheDocument();
    expect(screen.getByText(/regulators/i)).toBeInTheDocument();
  });

  it('toggles the gauge when a layer item is clicked', () => {
    render(<LayersList toggleGauge={toggleGaugeMock} />);

    // Click on the "rainfall" layer item
    fireEvent.click(screen.getByText(/rainfall/i));

    // Check if toggleGauge was called with the correct parameter
    expect(toggleGaugeMock).toHaveBeenCalledWith('PRECIPITATION');

    // Click on the "reservoir" layer item
    fireEvent.click(screen.getByText(/reservoir/i));

    // Check if toggleGauge was called with the correct parameter
    expect(toggleGaugeMock).toHaveBeenCalledWith('RESERVOIR');
  });

  it('maintains the checked state of layer items', () => {
    render(<LayersList toggleGauge={toggleGaugeMock} />);

    // Click on the "rainfall" layer item
    fireEvent.click(screen.getByText(/rainfall/i));

    // Check if toggleGauge was called
    expect(toggleGaugeMock).toHaveBeenCalledWith('PRECIPITATION');

    // Click again to toggle it off
    fireEvent.click(screen.getByText(/rainfall/i));

    // Check if toggleGauge was called again
    expect(toggleGaugeMock).toHaveBeenCalledWith('PRECIPITATION');
  });
});