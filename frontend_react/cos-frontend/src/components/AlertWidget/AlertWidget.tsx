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
    <div className={`text-white ${isCollapsed ? "bg-opacity-90 pb-3 pt-3 rounded-[18px]" : " bg-opacity-80 pb-3 pt-4 rounded-3xl"} bg-zinc-900 pr-3 pl-3 w-[180px] max-w-[200px] h-auto shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}>
      <header className={`flex items-center text-base ${isCollapsed ? "gap-[9px] mb-1.5" : "gap-0 mb-2"} justify-between`}>
        <div className={`flex text-base font-inter font-[500] ml-2 whitespace-nowrap`}>Alerts</div>
        <div className="flex items-center justify-center"> 
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
        <div className="flex flex-col gap-[5px] font-inter overflow-y-auto">
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
