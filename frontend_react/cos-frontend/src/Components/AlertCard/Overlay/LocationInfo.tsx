import React from "react";
import icon from "./location_icon.png";
import warn from "./WarningSign.png";

interface LocationInfoProps {
  location: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ location }) => {
  return (
      <div className="flex flex-col px-2 py-3.5 mt-1.5 w-full bg-white rounded-2xl">
        <div className="flex gap-0.5 self-start leading-none whitespace-nowrap">
          <img
            loading="lazy"
            src={icon}
            className="object-contain shrink-0 aspect-[0.7] w-[7px]"
            alt=""
          />
          <div className="text-[10px]">Location</div>
        </div>
        <div className="mt-1.5 text-[11px] leading-3">{location}</div>
      </div>
  );
};

export default LocationInfo;
