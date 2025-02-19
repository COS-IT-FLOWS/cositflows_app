import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import NavigationBar from '../../../src/components/NavBar/NavigationBar'; // Adjust the import path as necessary

const mockSetActiveControl = jest.fn();
const mockSetActiveView = jest.fn();
const mockOnWidgetToggle = jest.fn();

test('renders NavigationBar with menu items', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NavigationBar
        activeControl="Monitor"
        setActiveControl={mockSetActiveControl}
        setActiveView={mockSetActiveView}
        menuItems={['Monitor', 'Forecast', 'Impact']}
        activeView="visualization"
        onWidgetToggle={mockOnWidgetToggle}
        visibleWidgets={{ alerts: true, layers: false, legend: true }}
      />
    </MemoryRouter>
  );

  // Check if the menu items are rendered
  expect(getByText(/Monitor/i)).toBeInTheDocument();
  expect(getByText(/Forecast/i)).toBeInTheDocument();
  expect(getByText(/Impact/i)).toBeInTheDocument();
});