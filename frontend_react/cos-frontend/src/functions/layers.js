// import React from 'react';
// import maplibre from 'maplibre-gl';
import configData from '../config.json';


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

function addBoundaryLayer(map, source) {
    const sourceConfigData = configData.LAYERS.BOUNDARY[source];
    const sourceId = sourceConfigData.SOURCE_ID;
    const layerId = sourceConfigData.LAYER_ID;
    const url = sourceConfigData.URL;
    const layerColor = sourceConfigData.COLOR;
    const lineColor = sourceConfigData.LINECOLOR;
    const layerOpacity = sourceConfigData.OPACITY;

    map.addSource(sourceId, {
        type: 'geojson',
        data: url
    })

    map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
            'fill-color': layerColor,
            'fill-opacity': layerOpacity
        }
    })
    
    map.addLayer({
        id: 'outline',
        type: 'line',
        source: sourceId,
        layout: {},
        paint: {
            'line-color': lineColor,
            'line-width': 2,
            'line-opacity': layerOpacity
            }
        });
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

export { addStationLayer, addBoundaryLayer };