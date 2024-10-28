import React, { useState } from "react";
import { useSprings, useSpring, animated } from 'react-spring';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, ThemeProvider, Button, TextField, styled } from '@mui/material';
import theme from "../theme";

interface DamProps {
  level: number;
  label: string;
  x: number;
  y: number;
}

const Dam: React.FC<DamProps>= ({ level, label, x, y}) => {
  const damHeight = 75;
  const waterHeight = level * (damHeight/100);

  const animationProps = useSpring({
    height: `${waterHeight}px`,
    from: { height: '0px' },
    config: { tension: 200, friction: 20 }
  });

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="50" height={damHeight} fill="#E1EFFE" opacity="90%" />
      <animated.rect 
      y={damHeight - waterHeight} 
      width="50" 
      height={animationProps.height} 
      fill="#61B3FF" 
      />
      <text x="25" y={damHeight + 8} textAnchor="middle" fontSize="8" fill='white' >{label}</text>
    </g>
  );
};

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; visible: boolean }> = ({ x1, y1, x2, y2, visible }) => {
  const arrowAnimation = useSpring({
    opacity: visible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  return (
    <animated.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#BDD3CE"
      strokeWidth="1"
      markerEnd="url(#arrowhead)"
      style={arrowAnimation}
    />
  );
};


const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#0000',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

const ForecastScreen: React.FC = () => {
  const [rainfall, setRainfall] = useState<number | null>(null);
  const [levels, setLevels] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [visibleArrows, setVisibleArrows] = useState([false, false, false, false, false, false, false]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRainfall(value? Number(value) : null);
  };

  const handleSimulate = () => {
    if(rainfall === null) return;
    // Calculate the new water levels based on the rainfall input
    const newLevels = [
      Math.min(levels[0] + (rainfall * 4) / 100, 100), // Max level capped at 100%
      Math.min(levels[1] + (rainfall * 4) / 100, 100),
      Math.min(levels[2] + (rainfall * 4) / 100, 100),
      Math.min(levels[3] + (rainfall * 4) / 100, 100),
      Math.min(levels[4] + (rainfall * 4) / 100, 100),
      Math.min(levels[5] + (rainfall * 4) / 100, 100),
      Math.min(levels[6] + (rainfall * 4) / 100, 100),
      Math.min(levels[7] + (rainfall * 4) / 100, 100),
    ];

    // Sequentially update levels with delays
    newLevels.forEach((level, index) => {
      setTimeout(() => {
        setLevels((prevLevels) => {
          const updatedLevels = [...prevLevels];
          updatedLevels[index] = level;
          return updatedLevels;
        });
        if (index < newLevels.length - 1) {
          setVisibleArrows((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      }, index * 500); // Adjust delay between each dam (500ms here)
    });
  };
  
  return (
    <div className="monitor-screen w-full h-full mx-auto relative flex flex-col">
      <div className="absolute inset-0" 
        style={{
          width: '100%',
          height: '100%', 
          position: 'relative', 
          background: 'radial-gradient(circle at 50% 100%, #283ADE 10%, #61B3FF 50%, #A1C7F1 65%, #E1EFFE 100%)', 
          borderRadius: 15, 
          overflow: 'hidden',
        }}
      >
        <ThemeProvider theme={theme}>
          <Grid container spacing={2} sx={{ height: '100%', alignItems: 'stretch' }}>
            
            <Grid size={{xs:12, md:5}} container direction="column" spacing={1} sx={{ height: '100%', pl: 2, py: 2}}>
              <Grid size={{xs:12}} sx={{ height: '100%' }} container direction='column'>
                <Card sx={{ height: '100%'}}>
                  <CardContent>
                    <Typography sx={{fontSize: 24, pl: 2, pt: 1}}>Input Values</Typography>
                    <ValidationTextField
                      type='number'
                      style = {{ marginTop : 20, marginLeft: 10}}
                      label="Enter Rainfall"
                      required
                      variant="outlined"
                      id="validation-outlined-input"
                      value={rainfall !== null ? rainfall : ''}
                      onChange={handleInputChange}
                    /> <br/> <br/>
                    <Typography sx={{ fontSize: '10px', fontWeight: '200', opacity: '80%', marginLeft: 2}}>
                    Rainfall value must be between the ranges of X to Y, <br/>
                    in accordance with daily occurring data.<br/> <br/>
                    </Typography>
                      <Button 
                        style = {{ marginLeft: 10}}
                        onClick={handleSimulate}
                        color ="secondary"
                        variant="contained"
                      >
                        Run Simulation
                      </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid size={{xs:12, md:7}} container direction="column" spacing={1} sx={{ height: '100%',pr:2, py:2 }}>
              <Grid size={{xs:12}} sx={{ height: '100%' }}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography sx={{fontSize: 24, pl: 2, pt: 1}}>Simulation Screen</Typography>
                             <svg width="100%" height="918px">
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#BDD3CE" />
                                </marker>
                              </defs>

                              {/* Render dams in network layout */}
                              <Dam level={levels[0]} label="Upper Nirar" x={12} y={8} />
                              <Dam level={levels[1]} label="Lower Nirar" x={126} y={84} />
                              <Dam level={levels[2]} label="TN Sholayar" x={108} y={233} />
                              <Dam level={levels[3]} label="Parambikulam" x={50} y={382} />
                              <Dam level={levels[4]} label="Thunacadavu" x={145} y={538} />
                              <Dam level={levels[5]} label="Peruvarippalam" x={51} y={680} />
                              <Dam level={levels[6]} label="KL Sholayar" x={350} y={359} />
                              <Dam level={levels[7]} label="Poringalkuthu" x={525} y={685} />

                              {/* Render arrows */}
                              <Arrow x1={62} y1={91} x2={108} y2={230} visible={visibleArrows[0]} />
                              <Arrow x1={150} y1={169} x2={132} y2={230} visible={visibleArrows[1]} />
                              <Arrow x1={132} y1={320} x2={75} y2={382} visible={visibleArrows[2]} />
                              <Arrow x1={75} y1={468} x2={170} y2={535} visible={visibleArrows[3]} />
                              <Arrow x1={76} y1={680} x2={170} y2={625} visible={visibleArrows[4]} />
                              <Arrow x1={132} y1={320} x2={350} y2={359} visible={visibleArrows[5]} />
                              <Arrow x1={375} y1={445} x2={550} y2={685} visible={visibleArrows[6]} />
                            </svg>
                    </CardContent>
                  </Card>
                </Grid>  
            </Grid>

          </Grid>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ForecastScreen;