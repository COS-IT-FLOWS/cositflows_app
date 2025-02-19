// AlertWidget.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertWidget, { Alert } from '../../../src/components/AlertWidget/AlertWidget';

const mockAlerts: Alert[] = [
  {
    alertType: 'Severe Weather',
    intensity: 'High',
    date: '2023-10-01',
    time: '14:00',
    location: 'Location A',
    validUntil: '2023-10-01T16:00:00Z',
    issuedBy: 'National Weather Service',
  },
  {
    alertType: 'Flood Warning',
    intensity: 'Medium',
    date: '2023-10-01',
    time: '15:00',
    location: 'Location B',
    validUntil: '2023-10-01T18:00:00Z',
    issuedBy: 'Local Authorities',
  },
];

describe('AlertWidget', () => {
  const onAlertClick = jest.fn();
  const onClose = jest.fn();

  beforeEach(() => {
    render(
      <AlertWidget
        location="Test Location"
        alerts={mockAlerts}
        onAlertClick={onAlertClick}
        onClose={onClose}
      />
    );
  });

  it('renders the alert widget with the correct title', () => {
    expect(screen.getByText('Alerts')).toBeInTheDocument();
  });

  it('renders the correct number of alerts', () => {
    const alertCards = screen.getAllByText(/Severe Weather|Flood Warning/i);
    expect(alertCards.length).toBe(mockAlerts.length);
  });

  it('calls onAlertClick when an alert is clicked', () => {
    const alertCard = screen.getByText('Severe Weather');
    fireEvent.click(alertCard);
    expect(onAlertClick).toHaveBeenCalledWith(mockAlerts[0]);
  });

  it('collapses the widget when the minimize button is clicked', () => {
    const minimizeButton = screen.getByRole('button', { name: /minimize/i });
    fireEvent.click(minimizeButton);
    expect(screen.queryByText(/Severe Weather/i)).not.toBeInTheDocument();
  });

  it('closes the widget when the close button is clicked', () => {
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('expands the widget when the add button is clicked', () => {
    const minimizeButton = screen.getByRole('button', { name: /minimize/i });
    fireEvent.click(minimizeButton); // Collapse the widget

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/Severe Weather/i)).toBeInTheDocument();
  });
});