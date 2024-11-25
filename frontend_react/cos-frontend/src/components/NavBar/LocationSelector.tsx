import React from "react";
import Location from "@mui/icons-material/LocationOn";
import { IconButton, Typography } from "@mui/material";

const LocationSelector: React.FC = () => {
  return (
    <IconButton sx={{
      width: '100px',
      height: '35px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      border: '0.5px solid rgba(97, 179, 255, 0.5)',
      color: '#61B3FF',
      borderRadius: '20px',
      paddingX: '10px',
    }}>
      <Location sx={{width: 20, height: 18, color: '#fff'}}/>
      <Typography sx={{fontSize: 14, color: '#fff'}}>Thrissur</Typography>
    </IconButton>
  );
};

export default LocationSelector;
