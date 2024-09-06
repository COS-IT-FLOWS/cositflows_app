// AlertWidget.tsx
import React from "react";
import AlertCard from "../AlertCard/AlertCard";
import Draggable from "react-draggable";
import '../styles.css';

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
    <Draggable>
      <div className="bg-neutral-900 text-white p-4 rounded-3xl max-w-[225px] h-[329px] alert-widget">
        <h2 className="text-[16px] font-semibold mb-4">Alerts in {location}</h2>

        {/* MAIN SECTION */}
        <div className="max-h-[270px] overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-[9px] overflow-y-auto">
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
    </Draggable>
  );
};

export default AlertWidget;
