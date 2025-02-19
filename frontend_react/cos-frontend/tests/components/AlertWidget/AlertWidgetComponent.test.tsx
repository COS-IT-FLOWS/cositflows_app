// MyComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertWidgetComponent from '../../../src/components/AlertWidget/AlertWidgetComponent';
import AlertOverlay from '../../../src/components/AlertWidget/AlertCard/Overlay/OverlayCard';

// Mock the AlertOverlay component
jest.mock('../../../src/components/AlertWidget/AlertCard/Overlay/OverlayCard', () => {
  return jest.fn(({ onClose }) => (
    <div>
      <h1>Alert Overlay</h1>
      <button onClick={onClose}>Close Overlay</button>
    </div>
  ));
});

describe('MyComponent', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    render(<AlertWidgetComponent visibleAlerts={true} OnClose={onCloseMock} />);
  });

  it('renders the AlertWidget when visibleAlerts is true', () => {
    expect(screen.getByText('Alerts')).toBeInTheDocument();
  });

  it('does not render the AlertWidget when visibleAlerts is false', () => {
    render(<AlertWidgetComponent visibleAlerts={false} OnClose={onCloseMock} />);
    expect(screen.queryByText('Alerts')).not.toBeInTheDocument();
  });

  it('opens the overlay when an alert card is clicked', () => {
    const alertCard = screen.getAllByText('Lightning')[0];
    fireEvent.click(alertCard);
    expect(screen.getByText('Alert Overlay')).toBeInTheDocument();
  });

  it('closes the overlay when the close button is clicked', () => {
    const alertCard = screen.getAllByText('Lightning')[0];
    fireEvent.click(alertCard); // Open the overlay
    const closeButton = screen.getByText('Close Overlay');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Alert Overlay')).not.toBeInTheDocument();
  });

  it('calls OnClose when the AlertWidget is closed', () => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});