import React from 'react';
import NavComponent from './MenuComponent';
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

const MenuList: React.FC = () => (
  <div className="bg-stone-900 h-full w-[88px] absolute left-0 top-0"> 
    <section className="flex flex-col items-center justify-center pt-[160px]">
      {icons.map((icon, index) => (
        <NavComponent key={index} src={icon.src} alt={icon.alt} />
      ))}
    </section>
  </div>
);

export default MenuList;