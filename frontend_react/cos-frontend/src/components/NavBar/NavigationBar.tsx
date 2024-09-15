import React from "react";
import WidgetSelector from "./WidgetSelector";
import LocationSelector from "./LocationSelector";
import Avatar from "@mui/material/Avatar";
import { teal } from "@mui/material/colors";

interface NavigationBarProps {
  menuItems: string[];
  setVisibleAlerts: (visible: boolean) => void;
  setVisibleLayers: (visible: boolean) => void;
  setVisibleLegend: (visible: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  menuItems,
  setVisibleAlerts,
  setVisibleLayers,
  setVisibleLegend,
 }) => {
  return (
    <header className="flex items-center py-4 w-full bg-darkslategray">

      <nav className="flex flex-grow ml-[473px] relative">
        <ul className="flex gap-7 items-center mt-2.5 list-none p-0 mb-2">
          {menuItems.map((item, index) => (  
            <li key={index} className="relative">
              {index === 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-100 h-[35px] rounded-[1000px] shadow-[1px_2px_4px_rgba(0,0,0,0.1)] w-[100px]">
                </div>
              )}
              <a href={`${item.toLowerCase()}`} className=" text-white font-inter w-full block text-center no-underline relative z-10">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2 items-center justify-end">
        <WidgetSelector 
          setVisibleAlerts={setVisibleAlerts}
          setVisibleLayers={setVisibleLayers}
          setVisibleLegend={setVisibleLegend}
         />
        <LocationSelector />
        <Avatar 
          sx={{bgcolor: "#00738C",width: 35, height:35}} 
          alt="Devika Sivakumar" 
          src="/broken-image.jpg"
        />
      </div>
    </header>
  );
};

export default NavigationBar;
