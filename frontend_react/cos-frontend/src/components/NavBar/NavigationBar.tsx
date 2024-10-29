import React, { useState } from "react";
import WidgetSelector from "./WidgetSelector";
import LocationSelector from "./LocationSelector";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  activeControl: string;
  setActiveControl: (view:string) => void;
  setActiveView: (view:string) => void;
  menuItems: string[];
  activeView: string;
  onWidgetToggle: (widget: "alerts" | "layers" | "legend", isVisible: boolean) => void;
  visibleWidgets: { alerts: boolean; layers: boolean; legend: boolean };
}

const NavigationBar: React.FC<NavigationBarProps> = ({ 
  activeControl,
  setActiveControl,
  setActiveView,
  menuItems,
  activeView,
  onWidgetToggle,
  visibleWidgets,
 }) => {
  //console.log(activeControl, activeView);
  //const [activeControl, setActiveControl] = useState('monitor');

  return (
    <header className="flex items-center py-4 w-full ">

      <nav className="flex justify-center">
        <ul className="flex gap-7 pl-[250px] items-center mt-2.5 list-none p-0 mb-2">
          {menuItems.map((item, index) => (  
            <li key={index} className="relative">
              <Link
               to={`/${item.toLowerCase()}-${'visualization'}`}
               className={` text-white no-underline font-inter bg-transparent w-full block text-center relative z-10 ${ activeControl.toLowerCase() === item.toLowerCase() ? "font-semibold text-[17px] text-teal-500" : "text-base"}`}
               onClick={()=> {
                // console.log(item);
                setActiveControl(item);
                setActiveView('visualization');
              }}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
          
      <div className="flex pr-[20px] gap-2 items-center justify-end">
        <div className="widget-selector-container" style={{ width: 100 }}>
          {activeControl.toLowerCase() === "monitor" && activeView.toLowerCase() === "visualization" && (
              <WidgetSelector 
                onWidgetToggle={onWidgetToggle}
                visibleWidgets={visibleWidgets}
              />
          )}
        </div>
        <LocationSelector />
        <Avatar 
          sx={{bgcolor: "#00738c", width: 35, height:35}} 
          alt="Apple Doe" 
          src="/broken-image.jpg"
        />
      </div>
    </header>
  );
};

export default NavigationBar;
