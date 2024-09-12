import React from "react";
import lightning_icon from "../lightning_icon.svg";
import Close from "@mui/icons-material/Close";

interface AlertHeaderProps {
  alertType: string;
  onClose: () => void;
}

const AlertHeader: React.FC<AlertHeaderProps> = ({alertType, onClose}) => {
  return (
    <header className="flex gap-5 justify-between w-full text-xl leading-none text-neutral-700">
      <div className="flex gap-1.5">
        <h1 className="grow my-auto">{alertType}</h1>
        <img
          loading="lazy"
          src={lightning_icon}
          className="object-contain shrink-0 aspect-square w-[30px]"
          alt=""
        />
      </div>
      <Close
        style={{ width: '20px', height: '20px' }}
        onClick={onClose}
      />
    </header>
  );
};

export default AlertHeader;
