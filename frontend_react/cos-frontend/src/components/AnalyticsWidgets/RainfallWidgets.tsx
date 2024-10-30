import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, ThemeProvider, Breadcrumbs, Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell, Area } from 'recharts';
import Papa from 'papaparse';
import { MonitoringMapComponent } from '../Maps/MonitoringMapComponent';

interface FullData {
  [gaugeName: string]: number[];
}

interface TransformedData {
  date: string;  // The date key
  [gaugeName: string]: number | string;  // The rainfall data for each gaugeName
}

interface BarChartData {
  name: string;
  rainfall: number;
}

const RainfallAnalytics: React.FC = () => {
  const [data, setData] = useState<BarChartData[]>([]);
  const [cumulativeData, setCumulativeData] = useState<TransformedData[]>([]);

  // const [selectedGauge, setSelectedGauge] = useState<Gauge | null> (null);
  const [seasonMax, setSeasonMax] = useState(0);
  const [averageRainfall, setAverageRainfall] = useState(0);

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        console.log('trying?');

        const response = await fetch('/RainfallData.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          // download: true,
          header: true,
          complete: function(results) {
            console.log('complete parse');
            console.log(results);

            const parsedData = results.data as Array<{ [key: string]: string }>;

            if (parsedData.length > 0 && 'Name' in parsedData[0]) {
              const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/;
              const dateColumns = Object.keys(parsedData[0]).filter(key => dateRegex.test(key));

              let fullRainfallData: FullData = {};

              parsedData.forEach(row => {
                const gaugeName = row['Name'];
                fullRainfallData[gaugeName] = fullRainfallData[gaugeName] || [];
                
                dateColumns.forEach(date => {
                  const rainfallValue = parseFloat(row[date]);
                  // Store valid rainfall values
                  if (!isNaN(rainfallValue)) {
                    fullRainfallData[gaugeName].push(rainfallValue);
                  }
                });
              });

              const allRainfallValues = Object.values(fullRainfallData).flat();
              const seasonMax = Math.max(...allRainfallValues);

              const latestDateColumn = dateColumns[dateColumns.length - 3];  
              const latestRainfallData:BarChartData[] = parsedData.map(row=> {
                const gaugeName = row['Name'];
                const latestRainfall = parseFloat(row[latestDateColumn]);
                return {
                  name: gaugeName,
                  rainfall: isNaN(latestRainfall) ? 0: latestRainfall //handle NaN
                };
              });

              let cumulativeSums: { [gaugeName: string]: number } = {};

              const cumulativeTransformedData: TransformedData[] = dateColumns.map(
                (date) => {
                  const [day, month, year] = date.split('/');
                  const formattedDate = `20${year}-${month}-${day}`;
  
                  // Initialize object for each date
                  const row: TransformedData = { date: formattedDate };
  
                  parsedData.forEach((gaugeRow) => {
                    const gaugeName = gaugeRow['Name'];
                    const currentRainfall = parseFloat(gaugeRow[date]);
                    if (!cumulativeSums[gaugeName]) {
                      cumulativeSums[gaugeName] = 0;
                    }
                    // Add current day's rainfall to cumulative sum
                    cumulativeSums[gaugeName] += isNaN(currentRainfall)
                      ? 0
                      : currentRainfall;
  
                    // Assign cumulative values to this row
                    row[gaugeName] = cumulativeSums[gaugeName];
                  });
  
                  return row;
                }
              ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
              setData(latestRainfallData);
              setCumulativeData(cumulativeTransformedData);
              setSeasonMax(seasonMax);
              setAverageRainfall(allRainfallValues.reduce((a, b) => a + b, 0)/ allRainfallValues.length);
              console.log('Data:', data);
              console.log('Cumulative Data:', cumulativeData);
              console.log('Season Max:', seasonMax);
            }
        }
      })

      } catch (error) {
        console.error('error parsing csv');
      }
    }

    fetchCsv();
  }, []);

  const maxRainfall = Math.max(...data.map(d => d.rainfall));
  const avgRainfall = data.reduce((sum, d) => sum + d.rainfall, 0) / data.length;
  const numberOfGauges = data.length;
  
  const upperLimit = Math.ceil(maxRainfall / 10) * 10;
  const ticks = Array.from({ length: upperLimit / 15 + 1 }, (_, i) => i * 15);

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: { active: boolean; payload: any}) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#333',
          opacity: '95%',
          padding: '10px',
          color: '#fff',
          borderRadius: '8px',
          width: '125px',  // Custom width
          height: '40px',  // Custom height
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
        }}>
          {/* <p>{`Month: ${label}`}</p> */}
          <p>{`Rainfall: ${payload[0].value} mm`}</p>
        </div>
      );
    }

    return null;
  };

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
                      <Typography variant="h5">
                        {`Today's Rainfall`}
                      </Typography>
                      <Grid container spacing={1}>
                        {/* Bar Chart - Rechart */}
                        <Grid size={{xs: 12, md: 8}} > 
                          <Typography>Rainfall in Basin Gauges Today</Typography>
                          <ResponsiveContainer width="102%" height={250} style={{ marginLeft: -35, marginTop: 10 }}>
                            <BarChart data={data}>
                              {/* <XAxis dataKey="name" /> */}
                              <YAxis
                                domain={[0, upperLimit]}
                                ticks={ticks}
                                tickLine={false}
                                tick={{ fill: '#E4F7F2', fontSize: 12 }}
                                axisLine={false}
                                // tickSize={10}
                                // interval={0}
                                // tickFormatter={(value) => `${value} mm`}
                                // tickCount={3}
                                // minTickGap={10}
                                // padding={{ top: 10, bottom: 10 }}
                              />
                              {ticks.map(tick => (
                                <ReferenceLine key={tick} y={tick} stroke="#E4F7F2"  strokeOpacity="50%" strokeDasharray="5 5" />
                              ))}
                              <Tooltip content={<CustomTooltip active={false} payload={undefined} />}/>
                              {/* <Legend /> */}
                              <Bar 
                              dataKey="rainfall" 
                              fill='#ff0000'
                              >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="#00738c" />
                              ))}
                              </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                      </Grid>

                      {/* Right side Stats */}
                      <Grid size={{xs: 12, md: 4}} container spacing={1} sx={{ marginTop: -4}}>
                          
                        <Grid 
                        size={{xs: 12, md: 4}} 
                        container 
                        direction="column" 
                        spacing={2}
                        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                        >
                              <Grid size={{xs:12}} sx={{ marginBottom: -1.5}} >
                                <Card sx={{
                                  height: '100%',
                                  background: '#000',
                                  opacity: '95%',
                                  color: '#fff',
                                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                  marginBottom: -1,
                                }}>
                                  <CardContent>
                                    <Typography variant='h6' sx={{ fontSize: 12, fontWeight: 300, lineHeight:'15px' }}>Today's Max Rainfall</Typography>
                                    <Typography variant='body1' sx={{ fontSize: 32}}>{maxRainfall}<span style={{ fontSize: 14, marginLeft: -2  }}> mm</span></Typography>
                                  </CardContent>
                                </Card>
                            </Grid>
                            <Grid size={{xs: 12}} sx={{ marginBottom: -1.5}}>
                              <Card sx={{
                                height: '100%',
                                background: '#000',
                                opacity: '95%',
                                color: '#fff',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                marginBottom: -1,
                              }}>
                                <CardContent>
                                  <Typography variant='h6' sx={{ fontSize: 12, fontWeight: 300,lineHeight:'15px'}}>Today's Avg Rainfall</Typography>
                                  <Typography variant='body1' sx={{ fontSize: 32}}>{avgRainfall.toFixed(2)}<span style={{ fontSize: 14, marginLeft: -2 }}> mm</span></Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                            <Grid size={{xs: 12}}>
                              <Card sx={{
                                height: '100%',
                                background: '#000',
                                opacity: '95%',
                                color: '#fff',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                                marginBottom: -1,
                              }}>
                                <CardContent>
                                  <Typography variant='h6' sx={{ fontSize: 12, fontWeight: 300,lineHeight:'15px'}}>No. of Gauges</Typography>
                                  <Typography variant='body1' sx={{ fontSize: 32}}>{numberOfGauges}</Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                        </Grid>
                      
                        <Grid size={{ xs:12, md:8}}>
                          <Card sx={{
                            height: 'calc(40% - 21px)',
                            opacity: '95%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
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
              <Grid size={{ xs:12 }} sx={{ height: '70%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>Cumulative Rainfall in Basin</CardContent>
                  <ResponsiveContainer width="99%" height={200} style={{ marginLeft: -25 }}>
                        <LineChart data={cumulativeData}>
                          <XAxis 
                          dataKey="date" 
                          // scale="time"
                          // type="category"
                          // tickFormatter={(tick)=> new Date(tick).toLocaleDateString()}
                          fontSize="10"
                          />
                          <YAxis
                          //  domain={[0, upperLimit]}
                          //  ticks={ticks}
                          //  tickLine={false}
                          //  tick={{ fill: 'white', fontSize: 10 }}
                          //  axisLine={false}
                          fontSize={10}
                          //  tickSize={10}
                          //  padding={{ top: 10, bottom: 10 }}
                           />
                           {/* {ticks.map(tick => (
                            <ReferenceLine key={tick} y={tick} stroke="#E4F7F2" strokeOpacity="50%" strokeDasharray="3 3" />
                          ))} */}
                          <Tooltip/>
                          {/* <Legend /> */}
                          {Object.keys(cumulativeData[0] || {})
                            .filter((key) => key !== 'date') // Filter out the 'date' key to only get gauge names
                            .slice(1) //skipping first gauge
                            .map((gaugeName, index) => (
                              <Line
                                key={index + 1}
                                type="monotone"
                                dataKey={gaugeName} // Use gaugeName as the data key
                                dot={false}
                                stroke="#596161"
                                strokeWidth={0.25}  
                              />
                            ))}
                            <Line
                              type="monotone"
                              dataKey={Object.keys(cumulativeData[0] || {}).filter(key => key !== 'date')[0]}
                              strokeWidth={2}
                              dot={false}
                              stroke="#8EDCE6"
                              />
                        </LineChart>
                      </ResponsiveContainer>
                </Card>
              </Grid>
              <Grid size={{xs: 12}} sx={{height: 'calc(30% - 15px)'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>Monthly Totals</CardContent>
                </Card>
              </Grid>
            </Grid>  

            <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{height: '50%'}}>
              <Grid sx={{ height: '30%' }}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>
                    <Grid size={{xs:12}} container direction="row" spacing={1}>
                      <Grid size={{xs:12, md:4}}>
                      <Typography>Gauge Values</Typography>
                      </Grid>
                      <Grid size={{xs:12, md:8}}>
                        <Grid size={{xs:12}} container direction="row" spacing={0.5} style={{ textAlign: 'center'}}>
                          <Grid size={{xs:12, md:3}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:8, fontWeight: 300}}>Today's Record</Typography>
                            <Typography style={{fontSize:36, marginTop: 15}}>18<span style={{ fontSize: 10, marginLeft: -2  }}> mm</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:3}} >
                            <Typography style={{fontSize:8, fontWeight: 300}}>Total Rainfall</Typography>
                            <Typography style={{fontSize:36, marginTop: 15}}>31<span style={{ fontSize: 10, marginLeft: -2  }}> mm</span></Typography>
                          </Grid>
                          <Grid size={{xs:12, md:3}} style={{ textAlign: 'center'}}>
                            <Typography style={{fontSize:8, fontWeight: 300}}>Extreme Days</Typography>
                            <Typography style={{fontSize:36, marginTop: 15}}>10</Typography>
                          </Grid>
                          <Grid size={{xs:12, md:3}}>
                            <Typography style={{fontSize:8, fontWeight: 300}}>Max Record</Typography>
                            <Typography style={{fontSize:36, marginTop: 15}}>43<span style={{ fontSize: 10, marginLeft: -2  }}> mm</span></Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid sx={{height: 'calc(70% - 15px)'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>
                    <Typography>Basin Highlights</Typography>
                    <Grid size={{xs: 12}} container direction="row" spacing={1} sx={{ marginTop: 1}}>
                          <Grid size={{xs:12, md:4}}>
                            <Card sx={{
                              height: '90%',
                              background: '#000',
                              opacity: '95%',
                              color: '#fff',
                              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
                            }}>
                              <CardContent>
                                <Typography variant='h6' sx={{ fontSize: 10, fontWeight: 300}}>Basin Average</Typography>
                                <Typography variant='body1' sx={{ fontSize: 20}}>{averageRainfall.toFixed(1)}<span style={{ fontSize: 12, marginLeft: -2  }}> mm</span></Typography>
                              </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, md:4}}>
                          <Card sx={{
                            height: '90%',
                            background: '#000',
                            opacity: '95%',
                            color: '#fff',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
                          }}>
                            <CardContent>
                              <Typography variant='h6' sx={{ fontSize: 10, fontWeight: 300}}>Extreme Rainy Days</Typography>
                              <Typography variant='body1' sx={{ fontSize: 20}}>12</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{xs: 12, md:4}}>
                          <Card sx={{
                            height: '90%',
                            background: '#000',
                            opacity: '95%',
                            color: '#fff',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
                          }}>
                            <CardContent>
                              <Typography variant='h6' sx={{ fontSize: 10, fontWeight: 300}}>Season Maximum</Typography>
                              <Typography variant='body1' sx={{ fontSize: 20}}>{seasonMax}<span style={{ fontSize: 12, marginLeft: -2  }}> mm</span></Typography>
                            </CardContent>
                          </Card>
                         </Grid>
                       </Grid>
                       <Typography>Basin Details</Typography>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Grid>
    </ThemeProvider>
  );
};

export default RainfallAnalytics;