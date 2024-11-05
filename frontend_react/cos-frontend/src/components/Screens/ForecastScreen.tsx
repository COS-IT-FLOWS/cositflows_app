import React, { useState, useEffect } from "react";
import { useSprings, useSpring, animated } from 'react-spring';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, ThemeProvider, Button, TextField, styled } from '@mui/material';
import theme from "../theme";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

interface DamData {
  Dam: string;
  'Dam Connection List': string;
  'Dam Spill List': string;
  'Catchment Area (sq,km)': number;
  'Input Runoff (mm)': number;
  'Inflow (Mm3)': number;
  'Percent Storage (%)': number;
  'Gross Storage Capacity (Mm3)': number;
  'Maximum Possible Diversion (Mm3/day)': number;
  'Inflow after diversion (Mm3/day)': number;
  'Expected Spill (Mm3/day)': number;
  'Updated Storage (%)': number;
}

interface DamProperties {
  'Input Runoff (mm)': number;
  'Percent Storage (%)': number;
  'Catchment Area (sq,km)': number;
  'Gross Storage Capacity (Mm3)': number;  
  'Maximum Possible Diversion (Mm3/day)': number;
  'Inflow after diversion (Mm3/day)': number;
  'Updated Storage (%)': number;
  'Expected Spill (Mm3/day)': number;
}

interface InputRunoffStorage {
  input_runoff: number;
  storage_pct: number;
}

interface Node{
   name: string;
   neighbors?: string[];
}

const readAdjacencyList = (df: any, columnName: string): Map<string, string[]> => {
  const adjacencyList = new Map<string, string[]>();
  for (let i = 0; i < df.shape[0]; i++) {
    const nodeName = df.index[i];
    const neighborString = df.loc(nodeName, columnName);
    const neighbors = neighborString ? neighborString.split(',').map((n: string) => n.trim()) : [];
    adjacencyList.set(nodeName, neighbors);
  }
  return adjacencyList;
};

const extractAdjacencyList = (data: any): Map<string, string[]> => {
  const adjacencyList = new Map<string, string[]>();
  const headers = Object.keys(data[0]);

  for (const row of data) {
    const dam = row[headers[0]];
    const neighbors: string[] = [];

    for (let i = 1; i < headers.length; i++) {
      if (row[headers[i]] !== '' && row[headers[i]] !== null) {
        neighbors.push(headers[i]);
      }
    }
    console.log(`Dam: ${dam}, Neighbors: ${neighbors}`);
    
    if (neighbors.length > 0) {
      adjacencyList.set(dam, neighbors);
    }
  }

  return adjacencyList;
};

const isDAG = (adjacencyList: Map<string, string[]>): boolean => {
  const visited = new Map<string, string>();

  const dfs = (node: string): boolean => {
    if (visited.get(node) === 'In Progress') {
      return false;
    }

    if (visited.get(node) === 'Visited') {
      return true;
    }

    visited.set(node, 'In Progress');

    for (const neighbor of adjacencyList.get(node) || []) {
      if (!dfs(neighbor)) {
        return false;
      }
    }

    visited.set(node, 'Visited');
    return true;
  };

  for (const node of adjacencyList.keys()) {
    if (visited.get(node) === 'Not Visited') {
      if (!dfs(node)) {
        return false;
      }
    }
  }

  return true;
};

const topologicalSort = (adjacencyList: Map<string, string[]>): string[] => {
  const inDegree = new Map<string, number>();
  const queue: string[] = [];

  for (const node of adjacencyList.keys()) {
    inDegree.set(node, (adjacencyList.get(node) || []).length);
  }

  for (const node of adjacencyList.keys()) {
    if (inDegree.get(node) === 0) {
      queue.push(node);
    }
  }

  const result: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const neighbor of adjacencyList.get(node) || []) {
      const newInDegree = inDegree.get(neighbor)! - 1;
      inDegree.set(neighbor, newInDegree);

      if (newInDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
};

interface DamProps {
  level: number;
  label: string;
  x: number;
  y: number;
}

const SVG_WIDTH = 800;
const SVG_HEIGHT = 800;

const Dam: React.FC<DamProps>= ({ level, label, x, y}) => {
  const damHeight = 75;
  const waterHeight = level * (damHeight/100);

  const animationProps = useSpring({
    height: `${waterHeight}px`,
    from: { height: '0px' },
    config: { tension: 200, friction: 20 }
  });

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width="50" height={damHeight} fill="#E1EFFE" opacity="90%" />
      <animated.rect 
      y={damHeight - waterHeight} 
      width="50" 
      height={animationProps.height} 
      fill="#61B3FF" 
      />
      <text x="25" y={damHeight + 8} textAnchor="middle" fontSize="8" fill='white' >{label}</text>
    </g>
  );
};

const Arrow: React.FC<{ x1: string; y1: string; x2: string; y2: string; visible: boolean }> = ({ x1, y1, x2, y2, visible }) => {
  const arrowAnimation = useSpring({
    opacity: visible ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 500 }
  });

  return (
    <animated.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#BDD3CE"
      strokeWidth="1"
      markerEnd="url(#arrowhead)"
      style={arrowAnimation}
    />
  );
};


const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#0000',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});


const ForecastScreen: React.FC = () => {
  const navigate = useNavigate();
  const [rainfall, setRainfall] = useState<number | null>(null);

  // Visualization variables
  const [levels, setLevels] = useState([80, 80, 70, 80, 80, 75, 78, 68]);
  const [visibleArrows, setVisibleArrows] = useState([false, false, false, false, false, false, false]);
  const [showResults, setShowResults] = useState(false);
  
  // IRM Data variables
  const [damData, setDamData] = useState<DamData[]>([]);
  const [adjacencyList, setAdjacencyList] = useState<Map<string, string[]> | null>(null);
  const [results, setResults] = useState({});
  const [spillData, setSpillData] = useState<Map<string, string[]> | null>(null);
  const [propertiesData, setPropertiesData] = useState<Map<string, any> | null>(null);
  const [integrationDict, setIntegrationDict] = useState<Record<string, string[]>>({});

  useEffect(() => {
    // Fetch CSV data from the public folder
    const fetchDamData = async () => {
      const response = await fetch('/IRMData.csv'); // Adjust the path accordingly
      const text = await response.text();
      Papa.parse<DamData>(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setDamData(results.data);
        },
      });
    };
    fetchDamData();
  }, []);

  useEffect(() => {
    // fetch dam connection data
    const fetchAdjacencyData = async () => {
      const response = await fetch('/DamFlowData.csv'); // Adjust the path accordingly
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const adjacencyList= extractAdjacencyList(results.data);
          setAdjacencyList(adjacencyList);
        },
      });
    };
    fetchAdjacencyData();
  }, []);

  useEffect(() => {
    // check if dag
    if (adjacencyList) {
      if (!isDAG(adjacencyList)) {
          console.error("The graph is not a DAG.");
          } else {
            const sortedDams = topologicalSort(adjacencyList);
          console.log("Topologically sorted dams:", sortedDams);
        }
      }
   }, [adjacencyList]);
    
   useEffect(() => {
    // Fetch spill data 
    const fetchSpillData = async () => {
      const response = await fetch('/SpillData.csv'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          console.log('Parsed CSV data:', results.data);
          const spillDict = extractAdjacencyList(results.data);
          console.log('Extracted spill data:', spillDict);
          setSpillData(spillDict);
        },
      });
    };
    fetchSpillData();
  }, []);

  useEffect(() => {
    // Fetch dam properties data 
    const fetchPropertiesData = async () => {
      const response = await fetch('/DamProperties.csv'); 
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const propertiesDict = new Map<string, any>();
          results.data.forEach((row: any) => {
            propertiesDict.set(row.Dam, row);
          }, {});
          setPropertiesData(propertiesDict);
        },
      });
    };
    
    console.log('Props data:', propertiesData);
    fetchPropertiesData();
  }, []);

const RUNOFF_COEFFICIENT = 1;

const updateStorageAndSpill = (
  adjacencyList: Map<string, string[]>,
  propertiesData: Map<string, DamProperties>, 
  spillDict: Map<string, string[]>, 
  inputRunoffStoragePct: Record<string, InputRunoffStorage>, 
  integrationDict: Record<string, string[]>
  ): Map<string, DamProperties> => {
  const updatedProperties = new Map(propertiesData); // Create a shallow copy of propertiesData
  const topologicalSortedDams = topologicalSort(adjacencyList); // You need to implement this function
  const processedIntegratedDams = new Set<string>();

  for (const dam of topologicalSortedDams) {
    console.log(`Processing ${dam}`);
    if (processedIntegratedDams.has(dam)) {
      console.log(`The dam ${dam} has already been processed as part of an integrated reservoir system.`);
      continue;
    }

    // Handle input runoff storage percentage
    if (inputRunoffStoragePct[dam]) {
      updatedProperties.get(dam)!['Input Runoff (mm)'] = inputRunoffStoragePct[dam].input_runoff;
      updatedProperties.get(dam)!['Percent Storage (%)'] = inputRunoffStoragePct[dam].storage_pct;
    }

    // Process integrated dams together
    if (integrationDict[dam] && integrationDict[dam].length > 0) {
      // Combined properties of the integrated system
      let combinedInflow = updatedProperties.get(dam)!['Catchment Area (sq,km)'] * updatedProperties.get(dam)!['Input Runoff (mm)'] * (1e-3);
      let combinedStorage = updatedProperties.get(dam)!['Percent Storage (%)'] / 100 * updatedProperties.get(dam)!['Gross Storage Capacity (Mm3)'];
      let combinedMaxDiversion = updatedProperties.get(dam)!['Maximum Possible Diversion (Mm3/day)'];
      let combinedMaxStorage = updatedProperties.get(dam)!['Gross Storage Capacity (Mm3)'];

      // Initialize diversion and spill counts
      let combinedDiversionCount = 0;
      let combinedSpillCount = 0;

      for (const integratedNeighbor of integrationDict[dam]) {
        processedIntegratedDams.add(integratedNeighbor);
        // Update inflow and storage for integrated neighbors
        updatedProperties.get(integratedNeighbor)!['Inflow after diversion (Mm3/day)'] += updatedProperties.get(integratedNeighbor)!['Catchment Area (sq,km)'] * updatedProperties.get(integratedNeighbor)!['Input Runoff (mm)'] * (1e-3);
        combinedInflow += updatedProperties.get(integratedNeighbor)!['Catchment Area (sq,km)'] * updatedProperties.get(integratedNeighbor)!['Input Runoff (mm)'] * (1e-3);
        combinedStorage += updatedProperties.get(integratedNeighbor)!['Percent Storage (%)'] / 100 * updatedProperties.get(integratedNeighbor)!['Gross Storage Capacity (Mm3)'];
        combinedMaxDiversion += updatedProperties.get(integratedNeighbor)!['Maximum Possible Diversion (Mm3/day)'];
        combinedMaxStorage += updatedProperties.get(integratedNeighbor)!['Gross Storage Capacity (Mm3)'];

        // Count diversions and spills
        combinedDiversionCount += adjacencyList.get(integratedNeighbor)?.length || 0;
        combinedSpillCount +=  spillDict.get(integratedNeighbor)?.length || 0;
      }

      // Calculate diversion and spill
      let combinedDiversion = combinedInflow;
      let combinedSpill = 0;
      if (combinedInflow > combinedMaxDiversion) {
        combinedDiversion = combinedMaxDiversion;
        combinedSpill = combinedInflow - combinedMaxDiversion;
      }

      let combinedNewStorage = combinedStorage + combinedSpill;
      if (combinedNewStorage > combinedMaxStorage) {
        combinedSpill += combinedNewStorage - combinedMaxStorage;
        combinedNewStorage = combinedMaxStorage;
      }

      const combinedPctStorage = (combinedNewStorage / combinedMaxStorage) * 100;
      const averageSpill = combinedSpill / (integrationDict[dam].length + 1);

      // Update properties for the dam and its integrated neighbors
      for (const d of [dam, ...integrationDict[dam]]) {
        updatedProperties.get(dam)!['Updated Storage (%)'] = combinedPctStorage;
        updatedProperties.get(dam)!['Expected Spill (Mm3/day)'] = averageSpill;
        console.log(`Integrated dam processing: Updated properties for ${d}: Updated Storage: ${updatedProperties.get(dam)!['Updated Storage (%)']}, Expected Spill: ${updatedProperties.get(dam)!['Expected Spill (Mm3/day)']}`);
      }

      // Update inflow for neighbors based on diversion and spill
      if (combinedDiversionCount > 0) {
        const diversionPerNeighbor = combinedDiversion / combinedDiversionCount;
        for (const neighbor of adjacencyList.get(dam)!) {
          if (!integrationDict[dam].includes(neighbor)) {
            updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)'] += diversionPerNeighbor;
            console.log(`Integrated dam processing: Updated properties for neighbor ${neighbor} through diversion: Inflow: ${updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)']}`);
          }
        }
      }

      if (combinedSpillCount > 0) {
        const spillPerNeighbor = combinedSpill / combinedSpillCount;
        for (const neighbor of spillDict.get(dam)!) {
          if (!integrationDict[dam].includes(neighbor)) {
            updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)'] += spillPerNeighbor;
            console.log(`Integrated dam processing: Updated properties for neighbor ${neighbor} through spill: Inflow: ${updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)']}`);
          }
        }
      }
    } else {
      // Process dams that are not integrated
      const catchmentArea = updatedProperties.get(dam)!['Catchment Area (sq,km)'];
      const currentInflow = catchmentArea * updatedProperties.get(dam)!['Input Runoff (mm)'] * (1e-3);
      updatedProperties.get(dam)!['Inflow after diversion (Mm3/day)'] += currentInflow;

      const currentStorage = (updatedProperties.get(dam)!['Percent Storage (%)'] / 100) * updatedProperties.get(dam)!['Gross Storage Capacity (Mm3)'];
      const maxDiversion = updatedProperties.get(dam)!['Maximum Possible Diversion (Mm3/day)'];
      const maxStorage = updatedProperties.get(dam)!['Gross Storage Capacity (Mm3)'];

      let diversion = currentInflow;
      let spill = 0;
      if (currentInflow > maxDiversion) {
        diversion = maxDiversion;
        spill = currentInflow - maxDiversion;
      }

      const newStorage = currentStorage + spill;
      if (newStorage > maxStorage) {
        spill += newStorage - maxStorage;
        updatedProperties.get(dam)!['Updated Storage (%)'] = (maxStorage / updatedProperties.get(dam)!['Gross Storage Capacity (Mm3)']) * 100;
      } else {
        updatedProperties.get(dam)!['Updated Storage (%)'] = (newStorage / updatedProperties.get(dam)!['Gross Storage Capacity (Mm3)']) * 100;
      }
      updatedProperties.get(dam)!['Expected Spill (Mm3/day)'] = spill;

      console.log(`Updated properties: Updated Storage: ${updatedProperties.get(dam)!['Updated Storage (%)']}, Expected Spill: ${updatedProperties.get(dam)!['Expected Spill (Mm3/day)']}`);

      // Update inflow for neighbors based on diversion and spill
      const diversionCount = adjacencyList.get(dam)!.length;
      const spillCount = spillDict.get(dam)!.length;

      if (diversionCount > 0) {
        const diversionPerNeighbor = diversion / diversionCount;
        for (const neighbor of adjacencyList.get(dam)!) {
          updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)'] += diversionPerNeighbor;
          console.log(`Updated properties for neighbor ${neighbor} through diversion: Inflow: ${updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)']}`);
        }
      }

      if (spillCount > 0) {
        const spillPerNeighbor = spill / spillCount;
        for (const neighbor of spillDict.get(dam)!) {
          updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)'] += spillPerNeighbor;
          console.log(`Updated properties for neighbor ${neighbor} through spill: Inflow: ${updatedProperties.get(neighbor)!['Inflow after diversion (Mm3/day)']}`);
        }
      }
    }
  }
  console.log('\n');
  return updatedProperties;
};


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRainfall(value? Number(value) : null);
  };

  const handleSimulate = () => {
    if(rainfall === null) return;
    // Calculate the new water levels based on the rainfall input
    // Dummy equations to be replaced with actual logic above
    const newLevels = [
      Math.min(levels[0] + (rainfall * 4) / 100, 100), // Max level capped at 100%
      Math.min(levels[1] + (rainfall * 4) / 100, 100),
      Math.min(levels[2] + (rainfall * 4) / 100, 100),
      Math.min(levels[3] + (rainfall * 4) / 100, 100),
      Math.min(levels[4] + (rainfall * 4) / 100, 100),
      Math.min(levels[5] + (rainfall * 4) / 100, 100),
      Math.min(levels[6] + (rainfall * 4) / 100, 100),
      Math.min(levels[7] + (rainfall * 4) / 100, 100),
    ];

    // Sequentially update levels with delays
    newLevels.forEach((level, index) => {
      setTimeout(() => {
        setLevels((prevLevels) => {
          const updatedLevels = [...prevLevels];
          updatedLevels[index] = level;
          return updatedLevels;
        });
        if (index < newLevels.length - 1) {
          setVisibleArrows((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      }, index * 500); // Adjust delay between each dam (500ms here)
    });
    setTimeout(() => setShowResults(true), newLevels.length * 500); // Show results after simulation
  };

  const [showTutorial, setShowTutorial] = useState(true);

  const handleBegin = () => {
    setShowTutorial(false);
  };


  return (
      <div className="monitor-screen w-full h-full mx-auto relative flex flex-col">
        <div className="absolute inset-0" 
          style={{
            width: '100%',
            height: '100%', 
            position: 'relative', 
            background: 'radial-gradient(circle at 100% 1%, #283ADE 10%, #61B3FF 69%, #A1C7F1 85%, #E1EFFE 99%)', 
            borderRadius: 15, 
            overflow: 'hidden',
          }}
        >
          <ThemeProvider theme={theme}>
            <Grid container spacing={1} sx={{ height: '100%', alignItems: 'stretch' }}>
              {showTutorial ? (
                <>
                {/* // Tutorial content */}
                <Grid size={{ xs: 12, md: 6 }} container direction="column" spacing={1} sx={{ height: '100%', pl: 10, pr: 5, py: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <Grid size={{ xs: 12 }} sx={{ height: '90%' }}>
                    <Card sx={{ height: '100%', mixBlendMode: 'plus-lighter' }}>
                      <CardContent>
                        <Typography>insert simulation</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }} container direction="column" spacing={1} sx={{ height: '100%', py: 15, px: 20, alignItems: 'start', justifyContent: 'center'}}>
                  <Typography sx={{ color: 'white', fontSize: 44, fontWeight: '500', lineHeight: '48px' }} style={{ paddingBottom: 10 }}>
                    Welcome to  <br />Forecast.
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: 20, fontWeight: '500' }} style={{ paddingBottom: 10 }}>
                    How this works
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: 16, fontWeight: '300', wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: '22px' }}>
                    Input a predicted rainfall value for tomorrow in your region. <br /><br />
                    The rainfall value will be used to calculate inflow into the network of reservoirs in the river basin.<br /><br />
                    The change in the reservoirs values determine how much the river level rises. <br /><br />
                    This new river level value will be the focal point, used to map flooding impact in the region.<br /><br />
                  </Typography>
                  <Button
                  onClick={handleBegin} variant="contained"
                  sx={{ color: '#fff', mixBlendMode: 'plus-lighter', fontSize: '16px', fontWeight: '300'}}
                  >
                    Begin
                  </Button>
                </Grid></>
              ) : (
                  // Forecast main content
                  <>
                  {/* Forecast main content */}
                  <Grid size={{ xs: 12, md: 5 }} container direction="column" spacing={1} sx={{ height: '100%', pl: 2, py: 2 }}>
                    <Grid size={{ xs: 12 }} sx={{ height: '100%' }} container direction='column'>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 24, pl: 2, pt: 1 }}>Input Values</Typography>
                          <ValidationTextField
                            type='number'
                            style={{ marginTop: 20, marginLeft: 10 }}
                            label="Enter Rainfall"
                            required
                            variant="outlined"
                            id="validation-outlined-input"
                            value={rainfall !== null ? rainfall : ''}
                            onChange={handleInputChange} /> <br /> <br />
                          <Typography sx={{ fontSize: '10px', fontWeight: '200', opacity: '80%', marginLeft: 2 }}>
                            Rainfall value must be between the ranges of X to Y, <br />
                            in accordance with daily occurring data.<br /> <br />
                          </Typography>
                          <Button
                            style={{ marginLeft: 10 }}
                            onClick={handleSimulate}
                            color="secondary"
                            variant="contained"
                          >
                            Run Simulation
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 7 }} container direction="column" spacing={1} sx={{ height: '100%', pr: 2, py: 2 }}>
                    <Grid size={{ xs: 12 }} sx={{ height: '100%' }}>
                      <Card sx={{ height: '100%'}}>
                        <CardContent>
                          <Typography sx={{ fontSize: 24, pl: 2, pt: 1 }}>Simulation Screen</Typography>
                          {/* <div style={{ width: '100%', height: '100%', aspectRatio: '1 / 1', alignItems: 'center', justifyContent: 'center'}}> */}
                            <svg 
                             viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
                            //  preserveAspectRatio="xMidYMid meet"
                             width="100%" height="100%"
                            >
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#BDD3CE" />
                                </marker>
                              </defs>

                              {/* Render dams in network layout */}
                              <Dam level={levels[0]} label="Upper Nirar" x={SVG_WIDTH * 0.07} y={SVG_HEIGHT * 0.05} />
                              <Dam level={levels[1]} label="Lower Nirar" x={SVG_WIDTH * 0.2} y={SVG_HEIGHT * 0.1} />
                              <Dam level={levels[2]} label="TN Sholayar" x={SVG_WIDTH * 0.15} y={SVG_HEIGHT * 0.27} />
                              <Dam level={levels[3]} label="Parambikulam" x={SVG_WIDTH * 0.2} y={SVG_HEIGHT * 0.45} />
                              <Dam level={levels[4]} label="Thunacadavu" x={SVG_WIDTH * 0.25} y={SVG_HEIGHT * 0.6}/>
                              <Dam level={levels[5]} label="Peruvarippalam" x={SVG_WIDTH * 0.2} y={SVG_HEIGHT * 0.75} />
                              <Dam level={levels[6]} label="KL Sholayar" x={SVG_WIDTH * 0.5} y={SVG_HEIGHT * 0.35} />
                              <Dam level={levels[7]} label="Poringalkuthu" x={SVG_WIDTH * 0.8} y={SVG_HEIGHT * 0.75} />

                              {/* Render arrows */}
                              <Arrow x1="10%" y1="15%" x2="17%" y2="26.5%" visible={visibleArrows[0]} />
                              <Arrow x1="23%" y1="20%" x2="18%" y2="26.5%" visible={visibleArrows[1]} />
                              <Arrow x1="18%" y1="38%" x2="23%" y2="44.5%" visible={visibleArrows[2]} />
                              <Arrow x1="24%" y1="55.5%" x2="29%" y2="59.5%" visible={visibleArrows[3]} />
                              <Arrow x1="23%" y1="74.5%" x2="29%" y2="71%" visible={visibleArrows[4]} />
                              <Arrow x1="18%" y1="38%" x2="49.5%" y2="40%" visible={visibleArrows[5]} />
                              <Arrow x1="53%" y1="45.5%" x2="80%" y2="74.5%" visible={visibleArrows[6]} />
                            </svg>
                           {/* </div> */}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                  {showResults && (
                    <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                     width: '100%',
                      height: '100%',
                      background: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      justifyContent: 'center',
                     alignItems: 'center',
                    }}
                    >
                      <Card sx={{ width: '50%', padding: 2 }}>
                        <CardContent>
                          <Typography sx={{ fontSize: 24, fontWeight: '400' }}>Results</Typography>
                          <Typography sx={{ fontSize: 18, marginTop: 1, fontWeight: '300'}}>
                            Forecasted River water Level: <span style={{ fontWeight: '500'}}> 12m </span>
                          </Typography>
                          <Button
                            sx={{ marginTop: 2 }}
                            variant="contained"
                            color="inherit"
                            onClick={() => navigate('/impact-visualization')}
                          >
                            See Impact
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </>
              )}
              </Grid>
          </ThemeProvider>
        </div>
      </div>
  );
};

export default ForecastScreen;