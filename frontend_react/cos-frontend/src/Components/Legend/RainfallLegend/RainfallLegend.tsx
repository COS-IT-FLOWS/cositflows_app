import React from "react";
import LegendItem from "./LegendItem";
import { RainfallData } from "./types";

const rainfallData: RainfallData[] = [
  { label: "No Rainfall", range: "0mm", color: "bg-zinc-300" },
  { label: "Light Rainfall", range: "0-15.5mm", color: "bg-stone-300" },
  { label: "Moderate Rainfall", range: "15.5-64.5mm", color: "bg-neutral-400" },
  { label: "Heavy Rainfall", range: "64.5-115.5mm", color: "bg-neutral-500" },
  { label: "Very Heavy Rainfall", range: "115.5-204.5mm",color: "bg-neutral-500"},
  { label: "Extreme Rainfall", range: "> 204.5mm", color: "bg-neutral-500" },
];

const RainfallLegend: React.FC = () => {
  return (
    <section className="flex flex-col px-10 py-8 bg-stone-900 bg-opacity-80 max-w-[380px] rounded-[30px] ml-2 mt-2">
      <header className="flex gap-5 justify-between items-start font-semibold text-white">
        <div className="flex flex-col mt-1">
          <h2 className="text-base leading-6 capitalize">Legend</h2>
          <h3 className="mt-4 text-sm leading-5 capitalize">
            manual rainfall Gauge
          </h3>
          <p className="px-2 mt-2.5 text-xs leading-6 text-center rounded-xl bg-stone-300 text-neutral-600">
            last updated at 8.30am today
          </p>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/171a25e2644355f29cc1ad01d01fa78d0e9fc700e6f7cad2a8b0827185780fcb?apiKey=064c7d1bc1bd4d4dbf906d36b5699d98&&apiKey=064c7d1bc1bd4d4dbf906d36b5699d98"
          className="shrink-0 aspect-[3.13] w-[31px]"
          alt="Rain-gauge capacity icon"
        />
      </header>
      <div className="flex gap-5 justify-center pr-12 mt-2">
        <div className="flex flex-col">
          {rainfallData.map((item, index) => (
            <div
              key={index}
              className={`shrink-0 ${
                index > 0 ? "mt-1.5" : ""
              } w-5 h-5 rounded-full ${item.color}`}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between text-xs font-semibold leading-6 text-neutral-200">
          {rainfallData.map((item, index) => (
            <LegendItem key={index} label={item.label} range={item.range} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RainfallLegend;
