import React from 'react';
import Map from "@mui/icons-material/Map";
import Dashboard from "@mui/icons-material/Dashboard";
import About from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";

const icons = [
  { object: Map, string: "Visualization", view: "Visualization"},
  { object: Dashboard, string: "Analytics", view: "Analytics" },
  { object: About, string: "About", view: "About" },
  { object: Settings, string: "Settings", view: "Settings" },
];

interface MenuListProps {
  setActiveView: (view: string) => void;
}

const MenuList: React.FC<MenuListProps> = ({setActiveView}) => {
  return(
  <div className={`flex flex-col justify-center w-[88px] h-screen` }>
    <div className="flex flex-grow flex-col mb-[100px] items-center justify-center w-full">
      <div className="flex flex-col items-center gap-6">
        {icons.map((icon, index) => (
          <button 
          type='button' 
          key={index} 
          onClick={() => setActiveView(icon.view) }
          className="flex flex-col items-center gap-2 text-white bg-transparent"
          >
            <div className="flex items-center justify-center bg-transparent gap-3 no-underline" > 
              <icon.object 
               className="bg-teal-300 px-2 py-2 rounded-full"
               sx={{width: 25,height: 25, color: 'white'}}
              />
            </div>
            <span className="text-[12px] text-white font-inter">
                {icon.string}
              </span> 
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MenuList;