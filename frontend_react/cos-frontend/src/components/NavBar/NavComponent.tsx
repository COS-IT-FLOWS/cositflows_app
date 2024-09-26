import React from 'react';
import NavigationBar from './NavigationBar';

interface NavComponentProps {
  activeControl: string; // Monitor, Forecast, Impact
  activeView: string;    // Visualization, Analytics, About, Settings
  setActiveControl: (control: string) => void;
  setActiveView: (view: string) => void;
}

const NavComponent: React.FC<NavComponentProps> = ({
  activeControl,
  activeView,
  setActiveControl,
  setActiveView,
}) => {
  const menuItems = ['Monitor', 'Forecast', 'Impact'];

  return (
    <div className="flex flex-col font-semibold rounded-none">
      <NavigationBar 
        menuItems={menuItems}
        activeControl={activeControl}
        activeView={activeView}
        setActiveControl={setActiveControl}
        setActiveView={setActiveView}
      />
    </div>
  );
};

export default NavComponent;