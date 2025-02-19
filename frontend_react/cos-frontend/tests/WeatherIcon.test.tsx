import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherIcon from '../src/WeatherIcon';

describe('WeatherIcon Component', () => {
  it('renders the WeatherIcon component with an image', () => {
    render(<WeatherIcon />);

    // Check if the image is rendered using getByAltText
    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.builder.io/api/v1/image/assets/TEMP/899b01c4b7eafe4bdcc3e15b79865f933789601715da72e431af17fe6cab2bf6?apiKey=064c7d1bc1bd4d4dbf906d36b5699d98&');
    expect(image).toHaveAttribute('alt', ''); // Check if alt attribute is empty
  });

  it('has the correct class names', () => {
    const { container } = render(<WeatherIcon />);
    
    // Check if the outer div has the correct class names
    const outerDiv = container.firstChild;
    expect(outerDiv).toHaveClass('flex');
    expect(outerDiv).toHaveClass('z-10');
    expect(outerDiv).toHaveClass('flex-col');
    expect(outerDiv).toHaveClass('items-center');
    expect(outerDiv).toHaveClass('px-16');
    expect(outerDiv).toHaveClass('pt-14');
    expect(outerDiv).toHaveClass('pb-4');
    expect(outerDiv).toHaveClass('mt-1.5');
    expect(outerDiv).toHaveClass('rounded-2xl');
  });
});