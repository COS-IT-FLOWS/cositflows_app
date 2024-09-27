import React from "react";
import Map from '../Maps/ImpactMap';

const ImpactScreen: React.FC = () => {
  return (
    <div className="monitor-screen w-full h-full relative flex flex-col rounded-[15px] overflow-hidden">
      <div className="flex justify-start items-start gap-1 relative left-[10px] w-full">
        <div className="w-[450px] mt-[10px] h-[400px] rounded-[10px] overflow-hidden">
          <Map/>
        </div>
        <div className="bg-zinc-800 w-[250px] max-w-[250px] mt-[10px] rounded-[10px] text-base text-white font-inter p-4 h-[200px]">
          Population
        </div>
        <div className="bg-zinc-800 w-[250px] max-w-[250px] mt-[10px] rounded-[10px] text-base text-white font-inter p-4 h-[200px]">
          Terrain
        </div>
        {/* <div className="bg-gray-100 p-4 ">Transportation</div> */}
      </div>
    </div>
  );
};

export default ImpactScreen;
