import React, {useState} from "react";
import GaugeSection from "./GaugeSection";
import CloseIcon from "@mui/icons-material/Close";
import Minimize from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import Draggable from "react-draggable";

interface LegendProps {
  visibleGauges: {
    PRECIPITATION: boolean;
    RESERVOIR: boolean;
    TIDAL: boolean;
    GROUNDWATER: boolean;
    RIVER: boolean;
    REGULATOR: boolean;
 };
 isVisible: boolean;
 toggleVisibility: () => void;
}


const Legend: React.FC<LegendProps> = ({visibleGauges, isVisible, toggleVisibility}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  if (!isVisible) return null;

  return (
    <Draggable>
    <section className={`flex flex-col text-white font-inter w-[200px] max-w-[200px] rounded-3xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}>
      <div className={`flex flex-col items-start px-4 ${isCollapsed ? "py-4 rounded-[18px] bg-opacity-90" : "py-6 rounded-3xl bg-opacity-80"} bg-zinc-900`}>
        <header className={`flex items-center text-base ${isCollapsed ? "gap-[90px]" : "gap-[0px]"} justify-between w-full leading-none`}>
          <h2 className={`self-stretch text-base my-auto font-semibold`}>Legend</h2>
          <div className="flex items-center gap-1"> 
          {isCollapsed ? (
                <AddIcon
                  className="text-white cursor-pointer"
                  style={{ width: '20px', height: '20px' }}
                  onClick={() => setIsCollapsed(false)}
                />
              ) : (
              <>
              <Minimize
                className=" text-white cursor-pointer"
                style={{ transform: 'translateY(-6px)', width: '20px', height: '20px' }}
                onClick={() => setIsCollapsed(true)}
              />
              <CloseIcon
                className="text-white cursor-pointer"
                style={{ width: '20px', height: '20px' }}
                onClick={toggleVisibility}
            />
          </>
          )}
          </div>
        </header>
        
        {!isCollapsed && (
          <>
          {visibleGauges.PRECIPITATION && (
            <GaugeSection
              title="Rainfall Gauges"
              colors={["#1A6668", "#3EA8A6", "#FFFFE0", "#DD8629", "#79260B"]}
              values={["0", "15.5", "64.5", "115.5", "204.5", "<"]}
              labels={["No Rainfall", "Light Rainfall", "Moderate Rainfall", "Heavy Rainfall", "Very Heavy Rainfall", "Extreme Rainfall"]}
              unit="mm"
            />
          )}

          {/* Render Reservoir section */}
          {visibleGauges.RESERVOIR && (
            <GaugeSection
              title="Reservoir/Dam Level"
              colors={["#2D718F", "#FEEAAE", "#FFC103", "#FF8200", "#FF0000"]}
              values={["0", "25", "50", "75", "90", "100"]}
              labels={["Very Low Level", "Low Level", "Moderate Level", "High Level", "Very High Level"]}
              unit="%"
            />
          )}

          {/* Render Tidal section */}
          {visibleGauges.TIDAL && (
            <GaugeSection
              title="Tidal Level"
              colors={["#004E98", "#3A6EA5", "#744F44", "#EBEBEB", "#FF6701"]}
              values={["0", "25", "50", "75", "90", "100"]}
              labels={["Very Low Level", "Low Level", "Moderate Level", "High Level", "Very High Level"]}
              unit="%"
            />
          )}

          {/* Render Groundwater section */}
          {visibleGauges.GROUNDWATER && (
            <GaugeSection
              title="Groundwater Level"
              colors={["#004E98", "#3A6EA5", "#744F44", "#EBEBEB", "#FF6701"]}
              values={["0", "25", "50", "75", "90", "100"]}
              labels={["Very Low", "Low", "Moderate", "High", "Very High"]}
              unit="%"
            />
          )}

          {/* Render River water level section */}
          {visibleGauges.RIVER && (
            <GaugeSection
              title="River Water Level"
              colors={["#004E98", "#3A6EA5", "#744F44", "#EBEBEB", "#FF6701"]}
              values={["0", "25", "50", "75", "90", "100"]}
              labels={["Very Low", "Low", "Moderate", "High", "Very High"]}
              unit="%"
            />
          )}

          {/* Render Regulators section */}
          {visibleGauges.REGULATOR && (
            <GaugeSection
              title="Regulators"
              colors={["#004E98", "#3A6EA5", "#744F44", "#EBEBEB", "#FF6701"]}
              values={["0", "25", "50", "75", "90", "100"]}
              labels={["Very Low", "Low", "Moderate", "High", "Very High"]}
              unit="%"
            />
          )}
        </>
        )}
      </div>
    </section>
  </Draggable>
  );
};

export default Legend;
