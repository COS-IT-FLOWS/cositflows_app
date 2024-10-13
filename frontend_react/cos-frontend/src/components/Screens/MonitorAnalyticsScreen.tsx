import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import { ThemeProvider } from '@mui/material';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import Papa from 'papaparse';
import dayjs from 'dayjs';

// interface GaugeData {
//   Name: string;
//   [key: string]: string | number;
// }

interface TransformedData {
  date: string;  // The date key
  [gaugeName: string]: number | string;  // The rainfall data for each gaugeName
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
  const [cumulativeData, setCumulativeData] = useState<TransformedData[]>([]);

  useEffect(() => {
    const fetchCsv = async () => {
      try {
        console.log('trying?');

        const response = await fetch('/DailyRainfallData.csv');
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
              
              const latestDateColumn = dateColumns[dateColumns.length - 3];  
              const latestRainfallData:BarChartData[] = parsedData.map(row=> {
                const gaugeName = row['Name'];
                const latestRainfall = parseFloat(row[latestDateColumn]);
                return {
                  name: gaugeName,
                  rainfall: isNaN(latestRainfall) ? 0: latestRainfall //handle NaN
                };
              });
              
              // Create a flat structure where each date has rainfall values for each gauge
              const transformedData: TransformedData[] = dateColumns.map(date => {
                const [day, month, year] = date.split('/');
                const formattedDate = `20${year}-${month}-${day}`;

                // Initialize object for each date
                const row: TransformedData = { date: formattedDate };
                
                parsedData.forEach((gaugeRow) => {
                  const gaugeName = gaugeRow['Name'];
                  // Assign gauge name values to this row
                  row[gaugeName] = isNaN(parseFloat(gaugeRow[date]))
                    ? 0
                    : parseFloat(gaugeRow[date]);
                });

                return row;
                }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              // const cumulativeData: CumulativeChartData[] = parsedData.map(row => {
              //   const gaugeName = row['Name'];
              //   const data: {date: string; rainfall: number}[] = dateColumns.map(date => {
              //     const [day, month, year] = date.split('/'); // Split DD/MM/YY format
              //     const formattedDate = new Date(`20${year}-${month}-${day}`).toISOString().split('T')[0]; // Format to YYYY-MM-DD
              //     return {
              //       date: formattedDate,
              //       rainfall: isNaN(parseFloat(row[date])) ? 0 : parseFloat(row[date])
              //     };
              //   }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

              //   return { name: gaugeName, data};
              // });

              setData(latestRainfallData);
              // setCumulativeData(cumulativeData);
              setCumulativeData(transformedData);
              console.log('Cumulative Data:', cumulativeData);
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

  const latestMonth = dayjs(cumulativeData[cumulativeData.length - 1].date).month(); // Get the latest month number
  const latestMonthData = cumulativeData.filter((item) => dayjs(item.date).month() === latestMonth);

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
                  <ResponsiveContainer width="100%" height={200} style={{ marginLeft: -25, marginTop: -20 }}>
                        <LineChart data={cumulativeData}>
                          <XAxis 
                          dataKey="date" 
                          // scale="time"
                          // type="category"
                          // tickFormatter={(tick)=> new Date(tick).toLocaleDateString()}
                          fontSize="10"
                          />
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
                          <Tooltip />
                          {/* <Legend /> */}
                          {Object.keys(cumulativeData[0] || {})
                            .filter((key) => key !== 'date') // Filter out the 'date' key to only get gauge names
                            .map((gaugeName, index) => (
                              <Line
                                key={index}
                                type="monotone"
                                dataKey={gaugeName} // Use gaugeName as the data key
                                dot={false}
                                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each line
                              />
                            ))}
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
