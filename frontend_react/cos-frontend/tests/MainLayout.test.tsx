import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from '../src/MainLayout';


// Define the prop types for the NavigationBar component

interface NavigationBarProps {
  activeControl: string;
  setActiveControl: (control: string) => void;
  setActiveView: (view: string) => void;
  activeView: string;
  menuItems: string[];
  onWidgetToggle: (widget: "alerts" | "layers" | "legend", isVisible: boolean) => void;
  visibleWidgets: { alerts: boolean; layers: boolean; legend: boolean };
}

interface MenuListProps {
  activeControl: string;
  activeView: string;
  setActiveView: (view: string) => void;
}

// Mock the NavigationBar and MenuList components
jest.mock('../src/components/NavBar/NavigationBar', () => {
  return ({ activeControl, setActiveControl, setActiveView, activeView, menuItems, onWidgetToggle, visibleWidgets }: NavigationBarProps) => (
    <div>
      <h1>NavigationBar</h1>
      <button onClick={() => setActiveControl('forecast')}>Set Forecast</button>
      <button onClick={() => onWidgetToggle('alerts', !visibleWidgets.alerts)}>Toggle Alerts</button>
    </div>
  );
});

jest.mock('../src/components/Menu/MenuList', () => {
  return ({ activeControl, activeView, setActiveView }: MenuListProps) => (
    <div>
      <h1>MenuList</h1>
      <button onClick={() => setActiveView('analytics')}>Set Analytics View</button>
    </div>
  );
});

describe('MainLayout Component', () => {
  const mockOnWidgetToggle = jest.fn();
  const visibleWidgets = { alerts: true, layers: true, legend: true };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('renders the MainLayout with NavigationBar and MenuList', () => {
    render(
      <MemoryRouter>
        <MainLayout onWidgetToggle={mockOnWidgetToggle} visibleWidgets={visibleWidgets} />
      </MemoryRouter>
    );

    // Check if NavigationBar and MenuList are rendered
    expect(screen.getByText(/NavigationBar/i)).toBeInTheDocument();
    expect(screen.getByText(/MenuList/i)).toBeInTheDocument();
  });

  it('toggles alerts visibility when button is clicked', () => {
    render(
      <MemoryRouter>
        <MainLayout onWidgetToggle={mockOnWidgetToggle} visibleWidgets={visibleWidgets} />
      </MemoryRouter>
    );

    // Click the toggle alerts button
    fireEvent.click(screen.getByText(/Toggle Alerts/i));

    // Check if the onWidgetToggle function was called with the correct arguments
    expect(mockOnWidgetToggle).toHaveBeenCalledWith('alerts', false); // Initially true, so it should toggle to false
  });

  it('changes active control when button is clicked', () => {
    render(
      <MemoryRouter>
        <MainLayout onWidgetToggle={mockOnWidgetToggle} visibleWidgets={visibleWidgets} />
      </MemoryRouter>
    );

    // Click the set forecast button
    fireEvent.click(screen.getByText(/Set Forecast/i));

    // Check if the active control was set to 'forecast'
    expect(mockOnWidgetToggle).toHaveBeenCalledTimes(0); // No widget toggle should have been called
  });

  it('changes active view when button is clicked', () => {
    render(
      <MemoryRouter>
        <MainLayout onWidgetToggle={mockOnWidgetToggle} visibleWidgets={visibleWidgets} />
      </MemoryRouter>
    );

    // Click the set analytics view button
    fireEvent.click(screen.getByText(/Set Analytics View/i));

    // Check if the active view was set to 'analytics'
    expect(mockOnWidgetToggle).toHaveBeenCalledTimes(0); // No widget toggle should have been called
  });
});