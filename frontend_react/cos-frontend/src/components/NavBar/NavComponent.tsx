import React from 'react';
import NavigationBar from './NavigationBar';

interface NavComponentProps {
  setVisibleAlerts: (visible: boolean) => void;
  setVisibleLayers: (visible: boolean) => void;
  setVisibleLegend: (visible: boolean) => void;
}

const NavComponent: React.FC<NavComponentProps> = ({
  setVisibleAlerts,
  setVisibleLayers,
  setVisibleLegend,
}) => {
  const menuItems = ['Monitor', 'Forecast', 'Impact'];

  return (
    <div className="flex flex-col font-semibold rounded-none">
      <NavigationBar 
      menuItems={menuItems}
      setVisibleAlerts={setVisibleAlerts}
      setVisibleLayers={setVisibleLayers}
      setVisibleLegend={setVisibleLegend}
      />
    </div>
  );
};

export default NavComponent;