import React from 'react';
import NavigationBar from './NavigationBar';

const NavComponent: React.FC = () => {
  const menuItems = ['Monitor', 'Forecast', 'Impact'];

  return (
    <div className="flex flex-col font-semibold rounded-none">
      <NavigationBar menuItems={menuItems} />
    </div>
  );
};

export default NavComponent;