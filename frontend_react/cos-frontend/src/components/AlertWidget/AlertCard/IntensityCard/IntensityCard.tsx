import React from "react";
import meter from "./Meter Scale.svg";

interface IntensityCardProps {
  intensity: string;
  size?: "small" | "large";
}

const IntensityCard: React.FC<IntensityCardProps> = ({ intensity, size= "small" }) => {
  const widthClass = size === "large" ? "w-[106px]" : "w-[65px]";
  const heightClass = size === "large" ? "h-[75px]" : "h-full";
  
  return (
    <article className={`flex flex-col items-center font-inter leading-none text-center ${widthClass} ${heightClass} text-neutral-600`}>
      <div className={`flex flex-col items-center px-1 py-2 bg-white rounded-4xs ${widthClass} ${heightClass}`}>
        <img
          src={meter}
          alt={`${intensity}`}
          className="object-contain w-full h-auto"
        />
        <p className="text-[7px] font-semibold mt-1">{intensity}</p>
      </div>
    </article>
  );
};

export default IntensityCard;