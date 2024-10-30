import React, { useState } from "react";
import HighlightComponent from "../BasinHighlights/HighlightComponent";
import ButtonComponent from "../LevelNav/ImpactButtons";
import ImpactMapComponent from "../Maps/ImpactMapComponent";
import { addBoundaryLayer, removeBoundaryLayer } from "../Layers/PolygonLayer";


// Define the allowed types for selectedMap

type SelectedMapType = "flood-inundation" | "population" | "households" | "agriculture";

const ImpactScreen: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<SelectedMapType>('flood-inundation');
  
  return (
    <div className="monitor-screen w-full h-full relative bg-white flex flex-col rounded-[15px] overflow-hidden">
      <div className="absolute w-full h-full rounded-[15px] overflow-hidden">
        <ImpactMapComponent
          selectedMap = {selectedMap}
        />
      </div>

      <div style={{ position: "absolute", top: "0px", left: "0px" }}>
        <ButtonComponent setSelectedMap={setSelectedMap}/>
      </div>

      <div className="absolute font-inter top-0 right-0 mt-[10px] mr-[20px] flex flex-col items-end">
        <HighlightComponent/>
      </div>
    </div>
  );
};

export default ImpactScreen;
