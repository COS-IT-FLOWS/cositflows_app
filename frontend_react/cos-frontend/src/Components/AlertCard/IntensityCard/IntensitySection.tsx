import React from "react";
import IntensityCardList from "./IntensityCardList";

const intensityData = [
  {
    intensity: "High intensity",
  },
];

const IntensitySection: React.FC = () => {
  return (
    <main>
      <IntensityCardList intensities={intensityData} />
    </main>
  );
};

export default IntensitySection;
