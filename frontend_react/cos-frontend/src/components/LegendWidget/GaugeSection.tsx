import React from "react";

interface GaugeSectionProps {
  title: string;
  colors: string[];
  values: string[];
  labels: string[];
  unit: string;
}

const GaugeSection: React.FC<GaugeSectionProps> = ({
  title,
  colors,
  values,
  labels,
  unit,
}) => {
  const colorBarWidth = 146;
  const colorSegmentWidth = colorBarWidth/ colors.length;

  return (
    <>
      <h3 className="mt-3 text-xs font-medium leading-none">{title}</h3>
      <div className="flex gap-1 self-stretch  whitespace-nowrap">
        <div className="flex flex-col items-start">
          <div className="flex flex-row">
            {colors.map((color,index) => (
            <div key={index} className="relative group">
            {/* Color Segment */}
              <div
                className="w-[29px] h-[8px]"
                style={{ backgroundColor: color }}
              />
              {/* Tooltip Label */}
              <div 
                className="absolute bottom-[110%] left-1/2 -translate-x-1/2 text-white text-[5px] bg-black bg-opacity-75 px-2 py-0.5 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ whiteSpace: "nowrap" }}
              >
                 {labels[index]}
              </div>
            </div>
            ))}
          </div>

          {/* Scale Values */}
          <div className="flex text-2xs text-zinc-200 gap-3 py-0.5 max-w-full rounded-none"
               style={{ width: colorBarWidth}}
               >
            {values.map((value, index) => (
              <div 
              key={index}
              style={{
                position: "absolute",
                left: index * colorSegmentWidth + colorSegmentWidth/2,
                transform: "translateX(-50%)",
              }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
          <div className="flex mb-2 justify-center text-2xs rounded-[2px] font-medium w-[30px] h-[10px] text-center bg-slate-800 bg-opacity-80"> 
            {unit}
          </div>
      </div>
    </>
  );
};

export default GaugeSection;
