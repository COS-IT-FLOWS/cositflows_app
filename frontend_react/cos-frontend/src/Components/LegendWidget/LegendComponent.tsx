import React from "react";
import LegendItem from "./LegendItem";
import Draggable from "react-draggable";
import min_close from "./min_close.png";

interface RainfallLegendProps {
  lastUpdated: string;
}

const rainfallData = [
  { label: "No Rainfall", color: "bg-zinc-300", range: "0mm" },
  { label: "Light Rainfall", color: "bg-stone-300", range: "0-15.5mm" },
  { label: "Moderate Rainfall", color: "bg-neutral-400", range: "15.5-64.5mm" },
  { label: "Heavy Rainfall", color: "bg-neutral-500", range: "64.5-115.5mm" },
  { label: "Very Heavy Rainfall", color: "bg-neutral-500", range: "115.5-204.5mm"},
  { label: "Extreme Rainfall", color: "bg-neutral-500", range: "> 204.5mm" },
];

const RainfallLegend: React.FC<RainfallLegendProps> = ({ lastUpdated }) => {
  return (
    <Draggable>
    <section className="flex flex-col max-w-[260px] pr-5 pl-5 py-5 w-full bg-darkslategray rounded-[30px] overflow-hidden">
        <div className="flex flex-row justify-between items-center">
          <h2 className="self-start text-base font-inter leading-none text-white">
              Legend
          </h2>
          <img
            loading="lazy"
            src={min_close}
            alt="close"
            className="object-contain aspect-[3.1] w-[31px]"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-2.5 w-full">
            <div className="flex flex-col grow shrink-0 self-start basis-0 w-full">
              <div className="flex text-sm justify-between font-inter leading-loose text-white">
                <div>Manual Rainfall Gauge</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eaa61937473d0cdcf99f1cc4f49285011d260c9f1c2604426cf64ac877898971?placeholderIfAbsent=true&apiKey=064c7d1bc1bd4d4dbf906d36b5699d98"
                  alt="minimize"
                  className="object-contain shrink-0 my-auto w-3"
                />
              </div>
              <div className="flex flex-1 text-xs font-inter px-2 py-0.5 text-center w-[171px] h-[20px] rounded-xl bg-silver-200 text-neutral-600">
                    last updated at {lastUpdated}
              </div>
              <div className="flex gap-2 mt-2.5">
                <div className="flex flex-col min-h-[150px]">
                  {rainfallData.map((item, index) => (
                    <LegendItem key={index} color={item.color}/>
                  ))}
                </div> 
                <div className="flex w-full justify-between">
                  <div className="flex flex-col justify-between text-xs font-inter leading-6 min-h-[152px] text-neutral-200">
                    {rainfallData.map((item, index) => (
                      <div key={index} className={index > 0 ? "mt-1" : ""}>
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-start text-xs font-inter leading-6 text-neutral-200">
                    {rainfallData.map((item, index) => (
                      <div key={index} className={index > 0 ? "mt-1" : ""}>
                        {item.range}
                      </div>
                    ))}
                  </div>
                </div>  
              </div>
            </div>
          </div>
        </div>
    </section>
  </Draggable>
  );
};

export default RainfallLegend;
