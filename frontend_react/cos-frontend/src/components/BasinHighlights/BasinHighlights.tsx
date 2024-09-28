import React, { useState } from "react";
import HighlightCard, { HighlightCardProps } from "./HighlightCard";
import CloseIcon from "@mui/icons-material/Close";

interface BasinHighlightsProps {
  highlights: HighlightCardProps[];
}

const BasinHighlights: React.FC<BasinHighlightsProps> = ({ highlights}) => {
  const [isVisible, setIsVisible] = useState(true); 
  
  if (!isVisible) return null;
  
  return (
    <section className="flex flex-col mr-[20px] rounded-3xl w-[180px] max-w-[180px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col px-3 py-3 w-full rounded-3xl bg-stone-900 bg-opacity-80">
        <header className="flex self-start text-base gap-6 font-semibold items-center justify-between leading-none text-white">
          <h2 className="text-base m-1 whitespace-nowrap ">Basin highlights</h2> 
          <CloseIcon
                  className = "text-white cursor-pointer"
                  style = {{ width: '20px', height: '20px' }}
                  onClick = {() => setIsVisible(false)}
              />
        </header>
        {highlights.map((highlight, index) => (
          <HighlightCard key={index} {...highlight} />
        ))}
      </div>
    </section>
  );
};

export default BasinHighlights;
