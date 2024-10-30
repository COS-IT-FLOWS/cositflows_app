import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, ThemeProvider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell, Area } from 'recharts';
import { MonitoringMapComponent } from '../Maps/MonitoringMapComponent';



interface BarChartData {
  damName: string;
  level: number;
  Station_ID: string;
}

interface Reservoir {
  Station_ID: string;
  Station: string;
  River_Basin: string;
  FRL : number | undefined;
  Spillway : number | undefined;
  MWL: number | undefined;
  MDDL: number | undefined;
  timeSeriesData?: any[];
}

interface TimeSeriesDataLine {
  timestamp: string;
  Level: number;
}

  class BasinClass {
    basinName: string;
    reservoirs: Reservoir[];

    constructor(basinName: string) {
      this.basinName = basinName;
      this.reservoirs = [];
    }

    addReservoir(reservoir: Reservoir){
      this.reservoirs.push(reservoir);
    }

    getReservoirs(): Reservoir[]{
      return this.reservoirs;
    }
  } 

  async function loadReservoirData(): Promise<Reservoir[]> {
    try {
      const response = await fetch('/Reservoir.json');
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Reservoir Data:', data);
      return data;
    } catch(error) {
      console.error('Error fetching reservoir data:', error);
      return [];
    }
  }
  
  const availableStationIDs = ['RSVR4717', 'RSVR5143', 'RSVR6001','RSVR5133','RSVR5139']; //SERVER-SIDE DEV

  async function loadTimeSeriesData(stationID: string): Promise<any[]> {
    if (!availableStationIDs.includes(stationID)) {
      console.warn(`No time series data available for station ID: ${stationID}`);
      return [];
    }

    try{   
      const response = await fetch(`/RSVRTimeSeries/${stationID}.json`, {
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
    const reservoirData = await loadReservoirData();
    console.log('waiting');
    console.log(reservoirData);
    const basins: {[key: string]: BasinClass} = {};

    for (const reservoir of reservoirData) {
      const basinName = reservoir.River_Basin || 'Unknown Basin';
      if (!basins[basinName]) {
        basins[basinName] = new BasinClass(basinName);
      }
      basins[basinName].addReservoir(reservoir);
    }

    for (const basin of Object.values(basins)) {
      for (const reservoir of basin.getReservoirs()) {
        const timeSeriesData = await loadTimeSeriesData(reservoir.Station_ID);
        if(timeSeriesData) {
        reservoir.timeSeriesData = timeSeriesData;
        }
      }
    }
    return basins;
  } catch(error) {
    console.error('Error initializing basins:', error);
    return {};
  }    
}

const ReservoirAnalytics: React.FC = () => {
  const [basins, setBasins] = useState<{ [key: string]: BasinClass }>({});
  const [selectedReservoir, setSelectedReservoir] = useState<Reservoir | null> (null);

  const [data, setData] = useState<BarChartData[]>([]);
  const [selectedReservoirData, setSelectedReservoirData] = useState<TimeSeriesDataLine[]>([]);
  const [rsvrNumber, setNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const basinData = await initializeBasins();
      setBasins(basinData);
      extractTodayLevels(basinData, 'Chalakudy');
    };

    fetchData();
  }, []);

  const extractTodayLevels = async (basinData: { [key: string]: BasinClass }, basinName: string) => {
    const basin = basinData[basinName];

    if(basin) {
      console.log(`Processing basin: ${basinName}`);
      const todayLevels: BarChartData[] = [];
      let rsvrNumber = 0;

      for (const reservoir of basin.getReservoirs()) {
        console.log(`Processing reservoir: ${reservoir.Station}`);
        const reservoirID = reservoir.Station_ID;
        rsvrNumber += 1;

        try {
          const timeSeriesData = await loadTimeSeriesData(reservoirID);
          console.log(`Time series data for ${reservoir.Station}:`, timeSeriesData);

          if(timeSeriesData && timeSeriesData.length > 0) {
            const todayData = timeSeriesData[timeSeriesData.length - 1];
            const level = todayData[Object.keys(todayData)[1]];
            todayLevels.push({damName: reservoir.Station, level, Station_ID: reservoir.Station_ID});
          } else {
            console.warn(`No time series data available for reservoir: ${reservoir.Station}`);
          }
        } catch(error) {
          console.error(`Error fetching  time series data for ${reservoir.Station}:`, error);
        }
      }
      console.log('Today Levels:', todayLevels);
      setNumber(rsvrNumber);
      setData(todayLevels);
    }
  };

  const getReservoirData = (stationId: string): Reservoir | null => {
    for (const basin of Object.values(basins)) {
      const reservoir = basin.getReservoirs().find(r => r.Station_ID === stationId);
      if (reservoir) {
        return reservoir; // Return the found reservoir
      }
    }
    return null; 
  };
  
  const fetchTimeSeriesForSelectedReservoir = async (reservoirID: string): Promise<void> => {
    try {
      const timeSeriesData:TimeSeriesDataLine[] = await loadTimeSeriesData(reservoirID);
      console.log(`Time series data for reservoir ${reservoirID}:`, timeSeriesData);
      
      //Filtering the null values
      const filteredData = timeSeriesData.filter(dataPoint => dataPoint.Level !== null);

      if (filteredData.length > 0) {
        setSelectedReservoirData(filteredData);
      } else {
        console.warn(`No valid time series available`);
        setSelectedReservoirData([]);
      }
    } catch (error) {
      console.error(`Error fetching time series data for reservoir ID ${reservoirID}:`, error);
    }
  };

  useEffect(() => {
    if (selectedReservoir) {
      fetchTimeSeriesForSelectedReservoir(selectedReservoir.Station_ID);
    }
  }, [selectedReservoir]);

  
  const getYDomain = (data: TimeSeriesDataLine[]): [number, number] => {
    // console.log("Data received:", JSON.stringify(data, null, 2));
    if (!Array.isArray(data) || data.length === 0) {
      return[0, 0];
    }
    const validLevels = data.map(d => d.Level);
    const minLevel = Math.min(...validLevels);
    const maxLevel = Math.max(...validLevels);
    return [minLevel , maxLevel]; // Return the min and max for the Y-axis
  };
 
  const generateTicks = (min: number, max: number, step: number): number[] => {
    const ticks = [];
    for (let i = Math.floor(min); i <= Math.ceil(max); i += step) {
      ticks.push(i);
    }
    return ticks;
  };

  const yDomain = getYDomain(selectedReservoirData as TimeSeriesDataLine[]);
  console.log('Ydomain: ', yDomain);
  const ticks = generateTicks(yDomain[0], yDomain[1], 1);

  console.log('Data for BarChart:', data);
  //console.log('Data for LineChart:', selectedReservoir.timeSeriesData);

  return (
    <ThemeProvider theme={theme}>
          <Grid 
            container 
            spacing={1} 
            sx={{ height:'100%', alignItems: 'stretch' }} 
            >

            <Grid size={{xs: 12}} sx={{ height: '50%' }} >
                  <Card sx={{ height: '100%'}}>
                    <CardContent>
                      <Typography variant="h5"> {`Today's Reservoir Levels`}</Typography>
                      <Grid container spacing={1}>
                        <Grid size={{xs: 12, md: 8}} > 
                          <Typography>Reservoir Data in Basin Today</Typography>
                          <ResponsiveContainer width="102%" height={270} style={{ marginLeft: -35, marginTop: 15 }}>
                            <BarChart data={data}>
                              <XAxis 
                              dataKey="damName" 
                              fontSize={10}
                              />
                              <YAxis
                              fontSize={10}
                              />
                              
                                <Bar 
                                dataKey="level" 
                                fill='#00738c'
                                >
                                  {data.map((entry, index) => (
                                    <Cell 
                                    key={`cell-${index}`} 
                                    radius={2}
                                    onClick={() => {
                                     const rsvrData = getReservoirData(entry.Station_ID)
                                     setSelectedReservoir(rsvrData)
                                    }}
                                    fill={entry.Station_ID === selectedReservoir?.Station_ID ? '#8EDCE6' : '#00738c'}
                                    />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                      </Grid>

                      {/* Right side Stats */}
                      <Grid size={{xs: 12, md: 4}} container spacing={1} sx={{ marginTop: -4}}>
                          
                        <Grid size={{xs: 12, md: 6}} 
                        container
                        direction="column" 
                        spacing={1}
                        sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: 2}}
                        >
                              <Grid size={{xs:12}} height='30%'>
                                <Card sx={{
                                  height: '100%',
                                  background: '#000',
                                  opacity: '95%',
                                  color: '#fff',
                                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                  marginBottom: -1,
                                }}>
                                  <CardContent>
                                    <Typography variant='h6' sx={{ fontSize: 12, fontWeight: 300, lineHeight:'15px' }}>Level Indicators</Typography>
                                    <Typography variant='body1' sx={{ fontSize: 28}}>X<span style={{ fontSize: 14, marginLeft: -1  }}> m</span></Typography>
                                      <Typography style={{fontSize:10, fontWeight: 300}}>Warning Level</Typography>
                                      <Typography style={{fontSize:10, fontWeight: 300}}>At FRL</Typography>
                                      <Typography style={{fontSize:10, fontWeight: 300}}>Safe Level</Typography>
                                  </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{xs: 12}} height='10%'>
                              <Card sx={{
                                height: '100%',
                                background: '#000',
                                opacity: '95%',
                                color: '#fff',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                marginBottom: -1,
                              }}>
                                <CardContent>
                                  <Typography variant='h6' sx={{ fontSize: 12, fontWeight: 300,lineHeight:'15px'}}>No. of Reservoirs in Basin</Typography>
                                  <Typography variant='body1' sx={{ fontSize: 28}}>{rsvrNumber}</Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                        </Grid>
                      
                        <Grid size={{ xs:12, md:6}}>
                          <Card sx={{
                            height: '40%',
                            opacity: '95%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                            marginBottom: -8,
                          }}>
                            <MonitoringMapComponent visibleGauges={{
                        PRECIPITATION: false,
                        RESERVOIR: false,
                        TIDAL: false,
                        GROUNDWATER: false,
                        RIVER: false,
                        REGULATOR: false
                      }}/>
                          </Card>
                        </Grid>
                       </Grid>

                       </Grid>
                    </CardContent>
                  </Card>
          </Grid>

            {/* Side Widget Columns */}
            <Grid size={{xs: 12, md: 8}} container direction="column" spacing={1} sx={{height: '50%'}}>
              <Grid size={{ xs:12 }} sx={{ height: '50%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>Reservoir Level in Basin</CardContent>
                  <ResponsiveContainer width="99%" height={130} style={{ marginLeft: -10 }}>
                    {selectedReservoirData && selectedReservoirData.length > 0 ? (
                      <LineChart data={selectedReservoirData}>
                        <XAxis dataKey="TimeStamp" fontSize={7}/>
                        <YAxis
                        domain={yDomain}
                        // ticks={ticks}
                        // tick={{ fill: '#E4F7F2', fontSize: 8 }}
                        // axisLine={false}
                        fontSize={10}
                        />
                        {/* <Area type="monotone" dataKey="Level(m)" stroke="#8EDCE6" fillOpacity={0.7} fill="#8EDCE6"/> */}
                        <Line 
                          type="monotone"
                          dataKey="Level(m)"
                          stroke="#8EDCE6"
                          strokeWidth={1}
                          dot={false}
                        />
                      </LineChart>
                    ):(
                      <Typography>No data available for the selected reservoir.</Typography>
                    )}
                  </ResponsiveContainer>
                </Card>
              </Grid>

              <Grid size={{xs: 12}} sx={{height: 'calc(50% - 15px)'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>Reservoir Storage in Basin</CardContent>
                  <ResponsiveContainer width="99%" height={120} style={{ marginLeft: -25 }}>
                    {selectedReservoirData && selectedReservoirData.length > 0 ? (
                      <LineChart data={selectedReservoirData}>
                        <XAxis dataKey="TimeStamp" fontSize={7}/>
                        <YAxis
                        fontSize={10}
                        />
                        <Line 
                          type="monotone"
                          dataKey="Storage_Percent(%)"
                          stroke="#8EDCE6"
                          strokeWidth={1}
                          dot={false}
                        />
                      </LineChart>
                    ):(
                      <Typography>No data available for the selected reservoir.</Typography>
                    )}
                  </ResponsiveContainer>
                </Card>
              </Grid>
            </Grid>  

            <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{height: '50%'}}>
              <Grid sx={{ height: '30%' }}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>
                    <Grid size={{xs:12}} container direction="row" spacing={1}>
                      <Grid size={{xs:12, md:4}}>
                      <Typography>{selectedReservoir?.Station}</Typography>
                      </Grid>
                      <Grid size={{xs:12, md:8}}>
                        <Grid size={{xs:12}} container direction="row" spacing={0.5} style={{ textAlign: 'center'}}>
                          <Grid size={{xs:12, md:4}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:8, fontWeight: 300}}>FRL Height</Typography>
                            <Typography style={{fontSize:28, marginTop: 15}}>{selectedReservoir?.FRL?.toFixed(1)}<span style={{ fontSize: 10, marginLeft: -2  }}> m</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:4}} >
                            <Typography style={{fontSize:8, fontWeight: 300}}>MDDL</Typography>
                            <Typography style={{fontSize:28, marginTop: 15}}>{selectedReservoir?.MDDL?.toFixed(1)}<span style={{ fontSize: 10, marginLeft: -2  }}> m</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:4}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:8, fontWeight: 300}}>MWL</Typography>
                            <Typography style={{fontSize:28, marginTop: 15}}>{selectedReservoir?.MWL?.toFixed(1)}<span style={{ fontSize: 10, marginLeft: -2  }}> m</span></Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid sx={{height: '30%'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>
                    <Typography >Spillway Charts</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid sx={{height: 'calc(40% - 25px)'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>
                    <Typography>Basin Highlights</Typography>
                    <Grid size={{xs: 12}} container direction="row" spacing={1} sx={{ marginTop: 1}}>
                          <Grid size={{xs:12, md:4}}>
                            <Card sx={{
                              height: '75%',
                              background: '#000',
                              opacity: '95%',
                              color: '#fff',
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                            }}>
                              <CardContent>
                                <Typography variant='h6' sx={{ fontSize: 10, fontWeight: 300, marginTop: -1}}>Basin Average</Typography>
                                <Typography variant='body1' sx={{ fontSize: 20}}>X<span style={{ fontSize: 12, marginLeft: -2  }}> mm</span></Typography>
                              </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, md:4}}>
                          <Card sx={{
                            height: '75%',
                            background: '#000',
                            opacity: '95%',
                            color: '#fff',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
                          }}>
                            <CardContent>
                              <Typography variant='h6' sx={{ fontSize: 10, fontWeight: 300, marginTop: -1}}>Extreme Rainy Days</Typography>
                              <Typography variant='body1' sx={{ fontSize: 20}}>12</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{xs: 12, md:4}}>
                          <Card sx={{
                            height: '75%',
                            background: '#000',
                            opacity: '95%',
                            color: '#fff',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
                          }}>
                            <CardContent>
                              <Typography variant='h6' sx={{ fontSize: 10, fontWeight: 300,  marginTop: -1}}>Season Maximum</Typography>
                              <Typography variant='body1' sx={{ fontSize: 20}}>X<span style={{ fontSize: 12, marginLeft: -2  }}> mm</span></Typography>
                            </CardContent>
                          </Card>
                         </Grid>
                       </Grid>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Grid>
    </ThemeProvider>
  );
};

export default ReservoirAnalytics;