import React from "react";
import Location from "@mui/icons-material/LocationOn";

const LocationSelector: React.FC = () => {
  return (
    <button className="flex gap-1 px-3 py-2 items-center text-white bg-teal-100 bg-opacity-80 rounded-[1000px]">
      <span className="font-inter basis-auto">Thrissur</span>
      <Location sx={{width: 20, height: 20}}/>
    </button>
  );
};

export default LocationSelector;
