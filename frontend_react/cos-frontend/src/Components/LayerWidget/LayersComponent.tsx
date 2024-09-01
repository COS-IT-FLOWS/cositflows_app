import React, { useState } from "react";
import LayersList from "./LayersList";
import Minimize from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";

const LayersComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Manual" | "Real Time">("Manual");

  return (
    <section className="flex flex-col text-white font-inter rounded-3xl w-[200px] max-w-[200px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col pb-4 w-full rounded-3xl bg-neutral-900 bg-opacity-80">
        <header className="flex flex-col items-start pt-3.5 w-full rounded-[22px_22px_1px_1px] bg-zinc-800 bg-opacity-80 shadow-[0px_2px_5px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between self-stretch text-base leading-none">
            <div className="pl-5 self-stretch my-auto">
              Layers
            </div>
              <div className="flex pr-4 items-center gap-1">
              <Minimize
              className=" text-white cursor-pointer" 
              style={{ transform: 'translateY(-6px)', width:'20px', height:'20px' }}
              onClick={()=> console.log("Minimize clicked")}
              />
              <CloseIcon 
              className="text-white cursor-pointer" 
              style={{ width:'20px', height:'20px'}}
              onClick={() => console.log("Close button clicked")}/>
            </div>
          </div>
          <nav className="relative flex pl-4 mt-2 mb-1 text-xs leading-loose text-center">
            <button className={`font-inter bg-transparent ${activeTab === "Manual" ? "text-white" : "text-silver-100"}`}
              onClick={() => setActiveTab("Manual")}
            >
              Manual
            </button>
            <button className={`font-inter bg-transparent ${activeTab === "Real Time" ? "text-white" : "text-silver-100"}`}
              onClick={() => setActiveTab("Real Time")}
            >
              Real time
            </button>
            <div
            className={`absolute h-0.5  bg-stone-300 rounded-[100px_100px_0px_0px] transition-all duration-300 ease-in-out ${
              activeTab === "Manual" ? "left-[22px] w-[46px]" : "left-[79px] w-[60px]"
            }`} 
            style ={{ bottom: "-4px" }}
            />
          </nav>
          
        </header>
        <div className="flex flex-col px-5 items-start mt-2 text-xs">
          <LayersList />
          {activeTab === "Manual" && (
          <div className="flex flex-col items-start mt-1 w-full">
                <div className="leading-5">IMD Grid Data</div>
                <div className="leading-5">Satellite Data</div>
              </div>
          )}
          {activeTab === "Real Time" && (
            <div className="flex flex-col items-start mt-1 w-full">
              <div className="leading-5">Satellite Data</div>
            </div>
          )}
          </div>
        </div>
    </section>
  );
};

export default LayersComponent;
