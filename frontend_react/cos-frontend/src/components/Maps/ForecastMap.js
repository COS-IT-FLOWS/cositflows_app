import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles.css';
import configData from "../../config.json";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
//import { addStationLayer, addBoundaryLayer }  from '../../functions/layers';


maptilersdk.config.apiKey = configData.MAP_TILER_API_KEY;
export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = configData.MAP_CONFIG.LON;
  const lat = configData.MAP_CONFIG.LAT;
  const zoom = configData.MAP_CONFIG.ZOOM;
  const API_KEY = configData.MAP_TILER_API_KEY;

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', async function () {
      // Insert the layer beneath any symbol layer.
      // const layers = map.current.getStyle().layers;



      // addBoundaryLayer(map.current, 'PANCHAYAT');
      // addBoundaryLayer(map.current, 'RIVER_BASIN');
      

      // map.current.addControl(new maplibregl.NavigationControl(), 'top-left');
      // map.current.addControl(new maplibregl.FullscreenControl(), 'top-left');
      // map.current.addControl(new maplibregl.GeolocateControl({
      //   positionOptions: {
      //     enableHighAccuracy: true
      //   },
      //   trackUserLocation: true
      // }), 'top-left');

      var mapStyle = map.current.getStyle().layers;
      var mapStyleSources = Object.keys(mapStyle);
      console.log(mapStyleSources);
      // console.log(geojson);
    });

  }, [API_KEY, lng, lat, zoom]);




  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
