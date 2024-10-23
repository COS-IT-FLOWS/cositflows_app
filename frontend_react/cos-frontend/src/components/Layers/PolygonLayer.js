import { useState } from 'react';
import maplibregl from 'maplibre-gl';
import configData from '../../config.json';
import * as turf from '@turf/turf';
import { Sort, Visibility } from '@mui/icons-material';
import { centerLatLngFromFeature, generateCustomMarker, incrementState } from './misc';


function addBoundarySource(map, sourceType) {
    let sourceConfigData = configData.LAYERS.BOUNDARY[sourceType];
    let sourceId = sourceConfigData.SOURCE_ID;
    const url = sourceConfigData.URL;
      
    map.addSource(sourceId, {
        type: 'geojson',
        data: url
    })

    return sourceId;
}

function addBoundaryLayer(map, layerType, data) {
    const layerConfigData = configData.LAYERS.BOUNDARY[layerType];
    const sourceId = layerConfigData.SOURCE_ID;
    const layerColor = layerConfigData.COLOR;
    const layerOpacity = layerConfigData.OPACITY;
    const lineColor = layerConfigData.LINECOLOR;
    const randomString = (Math.random()).toString(36);
    const layerId = layerConfigData.LAYER_ID + randomString;
    const outlineLayerId = 'outline-' + layerId;
    // setBoundaryLevel()
    map.addLayer({
        id: layerId,
        type: 'fill',
        // If source is a full layer, it will have Source ID, 
        // else if generated, data passed directly.
        source: data !== null ? {
            type: 'geojson',
            data: data
        } : sourceId,
        paint: {
            'fill-color': layerColor,
            'fill-opacity': layerOpacity
        },
        // layout: {
        //     'visibility': 'visible'
        // }
    }); 
    
    map.addLayer({
        id: outlineLayerId,
        type: 'line',
        source: data !== null ? {
            type: 'geojson',
            data: data
        } : sourceId,
        paint: {
            'line-color': lineColor,
            'line-width': 2,
            'line-opacity': layerOpacity
            },
        // layout: {
        //     'visibility': 'visible'
        // }
    });

    return layerId;
}

function removeBoundaryLayer(map, layerId) {
    map.removeLayer(layerId);
    map.removeLayer('outline-' + layerId);
}


export { addPointSource, addPointLayer, addCustomMarkerForPointLayer, togglePointLayers, addBoundarySource, addBoundaryLayer, cursorToPointerOnHover, getIntersectingPolygons, handleClickOnLayer };