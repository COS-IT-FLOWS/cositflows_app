import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayerItem from '../../../src/components/LayerWidget/LayerItem'; // Adjust the import based on your file structure

type GaugeType = "rainfall" | "reservoir" | "groundwater" | "riverWater" | "tidal" | "regulators";

describe('LayerItem', () => {
  const defaultProps = {
    label: "rainfall" as GaugeType, // Example GaugeType
    isChecked: false,
    onToggle: jest.fn(),
  };

  beforeEach(() => {
    render(<LayerItem {...defaultProps} />);
  });

  test('renders the checkbox as unchecked when isChecked is false', () => {
    const checkbox = screen.getByTestId('CheckBoxOutlineBlankIcon');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('text-white'); // Ensure the checkbox has the correct class
  });

  test('renders the checkbox as checked when isChecked is true', () => {
    const { rerender } = render(<LayerItem {...{ ...defaultProps, isChecked: true }} />);
    const checkbox = screen.getByTestId('CheckBoxIcon');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('text-white'); // Ensure the checkbox has the correct class
  });

  test('calls onToggle when the checkbox is clicked', () => {
    const checkbox = screen.getByText('rainfall'); // Find the label text
    fireEvent.click(checkbox); // Simulate click on the checkbox
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1); // Check if onToggle was called
  });

  test('displays the correct label', () => {
    const labelElement = screen.getByText(/rainfall/i);
    expect(labelElement).toBeInTheDocument();
  });
});