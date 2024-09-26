import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';
import MenuList from './components/Menu/MenuList';
import NavigationBar from './components/NavBar/NavigationBar';
import MainDisplay from './components/Screens/MainDisplay';

const MainLayout: React.FC = () => {
  const [activeControl, setActiveControl] = useState('Monitor'); // Monitor, Forecast, Impact
  const [activeView, setActiveView] = useState('Visualization'); // Visualization, Analytics, etc.
  const menuItems = ['Monitor','Forecast','Impact'];

  return (
    <div className="app-container w-full h-screen relative bg-zinc-900 bg-opacity-98">
      <div className="fixed top-0 left-0 w-full z-10">
        <NavigationBar
        activeControl={activeControl}
        activeView={activeView}
        setActiveControl={setActiveControl}
        setActiveView={setActiveView}
        menuItems={menuItems}
        />
      </div>

      <div className="fixed left-0 top-[62px] h-[calc(100%-62px] z-10">
       <MenuList setActiveView={setActiveView}/>
       </div>

      <div className="main-display absolute">
        {/* This will render the content based on the current route */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;