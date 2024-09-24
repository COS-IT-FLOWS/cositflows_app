// AlertWidget.tsx
import React , {useState} from "react";
import AlertCard from "./AlertCard/AlertCard";
import Draggable from "react-draggable";
import AddIcon from "@mui/icons-material/Add";
import Minimize from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";


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
  onClose: () => void;
}

const AlertWidget: React.FC<AlertWidgetProps> = ({ location, alerts, onAlertClick, onClose}) => {
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);


  return (
    <Draggable>
    <div className={`text-white ${isCollapsed ? "bg-opacity-90" : "bg-opacity-80"} bg-zinc-900 pr-4 pl-4 pb-4 pt-3.5 rounded-3xl w-[200px] max-w-[200px] h-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}>
      <header className={`flex items-center text-base ${isCollapsed ? "gap-[9px]" : "gap-[0px]"} justify-between w-full`}>
        <h2 className={`flex text-[15px] font-inter mb-3 whitespace-nowrap`}>Alerts in {location}</h2>
        <div className="flex items-center"> 
            {isCollapsed ? (
                <AddIcon
                    className="text-white cursor-pointer"
                    style={{ width: '20px', height: '20px' }}
                    onClick={() => setIsCollapsed(false)}
                  />
                ) : (
                <>
                <Minimize
                  className = " text-white cursor-pointer"
                  style = {{ transform: 'translateY(-6px)', width: '20px', height: '20px' }}
                  onClick = {() => setIsCollapsed(true)}
                />
                <CloseIcon
                  className = "text-white cursor-pointer"
                  style = {{ width: '20px', height: '20px' }}
                  onClick = {onClose}
              />
            </>
            )}
            </div>
      </header>


      {/* MAIN SECTION */}
      {!isCollapsed && (
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
      )}
    </div>
    </Draggable>
  );
};

export default AlertWidget;
