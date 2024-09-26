import React from "react";
import Map from '../Maps/ImpactMap';

const ImpactScreen: React.FC = () => {
  return (
    <div className="monitor-screen w-full bg-gray-100 mx-auto relative flex flex-col">
      <div className="grid grid-cols-3 relative left-20 w-full h-screen">
        <div className="p-4 h-1/2 overflow-hidden">
          <Map/>
        </div>
        <div className="bg-gray-200 p-4 h-1/2">Population</div>
        <div className="bg-gray-100 p-4 h-1/2">Terrain</div>
        <div className="bg-gray-100 p-4">Transportation</div>
      </div>
    </div>
  );
};

export default ImpactScreen;
