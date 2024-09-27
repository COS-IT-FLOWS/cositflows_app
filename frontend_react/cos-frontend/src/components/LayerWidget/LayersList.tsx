import React, { useState } from "react";
import LayerItem from "./LayerItem";

type GaugeLabel = "rainfall" | "reservoir" | "tidal" | "groundwater" | "riverWater" | "regulators";
type GaugeType = "PRECIPITATION" | "RESERVOIR" | "TIDAL" | "GROUNDWATER" | "RIVER" | "REGULATOR";

const layersData: { label: GaugeLabel, param: GaugeType }[] = [
  { label: "rainfall", param: 'PRECIPITATION' },
  { label: "reservoir", param: "RESERVOIR" },
  { label: "groundwater", param: "GROUNDWATER" },
  { label: "riverWater", param: "RIVER" },
  { label: "tidal", param: "TIDAL" },
  { label: "regulators", param: "REGULATOR" },
];

interface LayersListProps {
  toggleGauge: (gauge: GaugeType) => void;
}


const LayersList: React.FC<LayersListProps> = ({ toggleGauge }) => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(layersData.length).fill(false));

  const handleToggle = (index: number) => {
    setCheckedItems(prevState => {
      const newCheckedItems = [...prevState];
      newCheckedItems[index] = !newCheckedItems[index];
      toggleGauge(layersData[index].param);
      return newCheckedItems;
    });
  };

  return (
    <div className="flex flex-col items-start w-full leading-6">
      {layersData.map((layer, index) => (
        <LayerItem
          key={index}
          label={layer.label}
          param={layer.param}
          isChecked={checkedItems[index]}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default LayersList;