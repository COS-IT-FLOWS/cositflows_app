import React from "react";
import meter from "./Meter Scale.svg";

interface IntensityCardProps {
  intensity: string;
  size?: "small" | "large";
}

const IntensityCard: React.FC<IntensityCardProps> = ({ intensity, size= "small" }) => {
  const width = size === "large" ? "w-[98px]" : "w-[65px]";
  const height = size === "large" ? "h-[70px]" : "h-[51px]";
  
  return (
    <article className="flex flex-grow flex-col items-center text-xs font-semibold leading-none text-center rounded-none ${width} ${height} text-neutral-600">
      <div className="flex flex-col items-center px-1 py-2 bg-white rounded-xl w-full h-full">
        <img
          src={meter}
          alt={`${intensity} intensity`}
          className="object-contain w-full h-full"
        />
        <p className="text-[5px] mt-1">{intensity}</p>
      </div>
    </article>
  );
};

export default IntensityCard;