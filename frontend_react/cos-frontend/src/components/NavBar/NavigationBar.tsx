import React from "react";
import WidgetSelector from "./WidgetSelector";
import LocationSelector from "./LocationSelector";
import Avatar from "@mui/material/Avatar";

interface NavigationBarProps {
  menuItems: string[];
  activeControl: string;
  activeView: string;
  setActiveControl: (control: string) => void;
  setActiveView: (view: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  menuItems,
  activeControl,
  activeView,
  setActiveControl,
  setActiveView,
 }) => {
  return (
    <header className="flex items-center py-4 w-full ">

      <nav className="flex flex-grow ml-[473px] relative">
        <ul className="flex gap-7 items-center mt-2.5 list-none p-0 mb-2">
          {menuItems.map((item, index) => (  
            <li key={index} className="relative">
              <button
               className={`text-white text-base font-medium bg-transparent w-full block text-center relative z-10 ${ activeControl === item ? "font-bold" : ""}`}
               onClick={()=> setActiveControl(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2 items-center justify-end">
        {activeControl === "Monitor" && activeView === "Visualization" && (
            <WidgetSelector 
              onWidgetToggle={()=>{}}
            />
        )}
        <LocationSelector />
        <Avatar 
          sx={{bgcolor: "#00738C",width: 35, height:35}} 
          alt="John Doe" 
          src="/broken-image.jpg"
        />
      </div>
    </header>
  );
};

export default NavigationBar;
