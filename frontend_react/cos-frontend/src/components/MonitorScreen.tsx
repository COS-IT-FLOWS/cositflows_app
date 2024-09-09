import React, {useState} from "react";
import AlertWidgetComponent from "./AlertWidget/AlertWidgetComponent";
import MenuList from "./Menu/MenuList";
import LayerComponent from "./LayerWidget/LayersComponent";
import NavComponent from "./NavBar/NavComponent";
import Legend from "./LegendWidget/Legend";

type Gaugetype = "rainfall" | "reservoir" | "tidal" | "groundwater" | "riverWater" | "regulators";

const initialVisibleGauges: Record<Gaugetype, boolean> = {
  rainfall: false,
  reservoir: false,
  tidal: false,
  groundwater: false,
  riverWater: false,
  regulators: false,
};

const MonitorScreen: React.FC = () => {
  {
    const handleClick =()=>
    console.log("Overlay!")
  }
  
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  const [visibleGauges, setVisibleGauges] = useState(initialVisibleGauges);

  const toggleGauge = (gauge: Gaugetype) => {
    setVisibleGauges((prevState) => ({
      ...prevState,
      [gauge]: !prevState[gauge],
    }));
  };

  return (
    <div className="monitor-screen w-full h-[900px] bg-gray-100 mx-auto relative flex flex-col">
      <div style={{position:"absolute", left: "0px"}}>
        <MenuList/>
      </div>
      <div className="w-full">
        <NavComponent/>
      </div>

      <div className="absolute top-0 right-0 mt-[90px] mr-[20px] flex flex-col items-end">
        <LayerComponent visibleGauges={visibleGauges} toggleGauge={toggleGauge}/>
        <div className="mt-[15px] right-0"> <Legend visibleGauges={visibleGauges}/> </div>
      </div>
      <div style={{ position: "absolute", top: "200px", left: "111px"}}>
        <AlertWidgetComponent/>
      </div>
    </div>
  );
};

export default MonitorScreen;
