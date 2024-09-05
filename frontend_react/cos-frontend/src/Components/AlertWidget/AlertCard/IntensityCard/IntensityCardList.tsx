import React from "react";
import IntensityCard from "./IntensityCard";

interface IntensityData {
  intensity: string;
}

interface IntensityCardListProps {
  intensities: IntensityData[];
}

const IntensityCardList: React.FC<IntensityCardListProps> = ({
  intensities,
}) => {
  return (
    <section className="flex flex-wrap gap-2">
      {intensities.map((intensity, index) => (
        <IntensityCard
          key={index}
          intensity={intensity.intensity}
        />
      ))}
    </section>
  );
};

export default IntensityCardList;
