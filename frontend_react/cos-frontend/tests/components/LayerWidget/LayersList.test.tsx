import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayersList from '../../../src/components/LayerWidget/LayersList';

describe('LayersList', () => {
  const toggleGauge = jest.fn();

  beforeEach(() => {
    render(<LayersList toggleGauge={toggleGauge} />);
  });

  test('renders without crashing', () => {
    expect(screen.getByText(/Rainfall/i)).toBeInTheDocument();
    expect(screen.getByText(/reservoir/i)).toBeInTheDocument();
    expect(screen.getByText(/groundwater/i)).toBeInTheDocument();
    expect(screen.getByText(/riverWater/i)).toBeInTheDocument();
    expect(screen.getByText(/tidal/i)).toBeInTheDocument();
    expect(screen.getByText(/regulators/i)).toBeInTheDocument();
  });

  test('calls toggleGauge when a layer is toggled', () => {
    const checkbox = screen.getByLabelText(/Rainfall gauges/i).previousElementSibling;
    if (previousSibling && previousSibling.children.length >= 2) {
        const secondChild = previousSibling.children[1]; 
    }
    fireEvent.click(checkbox);

    expect(toggleGauge).toHaveBeenCalledTimes(1);
    expect(toggleGauge).toHaveBeenCalledWith('rainfall');
  });

  test('updates the checked state when a layer is toggled', () => {
    const checkbox = screen.getByLabelText(/rainfall/i);
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});