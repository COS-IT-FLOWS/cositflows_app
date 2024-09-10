import React from "react";
import icon from "./lightning_icon.svg"

interface AlertHeaderProps {
  alertType: string;
}

const AlertHeader: React.FC<AlertHeaderProps> = ({ alertType }) => {
  return (
    <div className="flex gap-1">
      <div className="grow font-inter">{alertType}</div>
      <img src={icon} alt="Lightning icon"  className="object-contain shrink-0 w-4 aspect-square" />
    </div>
  );
};

export default AlertHeader;
