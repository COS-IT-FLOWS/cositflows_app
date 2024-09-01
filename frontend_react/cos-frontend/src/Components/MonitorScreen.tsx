import React from "react";
import AlertWidgetComponent from "./AlertWidget/AlertWidgetComponent";
import MenuList from "./Menu/MenuList";
import LayerComponent from "./LayerWidget/LayersComponent";
import NavComponent from "./NavBar/NavComponent";
import RainfallLegend from "./LegendWidget/LegendComponent";

const MonitorScreen: React.FC = () => {
  {
    const handleClick =()=>
    console.log("Overlay!")
  }
  
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="monitor-screen w-[1440px] h-[900px] bg-gray-100 mx-auto">
      <div style={{position:"absolute", left: "0px"}}>
        <MenuList/>
      </div>
      <div style={{position:"absolute", top: "0px", width: "100%"}}>
        <NavComponent/>
      </div>
      <div style={{ position: "absolute", top: "200px", right:"111px"}}>
        <LayerComponent/>
      </div>
      <div style={{ position: "absolute", top: "200px", left: "111px"}}>
        <AlertWidgetComponent/>
      </div>
        <RainfallLegend lastUpdated={"8.30AM today"}/>
    </div>
  );
};

export default MonitorScreen;
