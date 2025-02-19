import { useState } from 'react';
import maplibregl from 'maplibre-gl';
import { useConfig } from '../ConfigContext';
import * as turf from '@turf/turf';
import { Sort, Visibility } from '@mui/icons-material';
import { centerLatLngFromFeature, generateCustomMarker, incrementState } from './misc';


// const config = useConfig();

function addBoundarySource(map, sourceType, config) {
    const apiKey = config.MAPTILER_API_KEY;
    let sourceConfigData = config.LAYERS.BOUNDARY[sourceType];
    let sourceId = sourceConfigData.SOURCE_ID;
    const url = sourceConfigData.URL;
      
    map.addSource(sourceId, {
        type: 'geojson',
        data: url
    })

    return sourceId;
}

function addBoundaryLayer(map, layerType, data, config) {
    const layerConfigData = config.LAYERS.BOUNDARY[layerType];
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

async function getIntersectingPolygons(map, sourceType, polygon, config) {

    const sourceId = config.LAYERS.BOUNDARY[sourceType].SOURCE_ID;
    let source;
    let intersectingLayer;
    source = map.getSource(sourceId);
    const data = await source.getData();
    const intersectingFeatures = data.features.filter((feature) => {
        // console.log(feature.geometry, polygon.geometry);
        return turf.intersect(turf.featureCollection([feature, polygon]));
    });
    
    // // Do something with the intersecting features
    intersectingLayer = turf.featureCollection(intersectingFeatures);
    return intersectingLayer;
}

async function addBoundaryLayerLocal(map, layer, configData) {
    const config = configData.LAYERS.IMPACT[layer];
    // console.log(config);

    const loadGeoJSON = async () => {
        const fileUrl = config.URL;
        console.log(fileUrl);

        try {
            const response = await fetch(fileUrl);
            const geoJSONContent = await response.json();

            map.addSource(config.SOURCE_ID, {
                'type': 'geojson',
                'data': geoJSONContent
            })

            map.addLayer({
                'id': config.LAYER_ID,
                'type': 'line',
                'source': config.SOURCE_ID,
                paint: {
                    'line-color': config.COLOR,
                    // 'fill-outline-color': config.OUTLINE_COLOR,
                    // 'fill-opacity': 0.8
                }
            });
        } catch (error) {
            console.error('Error fetching or parsing GeoJSON', error);
        }
    }

    loadGeoJSON();
}

export { addBoundarySource, addBoundaryLayer, removeBoundaryLayer, getIntersectingPolygons, addBoundaryLayerLocal };