import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, ReferenceLine} from 'recharts';
import { Card, CardContent, Typography, ThemeProvider, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import { useEffect, useState } from 'react';
import { MonitoringMapComponent } from '../Maps/MonitoringMapComponent';

interface RiverStation {
    Station_ID: string;
    Station_Name: string;
    River: string;
    Warning_Level : number | undefined;
    Danger_Level : number | undefined;
    timeSeriesData?: any[];
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
  async function loadRiverStationData(): Promise<RiverStation[]> {
    try {
      const response = await fetch('/RiverStationData.json');
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('River Station Data:', data);
      return data.map((station: any) => ({
        Station_ID: station.Station_ID,
        Station_Name: station.Station_Name,
        River: station.River,
        Warning_Level: station['Warning_Level(m)'],
        Danger_Level: station['Danger_Level(m)'],
        timeSeriesData: []
      })) as RiverStation[];
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
    const riverStationData = await loadRiverStationData();
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
    const [selectedBasinName, setSelectedBasinName] = useState<string>('Chalakudy');
    const [riverStations, setRiverStations] = useState<RiverStation[]>([]);


    useEffect(() => {
        const fetchData = async () => {
          const basinData = await initializeBasins();
          setBasins(basinData);
          await loadRiverStations(basinData, selectedBasinName);
        };
    
        fetchData();
      }, [selectedBasinName]);

      const loadRiverStations = async (basinData: { [key: string]: BasinClass }, basinName: string): Promise<void> => {
          if(basinData[basinName]) {
            const basin = basinData[basinName];

            const stations: (RiverStation | undefined)[] = await Promise.all(
                basin.getRiver().map(async (riverStation) => {
                const staticDataArray: RiverStation[] = await loadRiverStationData();
                const staticData = staticDataArray.find(station => station.Station_ID === riverStation.Station_ID);
                if (staticData) {
                    const timeSeriesData = await loadTimeSeriesData(staticData.Station_ID);
                    staticData.timeSeriesData = timeSeriesData;
                }
                return staticData;
            })
           );

            setRiverStations(stations.filter(station => station !== undefined ) as RiverStation[]); 
        }
      };
    
      const renderLineChart = (station: RiverStation) => {
        const data = station.timeSeriesData;
        const latestLevel = data && data.length > 0 ? data[data.length - 1]['CurrentLevel(m)'] : null;
        console.log('1 Time Series Data:', data);
        console.log('Latest Level:', latestLevel);

        const formatHour = (TimeStamp: string) => {
          const hour = parseInt(TimeStamp.split('_')[1], 10);
          const suffix = hour >= 12 ? 'pm' : 'am';
          const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
          return `${formattedHour}${suffix}`;
          }    

        return ( 
              <Card sx={{ flexGrow: 1, bgcolor: '#000'}}>
                <CardContent>
                  <Typography sx={{mb:2, mt:0.5, ml: 2}}>{station.Station_Name} Levels in {selectedBasinName}</Typography>
                    <Grid size={{xs:12}} container direction="row" spacing={1}>
                      <Grid size={{xs:12, md:8}}>
                        <ResponsiveContainer width="105%" height={180} style={{ marginLeft: -25, marginBottom: -20 }}>
                        {data && data.length > 0 ? (
                            <LineChart data={data}>
                                <XAxis 
                                dataKey="TimeStamp"
                                tickFormatter={formatHour}
                                fontSize={10}
                                />
                                <YAxis
                                fontSize={10} 
                                />
                                <Tooltip/>
                                <ReferenceLine y={station.Warning_Level} stroke="red" strokeDasharray="5 5" />
                                <ReferenceLine y={station.Danger_Level} stroke="orange" strokeDasharray="5 5" />
                                {/* <Area type="monotone" dataKey="CurrentLevel(m)" stroke="#8EDCE6" fillOpacity={0.7} fill="#8EDCE6"/> */}
                                <Line
                                type="monotone" 
                                dataKey="CurrentLevel(m)" 
                                stroke="#8EDCE6" 
                                strokeWidth={1}
                                dot={false}
                                />
                            </LineChart>
                        ) : (
                            <Typography sx={{fontSize: 10, opacity: '40%'}}>No data available</Typography>
                        )}
                        </ResponsiveContainer>
                      </Grid>

                      <Grid size={{xs:12, md:4}} sx={{mt: -5}} >
                        <Grid sx={{mx: 3}} height='50%'>
                          <Typography sx={{mb: 1}}>Station Data</Typography>
                          <Typography style={{fontSize:12, fontWeight: 300}}>Current Level</Typography>
                          <Typography style={{fontSize:28, marginTop: 1}}>{latestLevel !== null ? latestLevel : 'No data available'} <span style={{ fontSize: 10, marginLeft: -5  }}>m</span></Typography>
                        </Grid>
                        <Grid height='50%'>
                          <Card sx={{mx: 3, bgcolor: '#000'}} >
                            <CardContent sx={{marginBottom: -1.5, marginX: -1}}>
                              {/* <Typography>Trial 1</Typography> */}
                              <Grid size={{xs:12}} container direction="row" spacing={0.5} style={{ textAlign: 'center'}}>
                                <Grid size={{xs:12, md:6}} style={{ textAlign: 'center'}}>
                                  <Typography style={{fontSize:12, fontWeight: 300}}>Warning Level</Typography>
                                  <Typography style={{fontSize:28, marginTop: 2}}>{station.Warning_Level}<span style={{ fontSize: 10, marginLeft: -2  }}> m</span></Typography>
                                </Grid>
                                <Grid size={{xs:12, md:6}}>
                                  <Typography style={{fontSize:12, fontWeight: 300}}>Danger Level</Typography>
                                  <Typography style={{fontSize:28, marginTop: 2}}>{station.Danger_Level}<span style={{ fontSize: 10, marginLeft: -2  }}> m</span></Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                    
              </CardContent>
              </Card>
          )
      }



  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} sx={{ height: '100%', alignItems: 'stretch' }}>
        {/* Left Side Map */}
        <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{ height: '100%' }}>
          <Grid size={{xs: 12}} sx={{ height: '88%' }}>
            <Card sx={{ height: '100%' }}>
              <MonitoringMapComponent visibleGauges={{
                PRECIPITATION: false,
                RESERVOIR: false,
                TIDAL: false,
                GROUNDWATER: false,
                RIVER: false,
                REGULATOR: false
              }} />
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
                {riverStations.map((station) => (
                    <Grid key={station.Station_ID} sx={{ mb: 2 }}>
                        {renderLineChart(station)}
                    </Grid>
                ))}
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