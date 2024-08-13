import React from "react";
import meter from "./Meter Scale.svg";

interface IntensityCardProps {
  intensity: string;
}

const IntensityCard: React.FC<IntensityCardProps> = ({
  intensity
}) => {
  return (
    <article className="flex flex-col items-center text-xs font-semibold leading-none text-center rounded-none max-w-[65px] text-neutral-600">
      <div className="flex flex-col items-center px-1 py-2 bg-white rounded-lg">
        <img
          src={meter}
          alt={`${intensity} intensity`}
          className="object-contain w-full"
        />
        <p className="text-[5px] mt-1">{intensity}</p>
      </div>
    </article>
  );
};

export default IntensityCard;