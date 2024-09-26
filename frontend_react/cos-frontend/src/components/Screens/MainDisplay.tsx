import React from "react";
import MonitoringMap from '../Maps/MonitoringMap';
import ImpactScreen from './ImpactScreen';
import ForecastMap from "../Maps/ForecastMap";
import ForecastScreen from "./ForecastScreen";
import MonitorScreen from "./MonitorScreen";

interface MainDisplayProps {
    activeControl: string;
    activeView: string;
}

const MainDisplay: React.FC<MainDisplayProps> = ({ activeControl, activeView }) => {
  // Render based on active control and active view
  if (activeControl === 'Monitor') {
    if (activeView === 'Visualization') return <MonitoringMap />;
    // Add conditions for other views like analytics, settings, etc.
}
if (activeControl === 'Forecast') {
    if (activeView === 'Visualization') return <ForecastMap />;
   
}
if (activeControl === 'Impact') {
    if (activeView === 'Visualization') return <ImpactScreen />;
}

// Default to the Monitoring map if no matching case
return <MonitoringMap />;
};

export default MainDisplay;