import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonComponent from '../../../src/components/LevelNav/MonitorButton';

describe('ButtonComponent', () => {
  test('renders without crashing', () => {
    render(<ButtonComponent />);
    expect(screen.getByText(/Thrissur/i)).toBeInTheDocument();
    expect(screen.getByText(/Periyar Basin/i)).toBeInTheDocument();
  });

  test('renders all buttons', () => {
    render(<ButtonComponent />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2); // Adjust this if you add more buttons
    expect(buttons[0]).toHaveTextContent('Thrissur');
    expect(buttons[1]).toHaveTextContent('Periyar Basin');
  });

//   test('button click interaction', () => {
//     const handleClick = jest.fn(); // Mock function to simulate button click
//     render(<ButtonComponent onClick={handleClick} />); // Pass the mock function as a prop if needed

//     const button = screen.getByText(/Thrissur/i);
//     fireEvent.click(button);
//     expect(handleClick).toHaveBeenCalled(); // Check if the click handler was called
//   });
});