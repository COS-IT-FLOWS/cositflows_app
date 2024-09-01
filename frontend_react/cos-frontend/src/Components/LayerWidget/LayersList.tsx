import React from "react";
import LayerItem from "./LayerItem";
import Checkbox from "@mui/icons-material/CheckBox";

const layersData = [
  { label: "Rainfall gauges"},
  { label: "Reservoir/Dam level"},
  { label: "Groundwater level" },
  { label: "River water level"},
  { label: "Tidal level"},
  { label: "Regulators"  },
];

const LayersList: React.FC = () => (
  <div className="flex flex-col items-start w-full leading-6">
    {layersData.map((layer, index) => (
      <LayerItem key={index} label={layer.label} />
    ))}
  </div>
);

export default LayersList;
