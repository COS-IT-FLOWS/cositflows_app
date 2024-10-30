import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles.css';
import { useConfig } from '../../ConfigContext';
// import configData from "../../config.json";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {addPointSource, addPointLayer, addCustomMarkerForPointLayer, togglePointLayers, cursorToPointerOnHover,  handleClickOnLayer }  from '../Layers/PointLayer';
import { addBoundarySource, addBoundaryLayer, removeBoundaryLayer, getIntersectingPolygons } from '../Layers/PolygonLayer';
import { LogoControl, NavigationControl } from '@maptiler/sdk';
import { AddCircleOutlineSharp } from '@mui/icons-material';
import { generateCustomMarker, incrementState } from '../Layers/misc';

interface MonitoringMapComponentProps {
    visibleGauges: {
      PRECIPITATION: boolean;
      RESERVOIR: boolean;
      TIDAL: boolean;
      GROUNDWATER: boolean;
      RIVER: boolean;
      REGULATOR: boolean;
  };
}

// maptilersdk.config.apiKey = configData.MAP_TILER_API_KEY;
const MonitoringMapComponent: React.FC<MonitoringMapComponentProps> = React.memo(({visibleGauges}: MonitoringMapComponentProps) => {
  const { config } = useConfig();
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  // const [layerVisible, setLayerVisible] = useState<boolean>(true);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapState, setMapState] = useState({boundaryLevel: 0});
  const [pointLayerState, setPointLayerState] = useState({
    PRECIPITATION: null,
    RESERVOIR: null,
    RIVER: null
  });
  const [markerState, setMarkerState] = useState({
    PRECIPITATION: [],
    RESERVOIR: [],
    RIVER: []
  });
  const [currentFeatureLayerId, setCurrentFeatureLayerId] = useState<String | null>(null);
  // const map = useRef<HTMLDivElement | null>(null);
  const lng = config.MAP_CONFIG.LON;
  const lat = config.MAP_CONFIG.LAT;
  const zoom = config.MAP_CONFIG.ZOOM;
  const API_KEY = config.MAPTILER_API_KEY;
  const mapStyleUrl = config.MAPS.MONITORING + API_KEY;

  // if (map.current) return; // stops map from intializing more than once
  useEffect(() => { 
    if(mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyleUrl,
        center: [lng, lat],
        zoom: zoom,
      });
      
      map.on('load', async function () {
        let layerId, targetLayerId;

        // Add Boundary layer sources to map
        addBoundarySource(map, 'DISTRICT', config);
        addBoundarySource(map, 'RIVER_BASIN', config);
        addBoundarySource(map, 'PANCHAYAT', config);

        // // Add Point layer sources to map
        addPointSource(map, 'PRECIPITATION', config);
        addPointSource(map, 'RESERVOIR', config);
        addPointSource(map, 'RIVER', config);

        

        addPointLayer(map, 'PRECIPITATION', 'circle', config);
        addPointLayer(map, 'RESERVOIR', 'circle', config);
        addPointLayer(map, 'RIVER', 'circle', config);

        // Add District Boundary layer to map
        layerId = addBoundaryLayer(map, 'DISTRICT', null, config);
        setMapState({boundaryLevel: 0});
        console.log(mapState);
        cursorToPointerOnHover(map, 'DISTRICT', layerId, config);
        await handleClickOnLayer(map, setMapState, setCurrentFeatureLayerId, config);
        
        
        setMap(map);
     

        return () => {
          map.remove();
        };
      });
    }
  }, []); 

  useEffect(() => {
    if (map) {
    type GaugeType = keyof typeof visibleGauges;
    // Add event listeners to toggle gauge layers
    togglePointLayers(map, visibleGauges, mapState, currentFeatureLayerId, markerState, setMarkerState, config);
    }
  }, [visibleGauges, mapState, currentFeatureLayerId]);


  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  )
}, 
(prevProps: MonitoringMapComponentProps, nextProps: MonitoringMapComponentProps) => {
  // Custom comparison function
  return (
    prevProps.visibleGauges.PRECIPITATION === nextProps.visibleGauges.PRECIPITATION &&
    prevProps.visibleGauges.RESERVOIR === nextProps.visibleGauges.RESERVOIR &&
    prevProps.visibleGauges.TIDAL === nextProps.visibleGauges.TIDAL &&
    prevProps.visibleGauges.GROUNDWATER === nextProps.visibleGauges.GROUNDWATER &&
    prevProps.visibleGauges.RIVER === nextProps.visibleGauges.RIVER &&
    prevProps.visibleGauges.REGULATOR === nextProps.visibleGauges.REGULATOR
  );
});

export { MonitoringMapComponent };