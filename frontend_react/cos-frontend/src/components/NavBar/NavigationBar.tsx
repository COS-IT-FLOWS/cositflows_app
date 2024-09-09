import React from "react";
import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";
import ProfileIcon from "./User.png";

interface NavigationBarProps {
  menuItems: string[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({ menuItems }) => {
  return (
    <header className="flex items-center py-4 w-full bg-darkslategray">

      <nav className="flex flex-grow ml-[473px] relative">
        <ul className="flex gap-7 items-center mt-2.5 list-none p-0 mb-2">
          {menuItems.map((item, index) => (  
            <li key={index} className="relative">
              {index === 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-400 h-[35px] rounded-[1000px] shadow-[1px_2px_4px_rgba(0,0,0,0.1)] w-[100px]">
                </div>
              )}
              <a href={`#${item.toLowerCase()}`} className=" text-white font-inter w-full block text-center no-underline relative z-10">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex gap-2 items-center justify-end">
        <SearchBar />
        <LocationSelector />
        <img
        loading="lazy"
        src={ProfileIcon}
        className="object-contain shrink-0 w-[38px]"
        alt="User"
        />
      </div>
    </header>
  );
};

export default NavigationBar;
