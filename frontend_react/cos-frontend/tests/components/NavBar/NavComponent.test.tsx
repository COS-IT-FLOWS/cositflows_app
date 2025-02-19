import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import NavComponent from '../../../src/components/NavBar/NavComponent'; // Adjust the import path as necessary

const mockSetActiveControl = jest.fn();
const mockSetActiveView = jest.fn();
const mockOnWidgetToggle = jest.fn();

test('renders NavComponent with default menu items', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NavComponent
        activeControl="someControl"
        setActiveControl={mockSetActiveControl}
        activeView="someView"
        setActiveView={mockSetActiveView}
        onWidgetToggle={mockOnWidgetToggle}
        visibleWidgets={{ alerts: true, layers: false, legend: true }}
      />
    </MemoryRouter>
  );

  // Check if the default menu items are rendered
  expect(getByText(/Monitor/i)).toBeInTheDocument();
  expect(getByText(/Forecast/i)).toBeInTheDocument();
  expect(getByText(/Impact/i)).toBeInTheDocument();
});