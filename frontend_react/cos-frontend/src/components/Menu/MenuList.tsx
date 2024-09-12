import React, {useState} from 'react';
import Map from "./MAP.png";
import Dashboard from "./Dashboard.png";
import About from "./About.png";
import Settings from "./Settings.png";

const icons = [
  { src: Map, alt: "Visualization" },
  { src: Dashboard, alt: "Analytics" },
  { src: About, alt: "About" },
  { src: Settings, alt: "Settings" },
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
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-start gap-10">
        {icons.map((icon, index) => (
          <div key={index} 
          className="flex items-center gap-2">
            <div className="flex items-center justify-center">  
              <img
                loading="lazy"
                src={icon.src}
                alt={icon.alt}
                className="object-contain w-10 h-10"
                />
              </div>
              {isExpanded && (
                <span className="text-[16px] font-inter">{icon.alt}</span>
              )}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default MenuList;