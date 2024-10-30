import * as React from 'react';
import { Card, CardContent, Typography, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';


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
                <Card sx={{ flexGrow: 1, height: '50%'}}>
                <CardContent>
                    <Typography >Tidal Station Data</Typography>
                </CardContent>
                </Card>
                <Card sx={{ flexGrow: 1, mt: 1, height: '50%' }}>
                <CardContent>
                    <Typography >Thunacadavu Regulator</Typography>
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
