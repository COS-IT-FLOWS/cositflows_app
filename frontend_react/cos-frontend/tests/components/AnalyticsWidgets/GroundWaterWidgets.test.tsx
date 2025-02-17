import React from 'react';
import { render, screen } from '@testing-library/react';
import GWLWidgets from '../../../src/components/AnalyticsWidgets/GroundWaterWidgets';

describe('GWLWidgets', () => {
  test('renders Vertical Map card', () => {
    render(<GWLWidgets />);
    const verticalMapElement = screen.getByText(/Vertical Map/i);
    expect(verticalMapElement).toBeInTheDocument();
  });

  test('renders Legend card', () => {
    render(<GWLWidgets />);
    const legendElement = screen.getByText(/Legend/i);
    expect(legendElement).toBeInTheDocument();
  });

  test('renders GWL Station card', () => {
    render(<GWLWidgets />);
    const gwlStationElement = screen.getByText(/GWL Station/i);
    expect(gwlStationElement).toBeInTheDocument();
  });

  test('renders Groundwater Level Station Data card', () => {
    render(<GWLWidgets />);
    const gwlDataElement = screen.getByText(/Groundwater Level Station Data/i);
    expect(gwlDataElement).toBeInTheDocument();
  });

  test('renders Monthly Trends card', () => {
    render(<GWLWidgets />);
    const monthlyTrendsElement = screen.getByText(/Monthly Trends/i);
    expect(monthlyTrendsElement).toBeInTheDocument();
  });

  test('renders Basin Details card', () => {
    render(<GWLWidgets />);
    const basinDetailsElement = screen.getByText(/Basin Details/i);
    expect(basinDetailsElement).toBeInTheDocument();
  });
});