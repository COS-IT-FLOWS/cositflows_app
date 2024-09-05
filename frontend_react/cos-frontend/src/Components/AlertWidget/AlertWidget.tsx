// AlertWidget.tsx
import React from "react";
import AlertCard from "./AlertCard/AlertCard";
import Draggable from "react-draggable";

export interface Alert{
  alertType: string;
  intensity: string;
  date: string;
  time: string;
  location: string;
  validUntil: string;
  issuedBy: string;
}
interface AlertWidgetProps {
  location: string;
  alerts: Alert[];
  onAlertClick: (alert: Alert)=> void;
}

const AlertWidget: React.FC<AlertWidgetProps> = ({ location, alerts, onAlertClick }) => {
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-darkslategray text-white p-4 rounded-3xl max-w-[225px] h-[329px]">
      <h2 className="text-[16px] font-inter mb-4">Alerts in {location}</h2>

      {/* MAIN SECTION */}
      <div className="max-h-[270px] overflow-hidden overflow-y-auto">
        <div className="flex flex-col gap-[9px] font-inter overflow-y-auto">
          {alerts.map((alert:Alert, index:number) => (
            <AlertCard
              key={index}
              alertType={alert.alertType}
              intensity={alert.intensity}
              date={alert.date}
              time={alert.time}
              location={alert.location}
              validUntil={alert.validUntil}
              issuedBy={alert.issuedBy}
              onClick={() => onAlertClick(alert)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertWidget;
