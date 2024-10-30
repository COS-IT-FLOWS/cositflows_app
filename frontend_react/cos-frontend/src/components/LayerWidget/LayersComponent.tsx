import React, { useState } from "react";
import Minimize from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import Checkicon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Draggable from "react-draggable";

type GaugeType = "PRECIPITATION" | "RESERVOIR" | "TIDAL" | "GROUNDWATER" | "RIVER" | "REGULATOR";

interface LayersProps {
  visibleGauges: {
    PRECIPITATION: boolean;
    RESERVOIR: boolean;
    TIDAL: boolean;
    GROUNDWATER: boolean;
    RIVER: boolean;
    REGULATOR: boolean;
  };
  toggleGauge: (gauge: GaugeType) => void;
  onClose: () => void;
}

const LayersComponent: React.FC<LayersProps> = ({ visibleGauges, toggleGauge, onClose }) => {
  const [activeTab, setActiveTab] = useState<"Manual" | "Real Time">("Manual");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  
  return (
    <Draggable>
    <section className={`flex flex-col text-white font-inter rounded-3xl w-[200px] max-w-[200px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}>
      <div className={`flex flex-col w-full pb-4 ${isCollapsed ? "rounded-[18px] bg-opacity-90" : "rounded-3xl bg-opacity-80"} bg-zinc-900`}>
        <header className={`flex flex-col pt-3.5 w-full ${isCollapsed ? "bg-transparent" : "rounded-[22px_22px_1px_1px] bg-zinc-800 bg-opacity-80 shadow-[0px_2px_5px_rgba(0,0,0,0.1)]"}`}>
          <div className="flex items-center justify-between">
            <div className="pl-5 text-base font-semibold leading-none">
              Layers
            </div>
            <div className="flex pr-4 items-center gap-1">
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
                    onClick = {onClose}
                  />
                </>
              )}
            </div>
          </div>
          {!isCollapsed && (
            <nav className="relative flex pl-4 mt-2 mb-1 text-xs leading-loose text-center justify-start">
              <button className={`font-inter bg-transparent ${activeTab === "Manual" ? "text-white" : "text-silver-100"}`}
                onClick={() => setActiveTab("Manual")}
              >
                Manual
              </button>
              <button className={`font-inter bg-transparent ${activeTab === "Real Time" ? "text-white" : "text-silver-100"}`}
                onClick={() => setActiveTab("Real Time")}
              >
                Real time
              </button>
              <div
                className={`absolute h-0.5 bg-stone-300 rounded-[100px_100px_0px_0px] transition-all duration-300 ease-in-out ${activeTab === "Manual" ? "left-[22px] w-[46px]" : "left-[79px] w-[60px]"}`}
                style={{ bottom: "-4px" }}
              />
            </nav>
          )}
        </header>
        {!isCollapsed && (
          <>
            <div className="flex flex-col px-5 gap-1 items-start mt-2 text-xs">
              <div className="flex items-center">
                <Checkbox
                 checked={visibleGauges.PRECIPITATION}
                 onChange={() => toggleGauge("PRECIPITATION")}
                 icon={<CheckBoxOutlineBlankIcon  sx={{ color: "#9f9c9c", width: 14, height: 14}}/>}
                 checkedIcon={<Checkicon sx={{color: "#9f9c9c", width: 14, height: 14}}/>}
                 sx={{
                  color: "#9f9c9c",
                  width: 14,
                  height: 14,
                  '&.Mui-checked': {
                    color: "#9f9c9c",
                  },
                 }}
                />
                <label>Rainfall gauges</label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={visibleGauges.RESERVOIR}
                  onChange={() => toggleGauge("RESERVOIR")}
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: "#9f9c9c",width: 14, height: 14 }} />}
                  checkedIcon={<Checkicon sx={{ color: "#9f9c9c", width: 14, height: 14 }} />}
                  sx={{
                    color: "#9f9c9c",
                    width: 14,
                    height: 14,
                    '&.Mui-checked': {
                      color: "#9f9c9c",
                    },
                  }}
                />
                <label>Reservoir/Dam level</label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={visibleGauges.TIDAL}
                  onChange={() => toggleGauge("TIDAL")}
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: "#9f9c9c", width: 14, height:14 }} />}
                  checkedIcon={<Checkicon sx={{ color: "#9f9c9c", width: 14, height: 14 }} />}
                  sx={{
                    color: "#9f9c9c",
                    width: 14,
                    height: 14,
                    '&.Mui-checked': {
                      color: "#9f9c9c",
                    },
                  }}
                />
                <label>Tidal level</label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={visibleGauges.GROUNDWATER}
                  onChange={() => toggleGauge("GROUNDWATER")}
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: "#9f9c9c", width: 14, height:14 }} />}
                  checkedIcon={<Checkicon sx={{ color: "#9f9c9c", width: 14, height:14  }} />}
                  sx={{
                    color: "#9f9c9c",
                    width: 14,
                    height: 14,
                    '&.Mui-checked': {
                      color: "#9f9c9c",
                    },
                  }}
                />
                <label>Groundwater level</label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={visibleGauges.RIVER}
                  onChange={() => toggleGauge("RIVER")}
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: "#9f9c9c", width: 14, height:14 }} />}
                  checkedIcon={<Checkicon sx={{ color: "#9f9c9c", width: 14, height:14  }} />}
                  sx={{
                    color: "#9f9c9c",
                    width: 14,
                    height: 14,
                    '&.Mui-checked': {
                      color: "#9f9c9c",
                    },
                  }}
                />
                <label>River water level</label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  checked={visibleGauges.REGULATOR}
                  onChange={() => toggleGauge("REGULATOR")}
                  icon={<CheckBoxOutlineBlankIcon sx={{ color: "#9f9c9c" , width: 14, height:14 }} />}
                  checkedIcon={<Checkicon sx={{ color: "#9f9c9c", width: 14, height:14  }} />}
                  sx={{
                    color: "#9f9c9c",
                    width: 14,
                    height: 14,
                    '&.Mui-checked': {
                      color: "#9f9c9c",
                    },
                  }}
                />
                <label>Regulators</label>
              </div>
              {activeTab === "Manual" && (
                <div className="flex flex-col items-start mt-1 w-full">
                  <div className="leading-5">IMD Grid Data</div>
                  <div className="leading-5">Satellite Data</div>
                </div>
              )}
              {activeTab === "Real Time" && (
                <div className="flex flex-col items-start mt-1 w-full">
                  <div className="leading-5">Satellite Data</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  </Draggable>
  );
};

export default LayersComponent;