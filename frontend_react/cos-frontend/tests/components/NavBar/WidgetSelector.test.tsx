import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WidgetSelector from '../../../src/components/NavBar/WidgetSelector'; // Adjust the import path as necessary

const mockOnWidgetToggle = jest.fn();

test('renders WidgetSelector and toggles widget visibility', () => {
  render(
    <WidgetSelector
      onWidgetToggle={mockOnWidgetToggle}
      visibleWidgets ={{ alerts: true, layers: false, legend: true }}
    />
  );

  // Check if the button is rendered
  const button = screen.getByRole('button', { name: /widgets/i });
  expect(button).toBeInTheDocument();

  // Open the menu
  fireEvent.click(button);

  // Check if menu items are rendered
  expect(screen.getByText(/hide alerts/i)).toBeInTheDocument();
  expect(screen.getByText(/show map layers/i)).toBeInTheDocument();
  expect(screen.getByText(/hide legend/i)).toBeInTheDocument();

  // Toggle alerts visibility
  fireEvent.click(screen.getByText(/hide alerts/i));
  expect(mockOnWidgetToggle).toHaveBeenCalledWith("alerts", false);

  // Toggle layers visibility
  fireEvent.click(screen.getByText(/show map layers/i));
  expect(mockOnWidgetToggle).toHaveBeenCalledWith("layers", true);

  // Toggle legend visibility
  fireEvent.click(screen.getByText(/hide legend/i));
  expect(mockOnWidgetToggle).toHaveBeenCalledWith("legend", false);
});