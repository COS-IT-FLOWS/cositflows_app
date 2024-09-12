import React, {useState} from 'react';
import Map from "@mui/icons-material/Map";
import Dashboard from "@mui/icons-material/Dashboard";
import About from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";

const icons = [
  { object: Map, string: "Visualization" },
  { object: Dashboard, string: "Analytics" },
  { object: About, string: "About" },
  { object: Settings, string: "Settings" },
];

const MenuList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return(
  <div
    className={`flex flex-col justify-center bg-darkslategray text-white ${
      isExpanded ? 'w-[263px] z-50 absolute' : 'w-[88px]'
     } h-screen transition-width duration-300 ease-in-out` }
    onMouseEnter={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
  >
    <div className="flex flex-grow flex-col mb-[100px] items-center justify-center w-full">
      <div className="flex flex-col items-start gap-6">
        {icons.map((icon, index) => (
          <div key={index} 
          className="flex items-center gap-2">
            <div className="flex items-center justify-center">  
              <icon.object 
               className="bg-teal-100 px-2 py-2 rounded-full"
               sx={{width: 30,height: 30}}
               />
              </div>
              {isExpanded && (
                <span className="text-[16px] font-inter">{icon.string}</span>
              )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MenuList;