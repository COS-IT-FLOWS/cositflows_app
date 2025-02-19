// IntensityCardList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import IntensityCardList from '../../../../../src/components/AlertWidget/AlertCard/IntensityCard/IntensityCardList'; // Adjust the import based on your file structure

// Define the props interface for the mocked IntensityCard
interface MockedIntensityCardProps {
  intensity: string;
}

// Mock the IntensityCard component
jest.mock('../../../../../src/components/AlertWidget/AlertCard/IntensityCard/IntensityCard', () => {
  return function MockedIntensityCard({ intensity }: MockedIntensityCardProps) {
    return <div data-testid="intensity-card">{intensity}</div>;
  };
});

describe('IntensityCardList', () => {
  it('renders without crashing', () => {
    const intensities = [{ intensity: 'Low' }];
    render(<IntensityCardList intensities={intensities} />);
    expect(screen.getByText(/Low/i)).toBeInTheDocument(); // Check if the intensity text is rendered
  });

  it('renders the correct number of IntensityCard components', () => {
    const intensities = [
      { intensity: 'Low' },
      { intensity: 'Medium' },
      { intensity: 'High' },
    ];
    render(<IntensityCardList intensities={intensities} />);
    
    // Check if the correct number of IntensityCard components are rendered
    const cards = screen.getAllByTestId('intensity-card');
    expect(cards).toHaveLength(intensities.length); // Should match the length of the intensities array
  });

  it('displays the correct intensity values', () => {
    const intensities = [
      { intensity: 'Low' },
      { intensity: 'Medium' },
      { intensity: 'High' },
    ];
    render(<IntensityCardList intensities={intensities} />);
    
    // Check if the intensity values are displayed correctly expect(screen.getByText(/Low/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium/i)).toBeInTheDocument();
    expect(screen.getByText(/High/i)).toBeInTheDocument();
  });
});