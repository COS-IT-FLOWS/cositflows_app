import React from "react";
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, ThemeProvider, Button } from '@mui/material';
import theme from "../theme";

const ForecastScreen: React.FC = () => {
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
            
            <Grid size={{xs:12, md:6}} container direction="column" spacing={1} sx={{ height: '100%', pl: 10,pr:5, py: 5, alignItems: 'center', justifyContent: 'center' }}>
              <Grid size={{xs:12}} sx={{ height: '90%' }}>
                <Card sx={{ height: '100%', mixBlendMode: 'plus-lighter' }}>
                  <CardContent>
                    <Typography>insert simulation</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid size={{xs:12, md:6}} container direction="column" spacing={1} sx={{ height: '100%',py: 15, px:20}}>
                  <Typography sx={{ color: 'white', fontSize: 44, fontWeight: '500', lineHeight: '48px' }} style={{ paddingBottom: 10 }}>
                    Welcome to  <br />Forecast.
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: 20, fontWeight: '500' }} style={{paddingBottom: 10 }}>
                    How this works
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: 16, fontWeight: '300', wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: '22px' }}>
                    Input a predicted rainfall value for tomorrow in your region. <br /><br />
                    The rainfall value will be used to calculate inflow into the network of reservoirs in the river basin.<br /><br />
                    The change in the reservoirs values determine how much the river level rises. <br /><br />
                    This new river level value will be the focal point, used to map flooding impact in the region.<br /><br />
                  </Typography>
                  <Button>
                    Begin
                  </Button>
            </Grid>

          </Grid>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ForecastScreen;