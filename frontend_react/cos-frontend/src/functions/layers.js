// import React from 'react';
import maplibregl from 'maplibre-gl';
import configData from '../config.json';
import * as turf from '@turf/turf';
import { Sort } from '@mui/icons-material';


function addStationLayer(map, source) {
    const sourceConfigData = configData.LAYERS.STATION[source];
    const sourceId = sourceConfigData.SOURCE_ID;
    const layerId = sourceConfigData.LAYER_ID;
    const url = sourceConfigData.URL;
    const layerColor = sourceConfigData.COLOR;

    map.addSource(sourceId, {
        type: 'geojson',
        data: url
    })

    map.addLayer({
        id: layerId,
        type: "circle",
        source: sourceId,
        paint: {
            'circle-color': layerColor
        }
    })

    // return map
}

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

function addBoundaryLayer(map, sourceType, data) {
    const sourceConfigData = configData.LAYERS.BOUNDARY[sourceType];
    const sourceId = sourceConfigData.SOURCE_ID;
    let layerId = sourceConfigData.LAYER_ID;
    const layerColor = sourceConfigData.COLOR;
    const layerOpacity = sourceConfigData.OPACITY;
    
    if (data !== null) {
        layerId = layerId + (Math.random()).toString(36);
    } 

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
    })
    

    
    return layerId;
}

async function removeBoundaryLayer(map, previousLayerId) {

    map.removeLayer(previousLayerId);   
}

function addOutlineLayer(map, sourceType, data) {
    const sourceConfigData = configData.LAYERS.BOUNDARY[sourceType];
    const sourceId = sourceConfigData.SOURCE_ID;
    let outlineLayerId = sourceConfigData.OUTLINE_LAYER_ID;
    const lineColor = sourceConfigData.LINECOLOR;
    const layerOpacity = sourceConfigData.OPACITY;
    
    if (data !== null) {
        outlineLayerId = outlineLayerId + (Math.random()).toString(36);
    }

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

    return outlineLayerId;
}

function removeOutlineLayer(map, outlineLayerId) {
    map.removeLayer(outlineLayerId);
}



function handleClickOnLayer(map, sourceType, layerId, outlineLayerId, childLayerId) {
    console.log('handle On click running')
    const sourceConfigData = configData.LAYERS.BOUNDARY[sourceType];
    const sourceId = sourceConfigData.SOURCE_ID;
    // const layerConfigData = configData.LAYERS.BOUNDARY[layerType];
    // const layerId = layerConfigData.LAYER_ID;
    let intersectingFeatures;

    map.on('click', async (e) => {
        map.setLayoutProperty(layerId, 'visibility', 'none');
        map.setLayoutProperty(outlineLayerId, 'visibility', 'none');
        // const feature = e.features[0];
        const features = map.queryRenderedFeatures(e.point);

        features.forEach(async (feature) => {
                const layerId = feature.layer.id;
                if (layerId.includes('district-layer')) {
                    removeBoundaryLayer(map, layerId);
                    removeOutlineLayer(map, layerId);
                    addOutlineLayer(map, 'DISTRICT', feature);
                    intersectingFeatures = await getIntersectingPolygons(map, 'DISTRICT', feature);
                    const childLayerId = addBoundaryLayer(map, 'RIVER_BASIN', intersectingFeatures);
                    const bbox = turf.bbox(intersectingFeatures);
                    map.fitBounds(bbox, {
                        padding: 80
                    })
                    addOutlineLayer(map, 'RIVER_BASIN', intersectingFeatures);
                    cursorToPointerOnHoverOverLayer(map, childLayerId);
                } else if (layerId.includes('river-basin-layer')) {
                    console.log(layerId);
                    removeBoundaryLayer(map, layerId);
                    removeOutlineLayer(map, layerId);
                    addOutlineLayer(map, 'RIVER_BASIN', feature);
                    intersectingFeatures = await getIntersectingPolygons(map, 'RIVER_BASIN', feature);
                    const childLayerId = addBoundaryLayer(map, 'PANCHAYAT', intersectingFeatures);
                    const bbox = turf.bbox(intersectingFeatures);
                    map.fitBounds(bbox, {
                        padding: 80
                    })
                    addOutlineLayer(map, 'PANCHAYAT', intersectingFeatures);
                    cursorToPointerOnHoverOverLayer(map, childLayerId);
                }
        })
        console.log(features);
    });
  
    return childLayerId;
}

function cursorToPointerOnHoverOverLayer(map, layerId) {
    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', layerId, () => {
        map.getCanvas().style.cursor = 'pointer';

    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', layerId, () => {
        map.getCanvas().style.cursor = '';
    });

}

async function getIntersectingPolygons(map, sourceType, polygon) {
    const sourceId = configData.LAYERS.BOUNDARY[sourceType].SOURCE_ID;
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


// function addDataLayer(id, map, url) {

//     map.addSource(id, {
//         type: "",
//         data: url
//     })

//     map.addLayer({
//         id: "",
//         source: id
//     })
// }

// function add3DBuildingLayer(map) {
//     let labelLayerId;
//     for (let i = 0; i < layers.length; i++) {
//         if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
//             labelLayerId = layers[i].id;
//             break;
//         }
//     }

//     map.current.addSource('openmaptiles', {
//         url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${API_KEY}`,
//         type: 'vector',
//     });

//     map.current.addLayer(
//         {
//             'id': '3d-buildings',
//             'source': 'openmaptiles',
//             'source-layer': 'building',
//             'type': 'fill-extrusion',
//             'minzoom': 15,
//             'filter': ['!=', ['get', 'hide_3d'], true],
//             'paint': {
//                 'fill-extrusion-color': [
//                     'interpolate',
//                     ['linear'],
//                     ['get', 'render_height'], 0, 'lightgray', 200, 'royalblue', 400, 'lightblue'
//                 ],
//                 'fill-extrusion-height': [
//                     'interpolate',
//                     ['linear'],
//                     ['zoom'],
//                     15,
//                     0,
//                     16,
//                     ['get', 'render_height']
//                 ],
//                 'fill-extrusion-base': ['case',
//                     ['>=', ['get', 'zoom'], 16],
//                     ['get', 'render_min_height'], 0
//                 ]
//             }
//         },
//         labelLayerId
//     );
// }

export { addStationLayer, addBoundarySource, addBoundaryLayer, addOutlineLayer, handleClickOnLayer, getIntersectingPolygons, cursorToPointerOnHoverOverLayer};