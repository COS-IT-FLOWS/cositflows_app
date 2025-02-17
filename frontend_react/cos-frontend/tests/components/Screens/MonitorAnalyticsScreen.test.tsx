import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnalyticsScreen from '../../../src/components/Screens/MonitorAnalyticsScreen';
import RainfallAnalytics from '../../../src/components/AnalyticsWidgets/RainfallWidgets';
import ReservoirAnalytics from '../../../src/components/AnalyticsWidgets/ReservoirAnalytics';
import RiverAnalytics from '../../../src/components/AnalyticsWidgets/RiverWidgets';
import GroundWaterAnalytics from '../../../src/components/AnalyticsWidgets/GroundWaterWidgets';
import TidalAnalytics from '../../../src/components/AnalyticsWidgets/TidalWidgets';

// Mock the analytics components
jest.mock('../../../src/components/AnalyticsWidgets/RainfallWidgets', () => () => <div>Rainfall Analytics</div>);
jest.mock('../../../src/components/AnalyticsWidgets/ReservoirAnalytics', () => () => <div>Reservoir Analytics</div>);
jest.mock('../../../src/components/AnalyticsWidgets/RiverWidgets', () => () => <div>River Analytics</div>);
jest.mock('../../../src/components/AnalyticsWidgets/GroundWaterWidgets', () => () => <div>Groundwater Analytics</div>);
jest.mock('../../../src/components/AnalyticsWidgets/TidalWidgets', () => () => <div>Tidal Analytics</div>);

describe('AnalyticsScreen Component', () => {
  test('renders without crashing', () => {
    render(<AnalyticsScreen />);
    expect(screen.getByText(/Rainfall Analytics/i)).toBeInTheDocument();
  });

  test('displays RainfallAnalytics by default', () => {
    render(<AnalyticsScreen />);
    expect(screen.getByText(/Rainfall Analytics/i)).toBeInTheDocument();
  });

  test('displays ReservoirAnalytics when selected', () => {
    render(<AnalyticsScreen />);
    const reservoirLink = screen.getByText(/Reservoir/i);
    fireEvent.click(reservoirLink);
    expect(screen.getByText(/Reservoir Analytics/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rainfall Analytics/i)).not.toBeInTheDocument();
  });

  test('displays GroundwaterAnalytics when selected', () => {
    render(<AnalyticsScreen />);
    const groundwaterLink = screen.getByText(/Groundwater/i);
    fireEvent.click(groundwaterLink);
    expect(screen.getByText(/Groundwater Analytics/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rainfall Analytics/i)).not.toBeInTheDocument();
  });

  test('displays RiverAnalytics when selected', () => {
    render(<AnalyticsScreen />);
    const riverLink = screen.getByText(/River/i);
    fireEvent.click(riverLink);
    expect(screen.getByText(/River Analytics/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rainfall Analytics/i)).not.toBeInTheDocument();
  });

  test('displays TidalAnalytics when selected', () => {
    render(<AnalyticsScreen />);
    const tidalLink = screen.getByText(/Tidal/i);
    fireEvent.click(tidalLink);
    expect(screen.getByText(/Tidal Analytics/i)).toBeInTheDocument();
    expect(screen.queryByText(/Rainfall Analytics/i)).not.toBeInTheDocument();
  });
});