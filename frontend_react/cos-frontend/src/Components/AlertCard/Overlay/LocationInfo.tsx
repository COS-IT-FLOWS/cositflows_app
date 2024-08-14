import React from "react";
import icon from "./location_icon.png";

interface LocationInfoProps {
  location: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ location }) => {
  return (
    <div className="flex flex-col">
      <img
        loading="lazy"
        src={icon}
        className="object-contain rounded-2xl aspect-[1.4] w-[98px]"
        alt="Location icon"
      />
      <div className="flex flex-col px-2 py-3.5 mt-1.5 w-full bg-white rounded-2xl">
        <div className="flex gap-0.5 self-start text-xs leading-none whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/284a70bcceaab43f4aaeec7d9dccf1436f31e444263e09a0093af871922a54e8?placeholderIfAbsent=true&apiKey=064c7d1bc1bd4d4dbf906d36b5699d98"
            className="object-contain shrink-0 aspect-[0.7] w-[7px]"
            alt=""
          />
          <div>Location</div>
        </div>
        <div className="mt-1.5 text-xs leading-3">{location}</div>
      </div>
    </div>
  );
};

export default LocationInfo;
