import React from "react";

interface LegendItemProps {
  label: string;
  range: string;
}

const LegendItem: React.FC<LegendItemProps> = ({ label, range }) => {
  return (
    <div className="flex justify-between">
      <div>{label}</div>
      <div className="ml-1">{range}</div>
    </div>
  );
};

export default LegendItem;
