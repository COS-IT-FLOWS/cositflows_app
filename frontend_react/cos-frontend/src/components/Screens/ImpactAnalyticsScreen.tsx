import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, ReferenceLine} from 'recharts';
import { SelectChangeEvent, Card, CardContent, Typography, ThemeProvider, Toolbar, Breadcrumbs, Link, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import theme from '../theme';
import { useEffect, useState } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import population from './Population.jpg';
import buildings from './buildings.jpg';
import agriculture from './Agriculture.jpg';
import roads from './roads.jpg';


interface PanchayatData {
  Index: number;
  Panchayat: string;
  Buildings: number;
  "Roads (km)": number;
  Threshold: number;
  Area: number;
  "Agriculture (sq.km)": number;
  Population: number;
  FloodElevation: number | null;
}

interface ChartData {
  Panchayat: string;
  Population?: number;
  Agriculture?: number;
  Buildings?: number;
  Roads?:number;
  color: string;
}

const ImpactAnalytics: React.FC = () => { 
  const [data, setData] = useState<PanchayatData[]>([]);
  const [selectedPanchayat, setSelectedPanchayat] = useState<string>('Puthenvelikkara');
  const [selectedView, setSelectedView] = useState('population');

  const getImageForView = () => {
    switch (selectedView) {
      case 'Population':
        return population;
      case 'Agriculture':
        return agriculture;
      case 'Buildings':
        return buildings;
      case 'Roads':
        return roads;
      default:
        return population;
    }
  };

  const handleCardClick = (view: string) => {
    setSelectedView(view);
  };

  useEffect(() => {
    fetch('/ImpactData.json')
         .then(response => response.json())
         .then(data => setData(data))
         .catch(error => console.error('Error fetching data:', error));
      }, []);
    
  const panchayats = data.map(item => item.Panchayat);
  const handlePanchayatChange = (event: SelectChangeEvent<string>) => {
    setSelectedPanchayat(event.target.value as string);
  }

  const selectedIndex = panchayats.indexOf(selectedPanchayat);
  const startIndex = Math.max(0, selectedIndex - 2); 
  const endIndex = Math.min(data.length, selectedIndex + 3);
  const displayedData: ChartData[] = data.slice(startIndex, endIndex).map(item => ({
    Panchayat: item.Panchayat,
    Population: item.Population,
    Agriculture: item["Agriculture (sq.km)"] as number,
    Buildings: item.Buildings,
    Roads: item["Roads (km)"] as number,
    color: item.Panchayat === selectedPanchayat ? '#00738c' : 'rgba(255, 99, 132, 0.6)',
    fill: item.Panchayat === selectedPanchayat ? '#8EDCE6' : '#00738c',
  }));
  
  return (
    <ThemeProvider theme={theme}>
      <div className="monitor-screen overflow-auto rounded-[15px] w-full h-full mx-auto relative bg-slate-200">  
        <Grid 
          container 
          spacing={1} 
          sx={{ padding: '15px', height:'100%', alignItems: 'stretch' }} 
          >

        <Grid container direction="row" spacing={0} sx={{ width: '100%', height: '100%'}}>
          <Grid size={{xs: 12}} sx={{ height: '5%', alignItems: 'end'}}>  
            <Grid className='flex flex-row font-inter gap-1'>
                <Breadcrumbs 
                sx={{
                  maxWidth: 185,
                  whiteSpace: 'nowrap',
                  display: 'flex'
                }}
                separator={<NavigateNextIcon fontSize="small" sx={{color: '#CAC9C9'}}/>} 
                aria-label="breadcrumb"
                >
                  <Link underline="none" sx={{padding: '0px'}} href="#" color='#CAC9C9'>
                    District
                  </Link>
                  <Link underline="none" sx={{padding: '0px', marginLeft: -0.5}} href="#" color='#CAC9C9'>
                    Panchayat
                  </Link>
                  <Typography>{' '}</Typography>
                </Breadcrumbs>

                
                <FormControl sx={{ width : '150px', height: '100%', bgcolor: '#18181b',opacity: '95%', borderRadius: '5px'}}>
                  {/* <InputLabel shrink={true} id='panchayat-select-label' sx={{color:'white'}}>Panchayat</InputLabel> */}
                  <Select 
                    placeholder='panchayat'
                    labelId='panchayat-select-label'
                    id="panchayat-select"
                    value={selectedPanchayat}
                    onChange={handlePanchayatChange}
                  >
                    {panchayats.map(panchayat => (
                      <MenuItem key={panchayat} value={panchayat} sx={{bgcolor: '#18181b'}}>
                        {panchayat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </Grid>
            </Grid>
        
        <Grid size={{xs:12}} sx={{height:'95%'}}>
          <Grid container spacing={1} sx={{ height: '100%', alignItems: 'stretch' }}>
            {/* Left Side Map */}
            <Grid size={{xs: 12, md: 4}} container direction="column" spacing={1} sx={{ height: '100%' }}>
              <Grid size={{xs: 12}} sx={{ height: '88%' }}>
                <Card sx={{ height: '100%', bgcolor: 'white'}}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                    <img src={getImageForView()} alt={selectedView} className="w-full h-fit"/>
                  </div>
                </Card>
              </Grid>
              <Grid size={{xs:12}} sx={{ height: '10.7%' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>Legend</CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Right Side Stats */}
            <Grid 
            size={{xs: 12, md: 8}} 
            container direction="column" 
            spacing={1} 
            sx={{ height: '100%'}}>
              {/* Parent Card */}
                <Card sx={{height: '100%' , overflowY: 'auto', display: 'flex', flexDirection: 'column', p: 2}}>
                  
                  {/* Population Card */}
                  <Grid  sx={{ mb: 2 }}>
                    <Card sx={{ 
                      flexGrow: 1, 
                      backgroundColor: selectedView === 'Population' ? '#000' : 'transparent',
                      cursor: 'pointer',
                      minHeight: '150px',
                    }}
                    onClick={() => handleCardClick('Population')}
                    >
                      <CardContent>
                      <Typography sx={{mb:2, mt:0.5, ml: 2}}>Population Impact</Typography>
                        <Grid size={{xs:12}} container direction="row" spacing={1}>
                          <Grid size={{xs:12, md:8}} sx={{marginBottom: -3, marginLeft: -3, marginTop: -1}}>
                           <ResponsiveContainer width="101%" height={150}>
                              <BarChart data={displayedData}>
                                <XAxis dataKey="Panchayat" fontSize={8} />
                                <YAxis fontSize={8}/>
                                <Tooltip/>
                                 <Bar 
                                  dataKey="Population"
                                  fill={selectedPanchayat === 'red' ? "#8EDCE6" : "#00738c"}
                                   />
                              </BarChart>
                           </ResponsiveContainer>
                          </Grid>

                          <Grid size={{xs:12, md:4}} sx={{mt: -5}} >
                            <Grid sx={{mx: 3}} height='50%'>
                              <Typography sx={{mb: 1}}>{selectedPanchayat} Population</Typography>
                              <Typography style={{fontSize:12, fontWeight: 300}}>Total Population</Typography>
                              <Typography style={{fontSize:28, marginTop: 1}}>33185</Typography>
                            </Grid>
                            <Grid height='50%'>
                              {/* Enter LSG details */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card> 
                  </Grid> 

                  {/* LULC */}
                  <Grid sx={{ mb: 2 }}>
                    <Card sx={{ flexGrow: 1,
                     backgroundColor: selectedView === 'Agriculture' ? '#000' : 'transparent',
                     cursor: 'pointer',
                     minHeight: '150px',
                    }}
                    onClick={() => handleCardClick('Agriculture')}
                    >
                      <CardContent>
                      <Typography sx={{mb:2, mt:0.5, ml: 2}}>Agriculture Impact</Typography>
                        <Grid size={{xs:12}} container direction="row" spacing={1}>
                          <Grid size={{xs:12, md:8}} sx={{marginBottom: -2, marginLeft: -3, marginTop: -1}}>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={displayedData}>
                                  <XAxis dataKey="Panchayat" fontSize={8} />
                                  <YAxis fontSize={8}/>
                                  <Tooltip/>
                                  <Bar dataKey="Agriculture" fill="#00738c"/>
                                </BarChart>
                            </ResponsiveContainer>
                          </Grid>

                                  <Grid size={{xs:12, md:4}} sx={{mt: -5}} >
                                    <Grid sx={{mx: 3}} height='50%'>
                                      <Typography sx={{mb: 1}}>{selectedPanchayat} Agriculture</Typography>
                                      <Typography style={{fontSize:12, fontWeight: 300}}>Total Agricultural Area</Typography>
                                      <Typography style={{fontSize:28, marginTop: 1}}>X <span style={{ fontSize: 10, marginLeft: -5  }}>m</span></Typography>
                                    </Grid>
                                    <Grid height='50%'>
                                     {/* Enter LSG details */}
                                    </Grid>
                                  </Grid>
                                </Grid>
                                
                            </CardContent>
                          </Card> 
                        </Grid> 

                    {/* Buildings */}
                    <Grid sx={{ mb: 2 }}>
                      <Card sx={{ flexGrow: 1, 
                        backgroundColor: selectedView === 'Buildings' ? '#000' : 'transparent',
                        cursor: 'pointer',
                        minHeight: '150px',
                    }}
                      onClick={() => handleCardClick('Buildings')}
                      >
                        <CardContent>
                        <Typography sx={{mb:2, mt:0.5, ml: 2}}>Building Impact</Typography>
                          <Grid size={{xs:12}} container direction="row" spacing={1}>
                            <Grid size={{xs:12, md:8}} sx={{marginBottom: -2, marginLeft: -3, marginTop: -1}}>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={displayedData}>
                                  <XAxis dataKey="Panchayat" fontSize={8} />
                                  <YAxis fontSize={8}/>
                                  <Tooltip/>
                                  <Bar dataKey="Buildings" fill="#00738c"/>
                                </BarChart>
                            </ResponsiveContainer>
                            </Grid>

                                    <Grid size={{xs:12, md:4}} sx={{mt: -5}} >
                                      <Grid sx={{mx: 3}} height='50%'>
                                        <Typography sx={{mb: 1}}>{selectedPanchayat} Buildings</Typography>
                                        <Typography style={{fontSize:12, fontWeight: 300}}>Total No. Of Buildings</Typography>
                                        <Typography style={{fontSize:28, marginTop: 1}}>431</Typography>
                                      </Grid>
                                      <Grid height='50%'>
                                      {/* Enter LSG details */}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  
                              </CardContent>
                            </Card> 
                        </Grid> 

                    {/* Roads */}
                    <Grid sx={{ mb: 2 }}>
                      <Card sx={{ flexGrow: 1, 
                        backgroundColor: selectedView === 'Roads' ? '#000' : 'transparent',
                        cursor: 'pointer',
                        minHeight: '150px',
                        marginBottom: -2,
                    }}
                      onClick={() => handleCardClick('Roads')}
                      >
                        <CardContent>
                        <Typography sx={{mb:2, mt:0.5, ml: 2}}>Road Impact</Typography>
                          <Grid size={{xs:12}} container direction="row" spacing={1}>
                            <Grid size={{xs:12, md:8}} sx={{marginBottom: -2, marginLeft: -3, marginTop: -1}}>
                            <ResponsiveContainer width="100%" height={150}>
                                <BarChart data={displayedData}>
                                  <XAxis dataKey="Panchayat" fontSize={8} />
                                  <YAxis fontSize={8}/>
                                  <Tooltip/>
                                  <Bar dataKey="Roads" fill="#00738c"/>
                                </BarChart>
                            </ResponsiveContainer>
                            </Grid>

                                    <Grid size={{xs:12, md:4}} sx={{mt: -5}} >
                                      <Grid sx={{mx: 3}} height='50%'>
                                        <Typography sx={{mb: 1}}>{selectedPanchayat} Roads</Typography>
                                        <Typography style={{fontSize:12, fontWeight: 300}}>Total Road Length Affected</Typography>
                                        <Typography style={{fontSize:28, marginTop: 1}}>92.63 km</Typography>
                                      </Grid>
                                      <Grid height='50%'>
                                      {/* Enter LSG details */}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  
                              </CardContent>
                            </Card> 
                        </Grid> 

                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  </div>
  </ThemeProvider>
  );
};

export default ImpactAnalytics;