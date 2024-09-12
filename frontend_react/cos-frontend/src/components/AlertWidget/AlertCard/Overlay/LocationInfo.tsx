import React from "react";
import Location from "@mui/icons-material/LocationOn";

interface LocationInfoProps {
  location: string;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ location }) => {
  return (
      <div className="flex flex-col px-2 py-3.5 mt-1.5 w-[98px] bg-white rounded-3xs">
        <div className="flex items-center self-start leading-none whitespace-nowrap">
          <Location
           sx={{width: 12, height: 12}}
           />
          <div className="text-[10px] font-semibold">Location</div>
        </div>
        <div className="mt-1.5 text-[11px] font-semibold leading-3">{location}</div>
      </div>
  );
};

export default LocationInfo;
