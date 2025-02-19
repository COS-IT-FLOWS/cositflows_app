// IntensityCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import IntensityCard from '../../../../../src/components/AlertWidget/AlertCard/IntensityCard/IntensityCard'; // Adjust the import based on your file structure

describe('IntensityCard', () => {
  it('renders without crashing', () => {
    render(<IntensityCard intensity="Low" />);
    expect(screen.getByText(/Low/i)).toBeInTheDocument(); // Check if the intensity text is rendered
  });

  it('renders with small size by default', () => {
    const { container } = render(<IntensityCard intensity="Medium" />);
    expect(container.firstChild).toHaveClass('w-[75px]'); // Check for default small size
    expect(container.firstChild).toHaveClass('h-[50px]');
  });

  it('renders with large size when specified', () => {
    const { container } = render(<IntensityCard intensity="High" size="large" />);
    expect(container.firstChild).toHaveClass('w-[106px]'); // Check for large size
    expect(container.firstChild).toHaveClass('h-[75px]');
  });

  it('displays the gauge correctly', () => {
    render(<IntensityCard intensity="Critical" />);
    // Check if the gauge is rendered
    expect(screen.getByRole('img')).toBeInTheDocument(); // Assuming the gauge is rendered as an SVG or similar
  });
});