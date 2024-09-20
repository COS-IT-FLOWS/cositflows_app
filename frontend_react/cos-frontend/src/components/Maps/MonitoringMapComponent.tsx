import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles.css';
import configData from "../../config.json";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {addStationLayer, addBoundarySource, addBoundaryLayer, addOutlineLayer,  handleClickOnLayer, getIntersectingPolygons, cursorToPointerOnHoverOverLayer}  from '../../functions/layers';

interface MonitoringMapComponentProps {

}

// maptilersdk.config.apiKey = configData.MAP_TILER_API_KEY;
const MonitoringMapComponent: React.FC<MonitoringMapComponentProps> = () => {
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  // const [layerVisible, setLayerVisible] = useState<boolean>(true);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  // const map = useRef<HTMLDivElement | null>(null);
  const lng = configData.MAP_CONFIG.LON;
  const lat = configData.MAP_CONFIG.LAT;
  const zoom = configData.MAP_CONFIG.ZOOM;
  const API_KEY = configData.MAP_TILER_API_KEY;
  // if (map.current) return; // stops map from intializing more than once
  useEffect(() => { 
    if(mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

      // setMap(map);

      return () => {
        map.remove();
      };
    }
  });

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  )
};

export { MonitoringMapComponent };