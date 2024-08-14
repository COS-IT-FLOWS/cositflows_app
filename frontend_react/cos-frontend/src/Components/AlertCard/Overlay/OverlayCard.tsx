import React from "react";
import AlertHeader from "./AlertHeader";
import AlertInfo from "./AlertInfo";
import LocationInfo from "./LocationInfo";
import WarningInfo from "./WarningInfo";

interface LightningAlertProps {
  alertType: string;
  date: string;
  time: string;
  issuer: string;
  location: string;
  warning: string;
  validUntil: string;
}

const LightningAlert: React.FC<LightningAlertProps> = ({
  alertType,
  date,
  time,
  issuer,
  location,
  warning,
  validUntil,
}) => {
  return (
    <section className="flex flex-col font-semibold max-w-[299px] text-neutral-600">
      <div className="flex flex-col p-3.5 w-full rounded-3xl bg-stone-300">
        <AlertHeader alertType={alertType} />
        <AlertInfo date={date} time={time} issuer={issuer} />
        <div className="flex gap-1.5 mt-2">
          <LocationInfo location={location} />
          <WarningInfo warning={warning} validUntil={validUntil} />
        </div>
      </div>
    </section>
  );
};

export default LightningAlert;
