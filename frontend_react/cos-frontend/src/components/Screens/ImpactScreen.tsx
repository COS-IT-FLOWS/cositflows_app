import React, {useState} from "react";
import AlertWidgetComponent from "../AlertWidget/AlertWidgetComponent";
import MenuList from "../Menu/MenuList";
import LayerComponent from "../LayerWidget/LayersComponent";
import NavComponent from "../NavBar/NavComponent";
import Legend from "../LegendWidget/Legend";
import Map from '../Maps/ImpactMap';

type Gaugetype = "rainfall" | "reservoir" | "tidal" | "groundwater" | "riverWater" | "regulators";

const initialVisibleGauges: Record<Gaugetype, boolean> = {
  rainfall: false,
  reservoir: false,
  tidal: false,
  groundwater: false,
  riverWater: false,
  regulators: false,
};

const ImpactScreen: React.FC = () => {
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

  const toggleGauge = (gauge: Gaugetype) => {
    setVisibleGauges((prevState) => ({
      ...prevState,
      [gauge]: !prevState[gauge],
    }));
  };

  const isGaugesVisible = Object.values(visibleGauges).some((isVisible) => isVisible);

  return (
    <div className="monitor-screen w-full bg-gray-100 mx-auto relative flex flex-col">
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
      <div className="grid grid-cols-3 relative left-20 w-full h-screen">
        <div className="p-4 h-1/2 overflow-hidden">
          <Map/>
        </div>
        <div className="bg-gray-200 p-4 h-1/2">Population</div>
        <div className="bg-gray-100 p-4 h-1/2">Terrain</div>
        <div className="bg-gray-100 p-4">Transportation</div>
        <div className="bg-gray-100 p-4">Item 5</div>
        <div className="bg-gray-1s00 p-4">Item 6</div>
      </div>
    </div>
  );
};

export default ImpactScreen;
