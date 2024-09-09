import React, { useState } from "react";
import LayerItem from "./LayerItem";

type GaugeType = "rainfall" | "reservoir" | "tidal" | "groundwater" | "riverWater" | "regulators";

const layersData: { label: GaugeType} []= [
  { label: "rainfall"},
  { label: "reservoir"},
  { label: "groundwater" },
  { label: "riverWater"},
  { label: "tidal"},
  { label: "regulators"  },
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
      toggleGauge(layersData[index].label);
      return newCheckedItems;
    });
  };

   return (
  <div className="flex flex-col items-start w-full leading-6">
    {layersData.map((layer, index) => (
      <LayerItem 
        key={index}
        label={layer.label}
        isChecked={checkedItems[index]}
        onToggle={() => handleToggle(index)}
        />
    ))}
  </div>
  );
};

export default LayersList;
