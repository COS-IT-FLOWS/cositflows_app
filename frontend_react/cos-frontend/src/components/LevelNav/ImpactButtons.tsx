import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const buttons = [
    { label: 'Flood Inundation', value: 'flood-inundation' },
    { label: 'Population', value: 'population' },
    { label: 'Households', value: 'households' },
    { label: 'Agriculture', value: 'agriculture' },
];

const ButtonComponent: React.FC<{ setSelectedMap: (map: string) => void }> = ({setSelectedMap}) => {
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
       {buttons.map((button) => (
         <Button key={button.value} onClick={() => setSelectedMap(button.value)} sx={{ fontSize: 'text-base', fontFamily: 'Inter', textTransform: 'none' }}>
            {button.label}
         </Button>
        ))}
      </ButtonGroup>
      {/* <ButtonGroup size="large" aria-label="Large button group">
        {buttons}
      </ButtonGroup> */}
    </Box>
  );
};

export default ButtonComponent;