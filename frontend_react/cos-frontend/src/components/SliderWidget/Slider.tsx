import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Box, Typography } from '@mui/material';

const marks = [
  {
    value: 0,
    label: '11m',
  },
  {
    value: 50,
    label: '12m',
  },
  {
    value: 100,
    label: '13m',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

const SliderWidget: React.FC = () => {
    return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '300px',
        height: '80px',
        borderRadius: '12px',
        backgroundColor: 'rgb(24,24,27,0.99)',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '20px',
        paddingRight: '20px'
    }}>
        <Box
         sx={{ 
            width: '100%',
            backgroundColor: 'transparent',
            p: 1,
            borderRadius: '8px'
            }}
        >
        <div style={{display: 'flex'}}>
            <Typography sx={{fontSize: 16, color: '#fff', ml: -1, mt: 1}}>River Water Level </Typography>
            <Typography sx={{fontSize: '10px', color: '#fff',opacity: '70%', ml: 0.5, mt: 1.75}}>{'(Above Mean Sea Level)'}</Typography>
        </div>
        <Slider
            aria-label="Restricted values"
            defaultValue={50}
            getAriaValueText={valuetext}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            sx={{
                color: '#61B3FF', // Change the slider color if needed
                '& .MuiSlider-thumb': {
                  backgroundColor: '#fff', // Color of the thumb
                //   boxShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3)',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#61B3FF', // Color of the track
                //   boxShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3)',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#61B3FF', // Color of the rail
                //   boxShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3)',
                },
                '& .MuiSlider-markLabel': {
                    color: '#fff',
                    fontSize: '12px',
                },
              }}
        />
        </Box>
    </div>
    );
 };

 export default SliderWidget;

 