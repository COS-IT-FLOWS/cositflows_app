import React from "react";
import Bolt from '@mui/icons-material/Bolt';

interface AlertHeaderProps {
  alertType: string;
}

const AlertHeader: React.FC<AlertHeaderProps> = ({ alertType }) => {
  return (
    <div className="flex flex-row items-center ml-2">
      <div className="grow text-white font-inter">{alertType}</div>
      <Bolt
      sx={{
        color: 'white',
        width: '15px',
        height: '15px',
      }}
      />
    </div>
  );
};

export default AlertHeader;
