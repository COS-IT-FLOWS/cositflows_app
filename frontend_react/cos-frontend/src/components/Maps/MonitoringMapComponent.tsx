import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles.css';
import configData from "../../config.json";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {addPointSource, addPointLayer, addCustomMarkerForPointLayer, togglePointLayers, addBoundarySource, addBoundaryLayer, removeBoundaryLayer, cursorToPointerOnHover, cursorToPointerOnHoverType2, getIntersectingPolygons, handleClickOnLayer }  from '../../functions/layers';
import { LogoControl, NavigationControl } from '@maptiler/sdk';
import { AddCircleOutlineSharp } from '@mui/icons-material';
import { generateCustomMarker, incrementState } from '../../functions/misc';
import * as turf from '@turf/turf';

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
  // if (map.current) return; // stops map from intializing more than once
  useEffect(() => { 
    if(mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [0, 0],
        zoom: 2,
      });
      
      map.on('load', async function () {
        let layerId, targetLayerId;

        // Add Boundary layer sources to map
        addBoundarySource(map, 'DISTRICT');
        addBoundarySource(map, 'RIVER_BASIN');
        addBoundarySource(map, 'PANCHAYAT');
        addBoundaryLayer(map, 'DISTRICT', null); 
        // // Add Point layer sources to map
        addPointSource(map, 'PRECIPITATION');
        // addPointLayer(map, 'PRECIPITATION', null);
        // addPointSource(map, 'RESERVOIR');
        // addPointSource(map, 'RIVER');

        function animate(layerId: string, opacity: number, finalOpacity: number) {
          map.setPaintProperty(layerId, 'fill-opacity', opacity);
          map.setPaintProperty(`outline-${layerId}`, 'line-opacity', opacity);
          opacity += 0.003;
          if (opacity < finalOpacity) {
            requestAnimationFrame(() => animate(layerId, opacity, finalOpacity));
          }
        }
        
        map.flyTo({
          center: [lng, lat], // coordinates of the GeoJSON feature
          zoom: zoom,
          bearing: 0,
          pitch: 0,
          duration: 3000,
          curve: 1,
          easing(t) {
            return t;
          }  // duration of the fly animation in milliseconds
        });
        // cursorToPointerOnHoverType2(map, 'PRECIPITATION', 'precipitaion-station-layer');


        map.once('idle', () => {
          // map.setPaintProperty('district-layer', 'fill-opacity', 0.5);
          let opacity = 0;

          animate('district-layer', 0, 0.3);
          map.once('idle', async () => {
            let geojsonSource;
            map.setFilter('district-layer', ['==', 'NAME', 'Ernakulam']);
            map.setFilter('outline-district-layer', ['==', 'NAME', 'Ernakulam']);
            animate('district-layer', 0.3, 0.8);
            map.once('idle', () => {
              removeBoundaryLayer(map, 'district-layer');
              addBoundaryLayer(map, 'RIVER_BASIN', null);
              map.once('idle', () => {
                animate('river-basin-layer', 0, 0.3);
                map.flyTo({
                  center: [lng + 0.5, lat - 0.6], // coordinates of the GeoJSON feature
                  zoom: 9,
                  bearing: 0,
                  pitch: 0,
                  duration: 1500,
                  curve: 1,
                  easing(t) {
                    return t;
                  }  // duration of the fly animation in milliseconds
                });
                map.once('idle', async () => {
                  const stationSource: any = map.getSource('precipitation');
                  const data = await stationSource.getData();
                  await addCustomMarkerForPointLayer(map, "PRECIPITATION", data, setMarkerState);
                  cursorToPointerOnHoverType2(map, 'PRECIPITATION', 'precipitation-station-layer');
                })
              });
            });
          });
          
        });

        
        
        
        setMap(map);
     

        return () => {
          map.remove();
        };
      });
    }
  }, []); 

  // useEffect(() => {
  //   if (map) {
  //   type GaugeType = keyof typeof visibleGauges;
  //   // Add event listeners to toggle gauge layers
  //   togglePointLayers(map, visibleGauges, mapState, currentFeatureLayerId, markerState, setMarkerState);
  //   }
  // }, [visibleGauges, mapState, currentFeatureLayerId]);

  // useEffect(() => {
  //   if (map) {
      
  //   }
  // })


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

