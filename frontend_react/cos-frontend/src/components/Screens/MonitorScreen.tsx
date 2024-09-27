import React, {useState} from "react";
import AlertWidgetComponent from "../AlertWidget/AlertWidgetComponent";
import MenuList from "../Menu/MenuList";
import LayerComponent from "../LayerWidget/LayersComponent";
import NavComponent from "../NavBar/NavComponent";
import Legend from "../LegendWidget/Legend";
import Map from '../Maps/MonitoringMap';
import { MonitoringMapComponent } from "../Maps/MonitoringMapComponent";

// type GaugeType = "PRECIPITATION" | "RESERVOIR" | "TIDAL" | "GROUNDWATER" | "RIVER" | "REGULATOR";

interface GaugeType {
  PRECIPITATION: boolean;
  RESERVOIR: boolean;
  TIDAL: boolean;
  GROUNDWATER: boolean;
  RIVER: boolean;
  REGULATOR: boolean;
}

const initialVisibleGauges = {
  PRECIPITATION: false,
  RESERVOIR: false,
  TIDAL: false,
  GROUNDWATER: false,
  RIVER: false,
  REGULATOR : false,
};

const MonitorScreen: React.FC = () => {
  {
    const handleClick =()=>
    console.log("Overlay!")
  }
  
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  const toggleLegendVisibility = () => {
    setVisibleLegend((prev) => !prev);
  };

  const [visibleGauges, setVisibleGauges] = useState(initialVisibleGauges);

  const [visibleAlerts, setVisibleAlerts] = useState(true);
  const [visibleLayers, setVisibleLayers] = useState(true);
  const [visibleLegend, setVisibleLegend] = useState(true);

  function toggleGauge(gaugeType: keyof GaugeType) {
    setVisibleGauges({ ...visibleGauges, [gaugeType]: !visibleGauges[gaugeType] });
  };

  const isGaugesVisible = Object.values(visibleGauges).some((isVisible) => isVisible);

  return (
    <div className="monitor-screen w-full bg-gray-100 mx-auto relative flex flex-col">
      <div className="absolute w-full h-full">
        <MonitoringMapComponent
        visibleGauges={visibleGauges}
        />
      </div>
      <div className='absolute left-0'>
        <MenuList/>
        </div>
      <div className="w-full z-10">
        <NavComponent
        setVisibleAlerts={setVisibleAlerts}
        setVisibleLayers={setVisibleLayers}
        setVisibleLegend={setVisibleLegend}
        />
      </div>

      <div className="absolute top-0 right-0 mt-[90px] mr-[20px] flex flex-col items-end">
        {visibleLayers && (
          <LayerComponent
           visibleGauges={visibleGauges} 
           toggleGauge={toggleGauge}
           onClose={() => setVisibleLayers(false)}/>
        )}
        {isGaugesVisible && visibleLegend && (
          <div className="mt-[15px] right-0"> 
          <Legend 
          visibleGauges={visibleGauges}
          isVisible={visibleLegend}
          toggleVisibility={() => setVisibleLegend(!visibleLegend)}
          /> 
          </div>
        )}
      </div>
      
      <div style={{ position: "absolute", top: "200px", left: "111px"}}>
        {visibleAlerts && (
        <AlertWidgetComponent
         visibleAlerts={visibleAlerts}
         OnClose= {() => setVisibleAlerts(false)}
         />
       )}
      </div>
    </div>
  );
};

export default MonitorScreen;
