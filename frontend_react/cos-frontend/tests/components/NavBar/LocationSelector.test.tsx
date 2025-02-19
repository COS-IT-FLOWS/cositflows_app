import React from 'react';
import { render, screen } from '@testing-library/react';
import LocationSelector from '../../../src/components/NavBar/LocationSelector'; // Adjust the import path as necessary

test('renders LocationSelector with the correct location', () => {
  render(<LocationSelector location='Thrissur'/>);

  // Check if the location text is in the document
  const locationText = screen.getByText(/Thrissur/i);
  expect(locationText).toBeInTheDocument();

  // Check if the button has the correct aria-label
  const button = screen.getByLabelText(/Select location: Thrissur/i);
  expect(button).toBeInTheDocument();
});