import * as React from 'react';
import { useState } from 'react';
import { ThemeProvider, Breadcrumbs, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import theme from '../theme';
import RainfallAnalytics from '../AnalyticsWidgets/RainfallWidgets';
import ReservoirAnalytics from '../AnalyticsWidgets/ReservoirAnalytics';
import RiverAnalytics from '../AnalyticsWidgets/RiverWidgets';
import GroundWaterAnalytics from '../AnalyticsWidgets/GroundWaterWidgets';
import TidalAnalytics from '../AnalyticsWidgets/TidalWidgets';

type Station= 'rainfall' | 'reservoir' | 'groundwater' | 'river' | 'tidal';

const AnalyticsScreen: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<Station>('rainfall');
  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
  }

  const renderStationAnalytics = () => {
    switch (selectedStation) {
      case 'rainfall':
        return <RainfallAnalytics/>;
      case 'reservoir':
       return <ReservoirAnalytics/>;
      case 'river':
        return <RiverAnalytics/>;
      case 'groundwater':
        return <GroundWaterAnalytics/>;
      case 'tidal':
          return <TidalAnalytics/>;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="monitor-screen overflow-hidden rounded-[15px] w-full h-full mx-auto relative">  
          <Grid 
            container 
            spacing={1} 
            sx={{ padding: '15px', height:'100%', alignItems: 'stretch' }} 
            >

              <Grid container direction="row" spacing={0} sx={{ width: '100%', height: '100%'}}>
                <Grid size={{xs: 12}} sx={{ height: '5%'}}>  
                  <Grid className='flex flex-row font-inter gap-1'>
                      <Breadcrumbs 
                      sx={{
                        maxWidth: 130,
                        whiteSpace: 'nowrap'
                      }}
                      separator={<NavigateNextIcon fontSize="small"/>} 
                      aria-label="breadcrumb"
                      >
                        <Link underline="none" sx={{padding: '0px'}} href="#" color='#CAC9C9'>
                          Station
                        </Link>
                        <Link underline="hover" sx={{padding: '0px', marginLeft: -0.5}} href="#rainfall"
                        onClick={()=> handleStationClick('rainfall')}
                        color={selectedStation === 'rainfall' ? 'primary' : '#CAC9C9'}
                        >
                          Rainfall
                        </Link>
                      </Breadcrumbs>
                    <Link 
                    underline="hover" 
                    href="#reservoir"
                    onClick={() => handleStationClick('reservoir')}
                    color={selectedStation === 'reservoir' ? 'primary' : '#CAC9C9'}
                    >
                        Reservoir
                    </Link>
                    <Link 
                    underline="hover" 
                    sx={{ maxWidth: 120}} 
                    href="#groundwater"
                    onClick={() => handleStationClick('groundwater')}
                    color={selectedStation === 'groundwater' ? 'primary' : '#CAC9C9'}
                    >
                        Groundwater
                    </Link>
                    <Link 
                    underline="hover" 
                    sx={{ maxWidth: 70}} 
                    href="#river"
                    onClick={() => handleStationClick('river')}
                    color={selectedStation === 'river' ? 'primary' : '#CAC9C9'}
                    >
                        River
                    </Link>
                    <Link 
                    underline="hover" 
                    sx={{ maxWidth: 70}} 
                    href="#tidal"
                    onClick={() => handleStationClick('tidal')}
                    color={selectedStation === 'tidal' ? 'primary' : '#CAC9C9'}
                    >
                        Tidal
                    </Link>
                  </Grid>
                </Grid>

                <Grid size={{xs:12}} sx={{height:'95%'}}>
                      {renderStationAnalytics()}
                </Grid>
              </Grid>  
          </Grid>
        </div>
    </ThemeProvider>
  );
};

export default AnalyticsScreen;