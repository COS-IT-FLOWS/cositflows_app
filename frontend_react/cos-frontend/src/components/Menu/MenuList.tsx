import React, { useState } from 'react';
import Map from "@mui/icons-material/Map";
import Dashboard from "@mui/icons-material/Dashboard";
import About from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";
import { Link } from 'react-router-dom';

const icons = [
  { object: Map, string: "Visualization", view: "visualization"},
  { object: Dashboard, string: "Analytics", view: "analytics" },
  { object: About, string: "About", view: "about" },
  { object: Settings, string: "Settings", view: "settings" },
];

interface MenuListProps {
  activeControl: string;
  activeView: string;
  setActiveView: (view: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({activeControl, activeView, setActiveView}) => {
  return(
  <div className={`flex flex-col justify-center w-[88px] h-screen` }>
    <div className="flex flex-grow flex-col mb-[100px] items-center justify-center w-full">
      <ul className="flex flex-col items-center pr-[35px] gap-6" style={{ listStyle: 'none' }}>
        {icons.map((icon, index) => (
          <li key={index} className="relative">
          <Link
          to={icon.view === "about" || icon.view === "settings" 
          ? `/${icon.view}` 
          : `/${activeControl.toLowerCase()}-${icon.view}`}
          className="flex flex-col items-center gap-2 text-white bg-transparent"
          style={{ textDecoration: 'none' }}
          onClick={() => {
            setActiveView(icon.view);
          }}
          >
            <div className="flex items-center justify-center bg-transparent gap-3 no-underline" > 
              <icon.object 
               className={`${icon.view === activeView? "bg-argentina-300" : "bg-black bg-opacity-80 text-opacity-60"}  text-white px-2 py-2 rounded-full`}
               style={{border: '0.5px solid rgba(97, 179, 255, 0.5)'}}
               sx={{width: 25,height: 25}}
              />
            </div>
            <span 
            className={` text-white font-inter bg-transparent ${ activeView.toLowerCase() === icon.string.toLowerCase() ? "text-[11px]" : "text-3xs text-opacity-60"}`}
            >
                {icon.string}
            </span> 
          </Link>
        </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default MenuList;