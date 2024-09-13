import React, {useState} from 'react';
import Map from "@mui/icons-material/Map";
import Dashboard from "@mui/icons-material/Dashboard";
import About from "@mui/icons-material/Info";
import Settings from "@mui/icons-material/Settings";

const icons = [
  { object: Map, string: "Visualization", url: '/'},
  { object: Dashboard, string: "Analytics", url: '/analytics' },
  { object: About, string: "About", url: '/about' },
  { object: Settings, string: "Settings", url: '/settings' },
];

const handleClick = () => {

}

const MenuList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return(
  <div
    className={`flex flex-col justify-center bg-darkslategray text-white ${
      isExpanded ? 'w-[263px] z-50 absolute' : 'w-[88px]'
     } h-screen transition-width duration-300 ease-in-out z-50` }
    onMouseEnter={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
  >
    <div className="flex flex-grow flex-col mb-[100px] items-center justify-center w-full">
      <div className="flex flex-col items-start gap-6">
        {icons.map((icon, index) => (
          <button type='button' key={index} 
          
          className="flex items-center gap-2 text-white bg-transparent">
            <a className="flex items-center justify-center bg-transparent gap-3 no-underline" href={`${icon.url}`}> 
              <icon.object 
               className="bg-teal-100 px-2 py-2 rounded-full"
               sx={{width: 30,height: 30, color: 'white'}}
              />
              {isExpanded && (
                <span className="text-[16px] text-white font-inter ">{icon.string}</span>
              )}
              </a>
          </button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MenuList;