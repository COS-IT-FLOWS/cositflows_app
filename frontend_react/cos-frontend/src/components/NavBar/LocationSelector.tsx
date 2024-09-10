
import React from "react";
import location_icon from "./location_icon_2.png";

const LocationSelector: React.FC = () => {
  return (
    <button className="flex gap-3 px-4 py-2.5 items-center text-white bg-neutral-400 rounded-[1000px]">
      <span className="font-inter basis-auto">Chalakudy, Thrissur</span>
      <img
        loading="lazy"
        src={location_icon}
        className="object-contain shrink-0 w-3 aspect-[0.67]"
        alt=""
      />
    </button>
  );
};

export default LocationSelector;
