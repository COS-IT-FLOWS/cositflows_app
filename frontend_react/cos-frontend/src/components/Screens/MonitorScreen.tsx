import React, {useState} from "react";
import AlertWidgetComponent from "../AlertWidget/AlertWidgetComponent";
import LayerComponent from "../LayerWidget/LayersComponent";
import Legend from "../LegendWidget/Legend";
import Map from "../Maps/MonitoringMap";
import WidgetSelector from "../NavBar/WidgetSelector";

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
  const [visibleWidgets, setVisibleWidgets] = useState({
    alerts: true,
    layers: true,
    legend: true,
  });

  const handleWidgetToggle = (widget: "alerts" | "layers" | "legend", isVisible: boolean) => {
    setVisibleWidgets(prev => ({
      ...prev,
      [widget]: isVisible,
    }));
  };

  const [visibleGauges, setVisibleGauges] = useState(initialVisibleGauges);

  const toggleGauge = (gauge: Gaugetype) => {
    setVisibleGauges((prevState) => ({
      ...prevState,
      [gauge]: !prevState[gauge],
    }));
  };

  const isGaugesVisible = Object.values(visibleGauges).some((isVisible) => isVisible);

  return (
    <div className="monitor-screen w-full bg-gray-100 mx-auto relative flex flex-col">
      <div className="absolute w-full h-full">
        <Map />
      </div>

      {/* Widgets */}
      <div className="absolute top-0 right-0 mt-[90px] mr-[20px] flex flex-col items-end">
        {visibleWidgets.layers && (
          <LayerComponent
            visibleGauges={visibleGauges}
            toggleGauge={toggleGauge}
            onClose={() => handleWidgetToggle('layers', false)}
          />
        )}
        {isGaugesVisible && visibleWidgets.legend && (
          <div className="mt-[15px] right-0">
            <Legend
              visibleGauges={visibleGauges}
              isVisible={visibleWidgets.legend}
              toggleVisibility={() => handleWidgetToggle('legend', !visibleWidgets.legend)}
            />
          </div>
        )}
      </div>

      {/* Alerts */}
      <div style={{ position: "absolute", top: "200px", left: "111px" }}>
        {visibleWidgets.alerts && (
          <AlertWidgetComponent
            visibleAlerts={visibleWidgets.alerts}
            OnClose={() => handleWidgetToggle('alerts', false)}
          />
        )}
      </div>

       {/* Widget Selector for toggling widgets */}
       <WidgetSelector onWidgetToggle={handleWidgetToggle} />
    </div>
  );
};

export default MonitorScreen;