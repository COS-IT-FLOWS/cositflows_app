import React from "react";
import AlertHeader from "./AlertHeader";
import AlertDetails from "./AlertDetails";
import IntensityCard from "./IntensityCard/IntensityCard";

interface AlertCardProps {
  alertType: string;
  intensity: string;
  date: string;
  time: string;
  location: string;
  validUntil: string;
  issuedBy: string;
  onClick: ()=> void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  alertType,
  intensity,
  date,
  time,
  location,
  validUntil,
  issuedBy,
  onClick,
}) => {
  return (
      <article className="flex flex-col font-semibold max-w-[174px] h-[90px] rounded-2xl bg-neutral-300 p-2"
      onClick={onClick}
      >
        <div className="flex items-start">
          <div className="text-xs leading-loose text-neutral-700">
            <AlertHeader alertType={alertType} />
          </div>
        </div>

        <div className="flex gap-1.5 pl-1 space-x-1">
          <div className="flex-none">
              <IntensityCard intensity={intensity} />
            </div>
            <div className="flex flex-col justify-center">
              <AlertDetails
                date={date}
                time={time}
                location={location}
                validUntil={validUntil}
                issuedBy={issuedBy}
              />
            </div>
          </div> 
      </article>
  );
};

export default AlertCard;
