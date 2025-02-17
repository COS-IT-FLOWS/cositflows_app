import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImpactScreen from '../../../src/components/Screens/ImpactScreen';
import ButtonComponent from '../../../src/components/LevelNav/ImpactButtons';

// Mock the ButtonComponent to control the selected map
jest.mock('../../../src/components/LevelNav/ImpactButtons', () => {
  return jest.fn(({ setSelectedMap }) => (
    <div>
      <button onClick={() => setSelectedMap('flood-inundation')}>Flood Inundation</button>
      <button onClick={() => setSelectedMap('population')}>Population</button>
      <button onClick={() => setSelectedMap('households')}>Households</button>
      <button onClick={() => setSelectedMap('agriculture')}>Agriculture</button>
    </div>
  ));
});

describe('ImpactScreen Component', () => {
  test('renders without crashing', () => {
    render(<ImpactScreen />);
    expect(screen.getByText(/Flood Inundation/i)).toBeInTheDocument();
  });

  test('displays flood inundation map by default', () => {
    render(<ImpactScreen />);
    expect(screen.getByAltText(/Flood Inundation/i)).toBeInTheDocument();
  });

  test('displays population map when selected', () => {
    render(<ImpactScreen />);
    const populationButton = screen.getByText(/Population/i);
    fireEvent.click(populationButton);
    expect(screen.getByAltText(/Flood Inundation/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/ /i)).toBeInTheDocument(); // Check for population image
  });

  test('displays households map when selected', () => {
    render(<ImpactScreen />);
    const householdsButton = screen.getByText(/Households/i);
    fireEvent.click(householdsButton);
    expect(screen.getByAltText(/Flood Inundation/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/ /i)).toBeInTheDocument(); // Check for households image
  });

  test('displays agriculture map when selected', () => {
    render(<ImpactScreen />);
    const agricultureButton = screen.getByText(/Agriculture/i);
    fireEvent.click(agricultureButton);
    expect(screen.getByAltText(/Flood Inundation/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/ /i)).toBeInTheDocument(); // Check for agriculture image
  });
});