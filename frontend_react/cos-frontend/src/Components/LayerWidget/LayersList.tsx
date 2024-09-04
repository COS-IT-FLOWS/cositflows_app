import React, { useState } from "react";
import LayerItem from "./LayerItem";

const layersData = [
  { label: "Rainfall gauges"},
  { label: "Reservoir/Dam level"},
  { label: "Groundwater level" },
  { label: "River water level"},
  { label: "Tidal level"},
  { label: "Regulators"  },
];

const LayersList: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(layersData.length).fill(false));

  const handleToggle = (index: number) => {
    setCheckedItems(prevState => {
      const newCheckedItems = [...prevState];
      newCheckedItems[index] = !newCheckedItems[index];
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
