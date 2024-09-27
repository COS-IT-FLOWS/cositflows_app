import React from "react";
import CheckBoxBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBox from "@mui/icons-material/CheckBox";


type GaugeLabel = "rainfall" | "reservoir" | "tidal" | "groundwater" | "riverWater" | "regulators";
type GaugeType = "PRECIPITATION" | "RESERVOIR" | "TIDAL" | "GROUNDWATER" | "RIVER" | "REGULATOR";

interface LayerItemProps {
  label: GaugeLabel;
  param: GaugeType;
  isChecked: boolean;
  onToggle: () => void; 
}

const LayerItem: React.FC<LayerItemProps> = ({ label, isChecked, onToggle }) => (
  <div className="flex gap-1 items-center cursor-pointer" onClick={onToggle}>
    {isChecked ? (
      <CheckBox style={{ width:"18px", height: "18px"}} className="text-white" />
    ) : (
     <CheckBoxBlankIcon
     style={{width:"18px", height:"18px"}}
     className="text-white"/>
    )}
    <div className="self-stretch my-auto">{label}</div>
  </div>
);

export default LayerItem;