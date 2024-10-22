import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, ThemeProvider, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import Map from '../Maps/MonitoringMap';
import { useEffect, useState } from 'react';

interface RiverStation {
    Station_ID: string;
    Station_Name: string;
    River: string;
    Warning_Level : number | undefined;
    Danger_Level : number | undefined;
    timeSeriesData?: any[];
  }

interface TimeSeriesDataLine {
    timestamp: string;
    Level: number;
  }

  class BasinClass {
    basinName: string;
    riverStations: RiverStation[];

    constructor(basinName: string) {
      this.basinName = basinName;
      this.riverStations = [];
    }

    addRiver(riverStations: RiverStation){
      this.riverStations.push(riverStations);
    }

    getRiver(): RiverStation[]{
      return this.riverStations;
    }
  } 
  async function loadRiverData(): Promise<RiverStation[]> {
    try {
      const response = await fetch('/RiverStationData.json');
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('River Station Data:', data);
      return data;
    } catch(error) {
      console.error('Error fetching river station data:', error);
      return [];
    }
  }
  
  const availableStationIDs = ['CWCRV0002']; //SERVER-SIDE DEV

  async function loadTimeSeriesData(stationID: string): Promise<any[]> {
    if (!availableStationIDs.includes(stationID)) {
      console.warn(`No time series data available for station ID: ${stationID}`);
      return [];
    }

    try{
      const response = await fetch(`/RVRTimeSeries/${stationID}.json`, {
        headers: {
          'Accept': 'application/json'
        }
      });
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Time Series Data for ${stationID} :`, data);
      return data;
    } catch(error) {
      console.error(`Error fetching time series data for ${stationID}:`, error);
      return[];
    }
  }

  async function initializeBasins(): Promise<{ [key: string]: BasinClass}> {
    try {
    const riverStationData = await loadRiverData();
    console.log('waiting');
    console.log(riverStationData);
    const basins: {[key: string]: BasinClass} = {};

    for (const riverStation of riverStationData) {
      const basinName = riverStation.River || 'Unknown Basin';
      if (!basins[basinName]) {
        basins[basinName] = new BasinClass(basinName);
      }
      basins[basinName].addRiver(riverStation);
    }

    for (const basin of Object.values(basins)) {
      for (const river of basin.getRiver()) {
        const timeSeriesData = await loadTimeSeriesData(river.Station_ID);
        if(timeSeriesData) {
        river.timeSeriesData = timeSeriesData;
        }
      }
    }
    return basins;
  } catch(error) {
    console.error('Error initializing basins:', error);
    return {};
  }    
}


const RiverWidgets: React.FC = () => {
    const [basins, setBasins] = useState<{ [key: string]: BasinClass }>({});
    const [allRiverStationData, setAllRiverStationData] = useState<{[key: string]: TimeSeriesDataLine[]}>({});
    const [selectedBasinName, setSelectedBasinName] = useState<string>('Chalakudy');

    useEffect(() => {
        const fetchData = async () => {
          const basinData = await initializeBasins();
          setBasins(basinData);
        //   extractTodayLevels(basinData, 'Chalakudy');
          await fetchTimeSeriesForAllRiverStation(basinData, selectedBasinName);
        };
    
        fetchData();
      }, [selectedBasinName]);

      const fetchTimeSeriesForAllRiverStation = async (basinData: { [key: string]: BasinClass }, basinName: string): Promise<void> => {
          const allData: { [key: string]: TimeSeriesDataLine[] } = {};

          if(basinData[basinName]) {
            const basin = basinData[basinName];
            for(const riverStation of basin.getRiver()) {
                const timeSeriesData: TimeSeriesDataLine[] = await loadTimeSeriesData(riverStation.Station_ID);
                // console.log(`Time series data for river station ${riverStation.Station_ID}:`, timeSeriesData);

                const filteredData = timeSeriesData.filter(dataPoint => dataPoint.Level !== null);
                allData[riverStation.Station_ID] = filteredData;
            }
          } 
          setAllRiverStationData(allData);
      };

      const renderLineChart = (stationID: string) => {
        const data = allRiverStationData[stationID];

        if(!data || data.length === 0) {
            return <Typography sx={{marginLeft: 3}}>No data available</Typography>;
        }

        return (
            <LineChart data={data}>
                <XAxis 
                dataKey="TimeStamp"
                fontSize={10}
                />
                <YAxis
                fontSize={10}
                />
                <Tooltip/>
                <Line 
                type="monotone" 
                dataKey="CurrentLevel(m)" 
                stroke="#8EDCE6" 
                dot={false}
                />
            </LineChart>
        )
      }



  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} sx={{ height: '100%', alignItems: 'stretch' }}>
        {/* Left Side Map */}
        <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{ height: '100%' }}>
          <Grid size={{xs: 12}} sx={{ height: '88%' }}>
            <Card sx={{ height: '100%' }}>
              <Map />
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
             <Card sx={{height: '100%', display: 'flex', flexDirection: 'column', p: 2}}>
                <Card sx={{ flexGrow: 1, bgcolor: '#000' }}>
                <CardContent>
                    <Typography sx={{mb:2}}> Station Levels</Typography>
                    <ResponsiveContainer width="99%" height={180} style={{ marginLeft: -25, marginBottom: -50 }}>
                        {Object.keys(allRiverStationData).length > 0 ? renderLineChart(Object.keys(allRiverStationData)[0]) : <Typography sx={{fontSize: 10}}>No data available</Typography>}
                    </ResponsiveContainer>
                </CardContent>
                </Card>
                <Card sx={{ flexGrow: 1, mt: 1, bgcolor: 'transparent' }}>
                <CardContent>
                    <Typography>Station II Levels</Typography>
                    {Object.keys(allRiverStationData).length > 1 ? renderLineChart(Object.keys(allRiverStationData)[1]) : <Typography sx={{fontSize: 10, opacity: '40%'}}>No data available</Typography>}
                </CardContent>
                </Card>
                <Card sx={{ flexGrow: 1, mt: 1, bgcolor: 'transparent' }}>
                <CardContent>
                    <Typography>Station III Levels</Typography>
                    {Object.keys(allRiverStationData).length > 2 ? renderLineChart(Object.keys(allRiverStationData)[1]) : <Typography sx={{fontSize: 10, opacity: '40%'}}>No data available</Typography>}
                </CardContent>
                </Card>
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

export default RiverWidgets;