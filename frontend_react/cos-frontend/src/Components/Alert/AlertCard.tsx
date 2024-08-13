import React from "react";
import AlertHeader from "./AlertHeader";
import AlertDetails from "./AlertDetails";
import IntensityCard from "./IntensityCard/IntensityCard";
import Draggable from "react-draggable"

interface AlertCardProps {
  alertType: string;
  intensity: string;
  date: string;
  time: string;
  location: string;
  validUntil: string;
  issuedBy: string;
}

const AlertCard: React.FC<AlertCardProps> = ({
  alertType,
  intensity,
  date,
  time,
  location,
  validUntil,
  issuedBy,
}) => {
  return (
    <Draggable>
      <article className="flex flex-col font-semibold max-w-[174px] h-[90px] rounded-2xl bg-stone-300 p-2"
       style={{position: "absolute"}}
      >
        <div className="flex items-start">
          <div className="text-xs leading-loose text-neutral-700">
            <AlertHeader alertType={alertType} />
          </div>
        </div>

        <div className="flex space-x-1">
          <div className="flex-none">
              <IntensityCard intensity={intensity} />
            </div>
            <div className="flex flex-1 flex-col justify-center">
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
      </Draggable>
  );
};

export default AlertCard;
