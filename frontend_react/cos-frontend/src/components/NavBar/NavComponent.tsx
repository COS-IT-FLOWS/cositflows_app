import React from 'react';
import NavigationBar from './NavigationBar';

interface NavComponentProps {
  activeControl: string;
  setActiveControl:  React.Dispatch<React.SetStateAction<string>>;
  activeView: string;   
  setActiveView: (view:string) => void;
  onWidgetToggle: (widget: "alerts" | "layers" | "legend", isVisible: boolean) => void;
  visibleWidgets: { alerts: boolean; layers: boolean; legend: boolean };
}

const NavComponent: React.FC<NavComponentProps> = ({
  activeControl,
  setActiveControl,
  activeView,
  setActiveView,
  onWidgetToggle,
  visibleWidgets,
}) => {
  const menuItems = ['Monitor', 'Forecast', 'Impact'];

  return (
    <div className="flex flex-col font-semibold rounded-none">
      <NavigationBar
        activeControl={activeControl}
        setActiveControl={setActiveControl}
        menuItems={menuItems}
        activeView={activeView}
        setActiveView={setActiveView}
        onWidgetToggle={onWidgetToggle}
        visibleWidgets={visibleWidgets}
      />
    </div>
  );
};

export default NavComponent;