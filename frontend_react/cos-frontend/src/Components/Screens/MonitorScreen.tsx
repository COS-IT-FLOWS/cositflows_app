import React from "react";
import AlertWidgetComponent from "../AlertWidget/AlertWidgetComponent";
import MenuList from "../Menu1/MenuList";
import Map from "../Maps/MonitoringMap.js";


const MonitorScreen: React.FC = () => {
  {
    const handleClick =()=>
    console.log("Overlay!")
  }
  
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="monitor-screen mx-auto">
      <Map/>
      <MenuList/>
      <AlertWidgetComponent/>
    </div>
  );
};

export default MonitorScreen;
