import React from "react";

interface LegendItemProps {
  color: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ color }) => {
  return (
    <div className={`flex mt-1.5 w-5 h-5 rounded-full ${color} min-h-[20px]`} />
  );
};

export default LegendItem;
