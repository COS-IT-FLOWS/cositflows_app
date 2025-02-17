// AlertWidget.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { jest, test, expect, describe } from '@jest/globals';
// import '@types/testing-library__jest-dom';
import '@testing-library/jest-dom';
import AlertWidget, { Alert } from "../../src/components/AlertWidget/AlertWidget";

const mockAlerts: Alert[] = [
  {
    alertType: "Warning",
    intensity: "High",
    date: "2023-10-01",
    time: "12:00",
    location: "Location A",
    validUntil: "2023-10-02",
    issuedBy: "System",
  },
  {
    alertType: "Info",
    intensity: "Low",
    date: "2023-10-01",
    time: "13:00",
    location: "Location B",
    validUntil: "2023-10-03",
    issuedBy: "System",
  },
];

const mockOnAlertClick = jest.fn();
const mockOnClose = jest.fn();

describe("AlertWidget", () => {
  test("renders without crashing", () => {
    render(<AlertWidget location="Test Location" alerts={mockAlerts} onAlertClick={mockOnAlertClick} onClose={mockOnClose} />);
    expect(screen.getByText(/Alerts in Test Location/i)).toBeInTheDocument();
  });

  test("displays alerts when not collapsed", () => {
    render(<AlertWidget location="Test Location" alerts={mockAlerts} onAlertClick={mockOnAlertClick} onClose={mockOnClose} />);
    expect(screen.getByText(/Warning/i)).toBeInTheDocument();
    expect(screen.getByText(/Info/i)).toBeInTheDocument();
  });

  test("collapses and expands the widget", () => {
    const { container } = render(<AlertWidget location="Test Location" alerts={mockAlerts} onAlertClick={mockOnAlertClick} onClose={mockOnClose} />);
    
    // Check that the widget is expanded initially
    expect(screen.getByText(/Warning/i)).toBeInTheDocument();
    
    // Collapse the widget
    const minimizeButton = container.querySelector("svg[data-testid='minimize-icon']");
    fireEvent.click(minimizeButton!);
    
    // Check that alerts are not visible
    expect(screen.queryByText(/Warning/i)).not.toBeInTheDocument();
    
    // Expand the widget
    const addButton = container.querySelector("svg[data-testid='add-icon']");
    fireEvent.click(addButton!);
    
    // Check that alerts are visible again
    expect(screen.getByText(/Warning/i)).toBeInTheDocument();
  });

  test("calls onAlertClick when an alert is clicked", () => {
    render(<AlertWidget location="Test Location" alerts={mockAlerts} onAlertClick={mockOnAlertClick} onClose={mockOnClose} />);
    
    const alertCard = screen.getByText(/Warning/i);
    fireEvent.click(alertCard);
    
    expect(mockOnAlertClick).toHaveBeenCalledWith(mockAlerts[0]);
  });

  test("calls onClose when the close button is clicked", () => {
    render(<AlertWidget location="Test Location" alerts={mockAlerts} onAlertClick={mockOnAlertClick} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});