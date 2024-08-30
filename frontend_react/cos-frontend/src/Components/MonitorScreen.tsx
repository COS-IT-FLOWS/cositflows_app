import React from "react";
import AlertWidgetComponent from "./AlertWidget/AlertWidgetComponent";
import MenuList from "./Menu/MenuList";
import LayerWidget from "./LayerWidget/Layerwidget";
import NavComponent from "./NavBar/NavComponent";

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
      <MenuList/>
      <div style={{position:"absolute", top: "0px", width: "100%"}}>
        <NavComponent/>
      </div>
      <div style={{ position: "absolute", top: "200px", right:"111px"}}>
        <LayerWidget/>
      </div>
      <div style={{ position: "absolute", top: "200px", left: "111px"}}>
        <AlertWidgetComponent/>
      </div> 
    </div>
  );
};

export default MonitorScreen;
