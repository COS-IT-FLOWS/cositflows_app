import React from "react";

interface GaugeSectionProps {
  title: string;
  colors: string[];
  values: string[];
  unit: string;
}

const GaugeSection: React.FC<GaugeSectionProps> = ({
  title,
  colors,
  values,
  unit,
}) => {
  return (
    <>
      <h3 className="mt-3 text-xs font-medium leading-none">{title}</h3>
      <div className="flex gap-1 items-start self-stretch  whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {colors.map((color,index)=>
            <div
              key={index}
              className="w-[29px] h-[8px]"
              style={{ backgroundColor: color }}
              />
            )}
            </div>
          <div className="flex text-2xs gap-3 py-0.5 max-w-full rounded-none w-[146px]">
            {values.map((value, index) => (
              <div key={index}>{value}</div>
            ))}
          </div>
        </div>
        <div className="py-0.5 text-2xs rounded-[2px] font-medium w-[23px] h-[10px] text-center bg-slate-800 bg-opacity-80"> 
          {unit}
        </div>
      </div>
    </>
  );
};

export default GaugeSection;
