import React, {useState} from "react";
import AlertWidgetComponent from "../AlertWidget/AlertWidgetComponent";
import LayerComponent from "../LayerWidget/LayersComponent";
import Legend from "../LegendWidget/Legend";
import Map from "../Maps/MonitoringMap";
//import WidgetSelector from "../NavBar/WidgetSelector";

type Gaugetype = "rainfall" | "reservoir" | "tidal" | "groundwater" | "riverWater" | "regulators";

interface MonitorScreenProps {
  visibleWidgets: { alerts: boolean; layers: boolean; legend: boolean };
  onWidgetToggle: (widget: "alerts" | "layers" | "legend", isVisible: boolean) => void;
}

const initialVisibleGauges: Record<Gaugetype, boolean> = {
  rainfall: false,
  reservoir: false,
  tidal: false,
  groundwater: false,
  riverWater: false,
  regulators: false,
};

const MonitorScreen: React.FC<MonitorScreenProps> = ({onWidgetToggle,visibleWidgets}) => {
  // const [visibleWidgets, setVisibleWidgets] = useState({
  //   alerts: true,
  //   layers: true,
  //   legend: true,
  // });

  // const onWidgetToggle = (widget: "alerts" | "layers" | "legend", isVisible: boolean) => {
  //   setVisibleWidgets(prev => ({
  //     ...prev,
  //     [widget]: isVisible,
  //   }));
  // };

  const [visibleGauges, setVisibleGauges] = useState(initialVisibleGauges);

  const toggleGauge = (gauge: Gaugetype) => {
    setVisibleGauges((prevState) => ({
      ...prevState,
      [gauge]: !prevState[gauge],
    }));
  };

  const isGaugesVisible = Object.values(visibleGauges).some((isVisible) => isVisible);

  return (
    <div className="monitor-screen w-full h-full relative flex flex-col rounded-[15px] overflow-hidden">
      <div className="absolute w-full h-full rounded-[15px] overflow-hidden">
        <Map />
      </div>

      {/* Widgets */}
      <div className="absolute top-0 right-0 mt-[10px] mr-[20px] flex flex-col items-end">
        {visibleWidgets.layers && (
          <LayerComponent
            visibleGauges={visibleGauges}
            toggleGauge={toggleGauge}
            onClose={() => onWidgetToggle('layers', false)}
          />
        )}
        {isGaugesVisible && visibleWidgets.legend && (
          <div className="mt-[15px] right-0">
            <Legend
              visibleGauges={visibleGauges}
              isVisible={visibleWidgets.legend}
              toggleVisibility={() => onWidgetToggle('legend', !visibleWidgets.legend)}
            />
          </div>
        )}
      </div>

      {/* Alerts */}
      <div style={{ position: "absolute", top: "30px", left: "20px" }}>
        {visibleWidgets.alerts && (
          <AlertWidgetComponent
            visibleAlerts={visibleWidgets.alerts}
            OnClose={() => onWidgetToggle('alerts', false)}
          />
        )}
      </div>

       {/* Widget Selector for toggling widgets */}
       {/* <div style={{position: "absolute", top: "0px", right:"10px"}} >
        <WidgetSelector onWidgetToggle={handleWidgetToggle} />
       </div> */}
    </div>
  );
};

export default MonitorScreen;