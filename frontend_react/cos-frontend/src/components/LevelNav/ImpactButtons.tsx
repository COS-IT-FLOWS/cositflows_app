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
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleButtonClick = (value: string) => {
      setSelectedValue(value);
      setSelectedMap(value);
     }

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
         <Button 
            key={button.value} 
            onClick={() => handleButtonClick(button.value)} 
            sx={{ 
              fontSize: 'text-base', 
              fontFamily: 'Inter', 
              textTransform: 'none' ,
              backgroundColor: selectedValue === button.value ? '#18181B !important' : undefined,
              color: selectedValue === button.value ? '#fff' : undefined, 
              }}
            >
            {button.label}
         </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default ButtonComponent;