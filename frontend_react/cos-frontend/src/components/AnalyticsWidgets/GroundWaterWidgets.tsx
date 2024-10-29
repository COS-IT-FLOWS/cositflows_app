import * as React from 'react';
import { Card, CardContent, Typography, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
// import Map from '../Maps/MonitoringMap';

const GWLWidgets: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} sx={{ height: '100%', alignItems: 'stretch' }}>
        {/* Left Side Map */}
        <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{ height: '100%' }}>
          <Grid size={{xs: 12}} sx={{ height: '88%' }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography>Vertical Map</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs:12}} sx={{ height: '10%' }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>Legend</CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Right Side Stats */}
        <Grid size={{xs: 12, md: 8}} container direction="column" spacing={1} sx={{ height: '100%' }}>
          {/* Current Station Cards */}
          
            <Grid sx={{ height: '80%', display: 'flex', flexDirection: 'column' }}>
                <Card sx={{ flexGrow: 1, height: '10%'}}>
                <CardContent>
                <Grid size={{xs:12}} container direction="row" spacing={1}>
                      <Grid size={{xs:12, md:4}}>
                      <Typography>GWL Station</Typography>
                      </Grid>
                      <Grid size={{xs:12, md:8}}>
                        <Grid size={{xs:12}} container direction="row" spacing={0.5} style={{ textAlign: 'center'}}>
                          <Grid size={{xs:12, md:3}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:10, fontWeight: 300}}>Depth</Typography>
                            <Typography style={{fontSize:28, marginTop: 10}}>X<span style={{ fontSize: 12, marginLeft: -2  }}> m</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:3}} >
                            <Typography style={{fontSize:10, fontWeight: 300}}>Storage %</Typography>
                            <Typography style={{fontSize:28, marginTop: 10}}>X<span style={{ fontSize: 12, marginLeft: -2  }}> %</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:3}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:10, fontWeight: 300}}>Elevation</Typography>
                            <Typography style={{fontSize:28, marginTop: 10}}>X<span style={{ fontSize: 12, marginLeft: -2  }}> m</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:3}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:10, fontWeight: 300}}>Current Height</Typography>
                            <Typography style={{fontSize:28, marginTop: 10}}>X<span style={{ fontSize: 12, marginLeft: -2  }}> m</span></Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                </CardContent>
                </Card>
                <Card sx={{ flexGrow: 1, mt: 1, height: '50%'}}>
                <CardContent>
                    <Typography>Groundwater Level Station Data</Typography>
                </CardContent>
                </Card>
                <Card sx={{ flexGrow: 1, mt: 1, height: '20%'}}>
                <CardContent>
                    <Typography>Monthly Trends</Typography>
                </CardContent>
                </Card>
            </Grid>
            

          {/* Basin Details */}
          <Grid sx={{ height: '18%' }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography>Basin Details</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default GWLWidgets;
