import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles.css';
import configData from "../../config.json";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {addPointSource, addPointLayer, addCustomMarkerForPointLayer, togglePointLayers, addBoundarySource, addBoundaryLayer, cursorToPointerOnHover, getIntersectingPolygons, handleClickOnLayer }  from '../Layers';
import { LogoControl, NavigationControl } from '@maptiler/sdk';
import { AddCircleOutlineSharp } from '@mui/icons-material';
import { generateCustomMarker, incrementState } from '../Layers/misc';

interface ImpactMapComponentProps {

}

// maptilersdk.config.apiKey = configData.MAP_TILER_API_KEY;
const ImpactMapComponent: React.FC<ImpactMapComponentProps> = () => {
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
  const lng = configData.MAP_CONFIG.LON;
  const lat = configData.MAP_CONFIG.LAT;
  const zoom = configData.MAP_CONFIG.ZOOM;
  const API_KEY = configData.MAP_TILER_API_KEY;
  const mapStyleUrl = configData.MAPS.IMPACT;
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
        
        setMap(map);
     

        return () => {
          map.remove();
        };
      });
    }
  }, []); 

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  )
};

export default ImpactMapComponent;