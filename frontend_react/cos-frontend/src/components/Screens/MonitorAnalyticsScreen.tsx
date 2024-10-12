import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import { ThemeProvider } from '@mui/material';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import Papa from 'papaparse';

interface GaugeData {
  Name: string;
  [key: string]: string | number;
}

interface BarChartData {
  name: string;
  rainfall: number;
}

interface CumulativeChartData {
  name: string;
  data: {date: string; rainfall:number} [];
}

const AnalyticsScreen = () => {
  const [data, setData] = useState<BarChartData[]>([]);
  const [cumulativeData, setCumulativeData] = useState<CumulativeChartData[]>([]);

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        console.log('trying?');
        const response = await fetch('/DailyRainfallData.csv');
        // console.log(response.text());
        const csvText = await response.text();
        Papa.parse(csvText, {
          // download: true,
          header: true,
          complete: function(results) {
            console.log('complete parse');
            console.log(results);

            const parsedData = results.data as Array<{ [key: string]: string }>;
        
            if (parsedData.length > 0 && 'Name' in parsedData[0]) {
            const dateColumns = Object.keys(parsedData[0]).filter(key => key !== 'Name');
            const latestDateColumn = dateColumns[dateColumns.length - 3];  

            const latestRainfallData:BarChartData[] = parsedData.map(row=> {
              const gaugeName = row['Name'];
              const latestRainfall = parseFloat(row[latestDateColumn]);
              return {
                name: gaugeName,
                rainfall: isNaN(latestRainfall) ? 0: latestRainfall //handle NaN
              };
            });

            const cumulativeData: CumulativeChartData[] = parsedData.map(row => {
              const gaugeName = row['Name'];
              const data: {date: string; rainfall:number} [] = dateColumns.map(date => ({
                date,
                rainfall: parseFloat(row[date]) || 0
              }));

              return { name: gaugeName, data};
            });

            setData(latestRainfallData);
            setCumulativeData(cumulativeData);
            console.log('Latest Rainfall Data:', latestRainfallData);
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
      <div className="monitor-screen overflow-hidden rounded-[15px] w-full h-full mx-auto relative flex flex-col">  
          <Grid 
            container 
            spacing={1} 
            sx={{ padding: '15px', height:'100%', alignItems: 'stretch' }} 
            >
            {/* Today's Rainfall Widget */}
            <Grid size={{xs: 12}} sx={{ height: '50%' }}>
              <Card sx={{ height: '100%'}}>
                <CardContent>
                  <Typography variant="h5">Today's Rainfall</Typography>
                  <Grid container spacing={2}>
                    {/* Bar Chart - Rechart */}
                    <Grid size={{xs: 12, md: 8}} > 
                      <Typography>Rainfall in Basin Gauges Today</Typography>
                      <ResponsiveContainer width="100%" height={250} style={{ marginLeft: -35 }}>
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

                    {/* Stats cards on the right (2 columns wide) */}
                    <Grid size={{xs: 12, md: 4}} >
                      <Grid container direction="column" spacing={2} style={{marginTop: -30}}>
                        <Grid size={{xs: 12,  md: 5}}>
                          <Card>
                            <CardContent>Today's Maximum Rainfall</CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{xs: 12, md: 5}}>
                          <Card>
                            <CardContent>Average Rain Today</CardContent>
                          </Card>
                        </Grid>
                        <Grid size={{xs: 12, md: 5}}>
                          <Card>
                            <CardContent>Number of Gauges</CardContent>
                          </Card>
                        </Grid>
                        {/* Add more stat cards if needed */}
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Side Widget Columns */}
            <Grid size={{xs: 12, md: 8}} container direction="column" spacing={1} sx={{height: '50%'}}>
              <Grid size={{ xs:12 }} sx={{ height: '60%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>Cumulative Rainfall in Basin</CardContent>
                  <ResponsiveContainer width="99%" height={150} style={{ marginLeft: -25 }}>
                        <LineChart data={data}>
                          {/* <XAxis 
                          dataKey="name" 
                          tick={{ fill: 'white', fontSize: 12 }}
                          axisLine={false}
                          /> */}
                          <YAxis
                           domain={[0, upperLimit]}
                           ticks={ticks}
                           tickLine={false}
                           tick={{ fill: 'white', fontSize: 10 }}
                           axisLine={false}
                           tickSize={10}
                          //  padding={{ top: 10, bottom: 10 }}
                           />
                           {ticks.map(tick => (
                            <ReferenceLine key={tick} y={tick} stroke="#E4F7F2" strokeOpacity="50%" strokeDasharray="3 3" />
                          ))}
                          <Tooltip content={<CustomTooltip active={false} payload={undefined}/>} />
                          {/* <Legend /> */}
                          <Line type="monotone" dataKey="rainfall" fill="#00738c"  />
                        </LineChart>
                      </ResponsiveContainer>
                </Card>
              </Grid>
              <Grid size={{xs: 12}} sx={{height: 'calc(40% - 15px)'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>Monthly Totals</CardContent>
                </Card>
              </Grid>
            </Grid>  

            <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{height: '50%'}}>
              <Grid sx={{ height: '30%' }}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>Gauge Values</CardContent>
                </Card>
              </Grid>
              <Grid sx={{height: 'calc(70% - 15px)'}}>
                <Card sx={{ height: '100%'}}>
                  <CardContent>Basin Highlights</CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
    </ThemeProvider>
  );
};

export default AnalyticsScreen;
