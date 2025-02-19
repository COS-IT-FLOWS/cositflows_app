// IntensitySection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import IntensitySection from '../../../../../src/components/AlertWidget/AlertCard/IntensityCard/IntensitySection'; // Adjust the import based on your file structure

// Define the props interface for the mocked IntensityCardList
interface MockedIntensityCardListProps {
  intensities: { intensity: string }[];
}

// Mock the IntensityCardList component
jest.mock('../../../../../src/components/AlertWidget/AlertCard/IntensityCard/IntensityCardList', () => {
  return function MockedIntensityCardList({ intensities }: MockedIntensityCardListProps) {
    return (
      <div data-testid="intensity-card-list">
        {intensities.map((intensity, index) => (
          <div key={index} data-testid="intensity-card">{intensity.intensity}</div>
        ))}
      </div>
    );
  };
});

describe('IntensitySection', () => {
  it('renders without crashing', () => {
    render(<IntensitySection />);
    expect(screen.getByTestId('intensity-card-list')).toBeInTheDocument(); // Check if the IntensityCardList is rendered
  });

  it('passes the correct intensity data to IntensityCardList', () => {
    render(<IntensitySection />);
    
    // Check if the intensity data is displayed correctly
    expect(screen.getByText(/High intensity/i)).toBeInTheDocument();
  });
});