import React from 'react';
import { render, screen } from '@testing-library/react';
import GaugeSection from '../../../src/components/LegendWidget/GaugeSection'; // Adjust the import based on your file structure

describe('GaugeSection', () => {
  const defaultProps = {
    title: 'Water Level',
    colors: ['#FF0000', '#00FF00', '#0000FF'],
    values: ['0', '50', '100'],
    labels: ['Low', 'Medium', 'High'],
    unit: 'meter',
  };

  let container: HTMLElement;

  beforeEach(() => {
        const renderResult = render(<GaugeSection {...defaultProps} />);
        container = renderResult.container;
  });

  test('renders the title', () => {
    const titleElement = screen.getByText(/Water Level/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the correct number of color segments', () => {
    const colorSegments = container.getElementsByClassName('w-[29px]'); 
    expect(colorSegments.length).toBe(defaultProps.colors.length);
  });

  test('renders scale values in the correct positions', () => {
    const scaleValues = screen.getAllByText(/0|50|100/i);
    expect(scaleValues.length).toBe(defaultProps.values.length);
    
    // Check if scale values are rendered correctly
    scaleValues.forEach((value, index) => {
      expect(value).toBeInTheDocument();
      expect(value).toHaveStyle(`left: ${index * (146 / defaultProps.colors.length) + (146 / defaultProps.colors.length) / 2}px`);
    });
  });

  test('renders the unit label', () => {
    const unitElement = screen.getByText(/meter/i);
    expect(unitElement).toBeInTheDocument();
  });
});