import React from "react";
import MonitoringMap from '../../../src/components/Maps/MonitoringMap';
import ImpactScreen from '../../../src/components/Screens/ImpactScreen';
import ForecastMap from "../../../src/components/Maps/ForecastMap";
import ForecastScreen from "../../../src/components/Screens/ForecastScreen";
import MonitorScreen from "../../../src/components/Screens/MonitorScreen";

interface MainDisplayProps {
    activeControl: string;
    activeView: string;
    visibleWidgets: { alerts: boolean; layers: boolean; legend: boolean };
    onWidgetToggle: (widget: "alerts" | "layers" | "legend", isVisible: boolean) => void;  
}

const MainDisplay: React.FC<MainDisplayProps> = ({ activeControl, activeView, onWidgetToggle, visibleWidgets }) => {
  // Render based on active control and active view
  if (activeControl === 'Monitor') {
    if (activeView === 'Visualization') return <MonitorScreen onWidgetToggle={onWidgetToggle} visibleWidgets={visibleWidgets} />;
    // Add conditions for other views like analytics, settings, etc.
}
if (activeControl === 'Forecast') {
    if (activeView === 'Visualization') return <ForecastScreen />;
   
}
if (activeControl === 'Impact') {
    if (activeView === 'Visualization') return <ImpactScreen />;
}

// Default to the Monitoring map if no matching case
return <MonitoringMap />;
};

export default MainDisplay;