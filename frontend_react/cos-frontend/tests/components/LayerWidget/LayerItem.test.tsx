// LayerItem.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LayerItem from '../../../src/components/LayerWidget/LayerItem'; // Adjust the import based on your file structure

describe('LayerItem', () => {
  const label = 'rainfall';
  const param = 'PRECIPITATION' as const; // Type assertion for GaugeType
  const onToggleMock = jest.fn(); // Mock function for onToggle

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
  });

  it('renders without crashing', () => {
    render(<LayerItem label={label} param={param} isChecked={false} onToggle={onToggleMock} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('displays the checked checkbox when isChecked is true', () => {
    render(<LayerItem label={label} param={param} isChecked={true} onToggle={onToggleMock} />);
    expect(screen.getByTestId('checkbox-checked')).toBeInTheDocument(); // Check for the checked checkbox
  });

  it('displays the unchecked checkbox when isChecked is false', () => {
    render(<LayerItem label={label} param={param} isChecked={false} onToggle={onToggleMock} />);
    expect(screen.getByTestId('checkbox-unchecked')).toBeInTheDocument(); // Check for the checked checkbox
  });

  it('calls onToggle when clicked', () => {
    render(<LayerItem label={label} param={param} isChecked={false} onToggle={onToggleMock} />);
    
    // Simulate a click on the LayerItem
    fireEvent.click(screen.getByText(label));
    
    // Check if the onToggle function was called
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});