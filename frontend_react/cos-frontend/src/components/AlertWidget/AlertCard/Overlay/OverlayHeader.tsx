import React from "react";
import Close from "@mui/icons-material/Close";
import { Bolt } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface AlertHeaderProps {
  alertType: string;
  onClose: () => void;
}

const AlertHeader: React.FC<AlertHeaderProps> = ({alertType, onClose}) => {
  return (
    <header className="flex gap-5 justify-between w-full text-xl leading-none text-white">
      <div className="flex">
        <Typography style={{fontSize:20, fontWeight: 500}}>{alertType}</Typography>
        <Bolt
        sx={{
          color: 'white',
          width: '20px',
          height: '25px'
        }}
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
