import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
    <Button key="Panchayats" sx={{ fontSize: 'text-base', fontFamily: 'Inter', textTransform: 'none' }}>
         Thrissur
    </Button>,
    <Button key="Population" sx={{ fontSize: 'text-base', fontFamily: 'Inter', textTransform: 'none' }}>
         Periyar Basin
    </Button>,
    <Button key="Households" sx={{ fontSize: 'text-base', fontFamily: 'Inter', textTransform: 'none' }}>
         
    </Button>,
  ];

const ButtonComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      {/* <ButtonGroup size="small" aria-label="Small button group">
        {buttons}
      </ButtonGroup> */}
      <ButtonGroup variant="contained" color="primary" aria-label="Medium-sized button group"
        sx={{
            '& .MuiButton-contained': {
            backgroundColor: '#2F2F2F', // zinc-900
            '&:hover': {
                backgroundColor: '#232324', // zinc-900
            },
            '&:not(:last-child)': {
                borderRight: '1px solid #232324', // Change the border color to white
            },
            },
        }}
        >
        {buttons}
      </ButtonGroup>
      {/* <ButtonGroup size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup> */}
    </Box>
  );
};

export default ButtonComponent;