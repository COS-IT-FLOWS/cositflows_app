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

const SVG_WIDTH = 800;
const SVG_HEIGHT = 800;

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

const Arrow: React.FC<{ x1: string; y1: string; x2: string; y2: string; visible: boolean }> = ({ x1, y1, x2, y2, visible }) => {
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

  const [showTutorial, setShowTutorial] = useState(true);

  const handleBegin = () => {
    setShowTutorial(false);
  };

  return (
      <div className="monitor-screen w-full h-full mx-auto relative flex flex-col">
        <div className="absolute inset-0" 
          style={{
            width: '100%',
            height: '100%', 
            position: 'relative', 
            background: 'radial-gradient(circle at 100% 1%, #283ADE 10%, #61B3FF 69%, #A1C7F1 85%, #E1EFFE 99%)', 
            borderRadius: 15, 
            overflow: 'hidden',
          }}
        >
          <ThemeProvider theme={theme}>
            <Grid container spacing={1} sx={{ height: '100%', alignItems: 'stretch' }}>
              {showTutorial ? (
                <>
                {/* // Tutorial content */}
                <Grid size={{ xs: 12, md: 6 }} container direction="column" spacing={1} sx={{ height: '100%', pl: 10, pr: 5, py: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <Grid size={{ xs: 12 }} sx={{ height: '90%' }}>
                    <Card sx={{ height: '100%', mixBlendMode: 'plus-lighter' }}>
                      <CardContent>
                        <Typography>insert simulation</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }} container direction="column" spacing={1} sx={{ height: '100%', py: 15, px: 20, alignItems: 'start', justifyContent: 'center'}}>
                  <Typography sx={{ color: 'white', fontSize: 44, fontWeight: '500', lineHeight: '48px' }} style={{ paddingBottom: 10 }}>
                    Welcome to  <br />Forecast.
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: 20, fontWeight: '500' }} style={{ paddingBottom: 10 }}>
                    How this works
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: 16, fontWeight: '300', wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: '22px' }}>
                    Input a predicted rainfall value for tomorrow in your region. <br /><br />
                    The rainfall value will be used to calculate inflow into the network of reservoirs in the river basin.<br /><br />
                    The change in the reservoirs values determine how much the river level rises. <br /><br />
                    This new river level value will be the focal point, used to map flooding impact in the region.<br /><br />
                  </Typography>
                  <Button
                  onClick={handleBegin} variant="contained"
                  sx={{ color: '#fff', mixBlendMode: 'plus-lighter', fontSize: '16px', fontWeight: '300'}}
                  >
                    Begin
                  </Button>
                </Grid></>
              ) : (
                  // Forecast main content
                  <>
                  {/* Forecast main content */}
                  <Grid size={{ xs: 12, md: 5 }} container direction="column" spacing={1} sx={{ height: '100%', pl: 2, py: 2 }}>
                    <Grid size={{ xs: 12 }} sx={{ height: '100%' }} container direction='column'>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 24, pl: 2, pt: 1 }}>Input Values</Typography>
                          <ValidationTextField
                            type='number'
                            style={{ marginTop: 20, marginLeft: 10 }}
                            label="Enter Rainfall"
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            value={rainfall !== null ? rainfall : ''}
                            onChange={handleInputChange} /> <br /> <br />
                          <Typography sx={{ fontSize: '10px', fontWeight: '200', opacity: '80%', marginLeft: 2 }}>
                            Rainfall value must be between the ranges of X to Y, <br />
                            in accordance with daily occurring data.<br /> <br />
                          </Typography>
                          <Button
                            style={{ marginLeft: 10 }}
                            onClick={handleSimulate}
                            color="secondary"
                            variant="contained"
                          >
                            Run Simulation
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 7 }} container direction="column" spacing={1} sx={{ height: '100%', pr: 2, py: 2 }}>
                    <Grid size={{ xs: 12 }} sx={{ height: '100%' }}>
                      <Card sx={{ height: '100%'}}>
                        <CardContent>
                          <Typography sx={{ fontSize: 24, pl: 2, pt: 1 }}>Simulation Screen</Typography>
                          {/* <div style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', alignItems: 'center', justifyContent: 'center'}}> */}
                            <svg 
                             viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                            //  preserveAspectRatio="xMidYMid meet"
                             width="100%" height="100%"
                            >
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#BDD3CE" />
                                </marker>
                              </defs>

                              {/* Render dams in network layout */}
                              <Dam level={levels[0]} label="Upper Nirar" x={SVG_WIDTH * 0.07} y={SVG_HEIGHT * 0.05} />
                              <Dam level={levels[1]} label="Lower Nirar" x={SVG_WIDTH * 0.2} y={SVG_HEIGHT * 0.1} />
                              <Dam level={levels[2]} label="TN Sholayar" x={SVG_WIDTH * 0.15} y={SVG_HEIGHT * 0.27} />
                              <Dam level={levels[3]} label="Parambikulam" x={SVG_WIDTH * 0.2} y={SVG_HEIGHT * 0.45} />
                              <Dam level={levels[4]} label="Thunacadavu" x={SVG_WIDTH * 0.25} y={SVG_HEIGHT * 0.6}/>
                              <Dam level={levels[5]} label="Peruvarippalam" x={SVG_WIDTH * 0.2} y={SVG_HEIGHT * 0.75} />
                              <Dam level={levels[6]} label="KL Sholayar" x={SVG_WIDTH * 0.5} y={SVG_HEIGHT * 0.35} />
                              <Dam level={levels[7]} label="Poringalkuthu" x={SVG_WIDTH * 0.8} y={SVG_HEIGHT * 0.75} />

                              {/* Render arrows */}
                              <Arrow x1="10%" y1="15%" x2="17%" y2="26.5%" visible={visibleArrows[0]} />
                              <Arrow x1="23%" y1="20%" x2="18%" y2="26.5%" visible={visibleArrows[1]} />
                              <Arrow x1="18%" y1="38%" x2="23%" y2="44.5%" visible={visibleArrows[2]} />
                              <Arrow x1="24%" y1="55.5%" x2="29%" y2="59.5%" visible={visibleArrows[3]} />
                              <Arrow x1="23%" y1="74.5%" x2="29%" y2="71%" visible={visibleArrows[4]} />
                              <Arrow x1="18%" y1="38%" x2="49.5%" y2="40%" visible={visibleArrows[5]} />
                              <Arrow x1="53%" y1="45.5%" x2="80%" y2="74.5%" visible={visibleArrows[6]} />
                            </svg>
                           {/* </div> */}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid></>
              )}
              </Grid>
          </ThemeProvider>
        </div>
      </div>
  );
};

export default ForecastScreen;