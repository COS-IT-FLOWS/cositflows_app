import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import MenuList from './components/Menu/MenuList';
import NavigationBar from './components/NavBar/NavigationBar';
//import NavComponent from './components/NavBar/NavComponent';

interface MainLayoutProps {
  visibleWidgets: { alerts: boolean; layers: boolean; legend: boolean };
  onWidgetToggle: (widget: "alerts" | "layers" | "legend", isVisible: boolean) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({onWidgetToggle, visibleWidgets}) => {
  const [activeControl, setActiveControl] = useState('monitor'); // Monitor, Forecast, Impact
  const [activeView, setActiveView] = useState('visualization'); // Visualization, Analytics, etc.
  const menuItems = ['Monitor','Forecast','Impact'];
  // console.log('Testing');
  return (
    <div className="app-container w-full h-screen relative bg-zinc-900 bg-opacity-98">
      <div className="fixed top-0 left-0 w-full z-10">
        <NavigationBar
        activeControl={activeControl}
        setActiveControl={setActiveControl} 
        setActiveView={setActiveView}
        activeView={activeView}
        menuItems={menuItems}
        onWidgetToggle={onWidgetToggle}
        visibleWidgets={visibleWidgets}
        />
      </div>

      <div className="fixed left-0 top-[62px] h-[calc(100%-62px] z-10">
       <MenuList activeControl={activeControl} activeView={activeView} setActiveView={setActiveView}/>
       </div>

      <div className="main-display absolute">
        {/* This will render the content based on the current route */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;