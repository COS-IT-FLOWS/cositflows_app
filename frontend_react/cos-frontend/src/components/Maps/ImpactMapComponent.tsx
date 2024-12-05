import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles.css';
import { useConfig } from "../../ConfigContext";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { addBoundaryLayer, addBoundarySource, removeBoundaryLayer } from '../../layers/PolygonLayer';

interface ImpactMapComponentProps {
  selectedMap: string
}

// Define your layers
const layers = ['flood-inundation', 'population', 'households', 'agriculture'];


const ImpactMapComponent: React.FC<ImpactMapComponentProps> = () => {
  const { config } = useConfig();
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const lng = config.MAP_CONFIG.LON;
  const lat = config.MAP_CONFIG.LAT;
  const zoom = config.MAP_CONFIG.ZOOM;
  const API_KEY = config.MAPTILER_API_KEY;
  const mapStyleUrl = config.MAPS.IMPACT + API_KEY;
  const [currentFeatureLayerId, setCurrentFeatureLayerId] = useState<string | null>(null);

  useEffect(() => { 
    if (mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyleUrl,
        center: [lng, lat],
        zoom: zoom,
      });   

      map.on('load', async () => {
        setMap(map);

        // Add boundary sources
        addBoundarySource(map, 'households', config);
        // addBoundarySource(map, 'population', config);
        // addBoundarySource(map, 'P', config);
        addBoundaryLayer(map, 'households', null, config);

      });

      return () => {
        map.remove();
      };
    }
  }, []); 

  // useEffect(() => {
  //   if (!map) return; // Exit if the map is not initialize


  //   // // Determine the current layer based on selectedMap
  //   const newLayerId = config.LAYERS.BOUNDARY[selectedMap];

  //   // If a new layer is selected and it differs from the current one
  //   if (newLayerId && newLayerId !== currentFeatureLayerId) {
  //     // Remove the current layer if it exists
  //     if (currentFeatureLayerId) {
  //       removeBoundaryLayer(map, currentFeatureLayerId);
  //     }

  //     // Add the new layer and update the state
  //     const addedLayerId = addBoundaryLayer(map, 'roads', null, config);
  //     setCurrentFeatureLayerId(addedLayerId);
  //   }
  // }, [selectedMap, map, currentFeatureLayerId]); // Depend on selectedMap, map, and currentFeatureLayerId

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  )
};

export default ImpactMapComponent;