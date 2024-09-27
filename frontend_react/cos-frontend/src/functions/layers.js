import { useState } from 'react';
import maplibregl from 'maplibre-gl';
import configData from '../config.json';
import * as turf from '@turf/turf';
import { Sort, Visibility } from '@mui/icons-material';
import { centerLatLngFromFeature, generateCustomMarker, incrementState } from './misc';

function addPointSource(map, sourceType) {
    const sourceConfigData = configData.LAYERS.STATION[sourceType];
    const sourceId = sourceConfigData.SOURCE_ID;
    const url = sourceConfigData.URL;

    map.addSource(sourceId, {
        type: 'geojson',
        data: url
    })
};

function addPointLayer(map, layerType, data) {
    const layerConfigData = configData.LAYERS.STATION[layerType];
    const sourceId = layerConfigData.SOURCE_ID;
    const layerId = layerConfigData.LAYER_ID + (Math.random()).toString(36);

    const layerColor = layerConfigData.COLOR;
    // console.log(layerType);
    map.addLayer({
        id: layerId,
        type: "circle",
        source: data !== null ? {
            type: 'geojson',
            data: data
        } : sourceId,
        paint: {
            'circle-color': layerColor,
            'circle-radius' : {
                    'base': 2,
                    'stops': [
                        [12, 7],
                        [50, 180]
                    ]
            }
        },
        layout: {
            'visibility': 'visible'
        }
    })
    // return map
};

function removePointLayer(map, layerType) {
    const layers = map.getStyle().layers;
    const layerId = configData.LAYERS.STATION[layerType].LAYER_ID;
    const layer = layers.find((layer) => layer.id.includes(layerId));
    if (layer) {
        map.removeLayer(layer.id);
    }
}

async function addCustomMarkerForPointLayer(map, layerType, pointsCollection, setMarkerState) {
    // const layerConfigData = configData.LAYERS.STATION[layerType];
    const markers = []; 
    if (pointsCollection) {
        for (const point of pointsCollection.features) {
            const marker = await generateCustomMarker(layerType);
            // Add marker to map
            marker.setLngLat(point.geometry.coordinates).addTo(map);
            markers.push(marker);
        }
        setMarkerState({[layerType] : markers});
    }
};

async function removeCustomMarkerLayer(map, layerType, markerState) {
    const markers = await markerState[layerType];
    if (markers && markers.length) {
        markers.forEach((marker) => {
            marker.remove();
        });
    }
};




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

function togglePointLayers(map, gaugeVisibility, mapState, currentFeatureLayerId, markerState, setMarkerState) {    
    const boundaryLevel = mapState['boundaryLevel'];
    if (boundaryLevel === 0) {
        Object.keys(gaugeVisibility).forEach(async (layerType) => {
            const layerVisibility = gaugeVisibility[layerType];
            const layerConfigData = configData.LAYERS.STATION[layerType];
            if (layerConfigData) {
                if (layerVisibility == true) {
                    addPointLayer(map, layerType, null);
                } else {
                    removePointLayer(map, layerType);
                }
            }   
        });
    } else if (boundaryLevel > 0 && boundaryLevel < 2 ) {
        Object.keys(gaugeVisibility).forEach(async (layerType) => {
            const layerVisibility = gaugeVisibility[layerType];
            const layerConfigData = configData.LAYERS.STATION[layerType];
            if (layerConfigData) {
                removePointLayer(map, layerType);
                if (layerVisibility === true) {
                    const pointsCollection = await getPointsWithinIntersectingFeatures(map, layerType, currentFeatureLayerId);
                    addPointLayer(map, layerType, pointsCollection);
                } else if(layerVisibility === false && markerState[layerType] && markerState[layerType].length) {
                    removePointLayer(map, layerType);
                }
            }   
        });
    } else if (boundaryLevel >= 2) {
        Object.keys(gaugeVisibility).forEach(async (layerType) => {
            const layerVisibility = gaugeVisibility[layerType]; 
            const layerConfigData = configData.LAYERS.STATION[layerType];
            // console.log(layerType, gaugeVisibility[layerType]);
            if (layerConfigData) {
                removePointLayer(map, layerType);
                if (layerVisibility) {
                    const pointsCollection = await getPointsWithinIntersectingFeatures(map, layerType, currentFeatureLayerId);
                    await addCustomMarkerForPointLayer(map, layerType, pointsCollection, setMarkerState);
                } else {
                    await removeCustomMarkerLayer(map, layerType, markerState);
                }

            }
        });
        
    }
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



async function handleClickOnLayer(map, setMapState, setCurrentFeatureLayerId) {
    
    // const sourceConfigData = configData.LAYERS.BOUNDARY[sourceLayerType];
    // const layerConfigData = configData.LAYERS.BOUNDARY[targetLayerType];
    let intersectingFeatures, targetLayerId;
    // let layerSet = ['district-layer', 'river-basin-layer'];

    map.on('click', async (e) => {
        // const feature = e.features[0];
        const features = map.queryRenderedFeatures(e.point);
        features.forEach(async (feature) => {
            if (feature.layer.id.includes('district-layer')) {
                const layerId = feature.layer.id;
                const targetLayerType = 'RIVER_BASIN';
                removeBoundaryLayer(map, layerId);
                intersectingFeatures = await getIntersectingPolygons(map, targetLayerType, feature);
                targetLayerId = addBoundaryLayer(map, targetLayerType, intersectingFeatures);
                setCurrentFeatureLayerId(targetLayerId);
                const bbox = turf.bbox(intersectingFeatures);
                map.fitBounds(bbox, {
                    padding: 80
                })
                setMapState(incrementState('boundaryLevel'));
                cursorToPointerOnHover(map, targetLayerType, targetLayerId);
                
            } else if (feature.layer.id.includes('river-basin-layer')) {
                const layerId = feature.layer.id;
                const targetLayerType = 'PANCHAYAT';
                removeBoundaryLayer(map, layerId);
                intersectingFeatures = await getIntersectingPolygons(map, targetLayerType, feature);
                targetLayerId = addBoundaryLayer(map, targetLayerType, intersectingFeatures);
                setCurrentFeatureLayerId(targetLayerId);
                const bbox = turf.bbox(intersectingFeatures);
                map.fitBounds(bbox, {
                    padding: 80
                })
                setMapState(incrementState('boundaryLevel'));       
                cursorToPointerOnHover(map, targetLayerType, targetLayerId);
            }
            // TODO: Move this setState and other functions here from if-else-if statements
            // setBoundaryLevel(targetLayerType)     
        });
    });
}

function cursorToPointerOnHover(map, layerType, layerId) {
    const layerConfigData = configData.LAYERS.BOUNDARY[layerType];
    const objectName = layerConfigData.OBJECT_NAME;

    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', layerId, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const feature = e.features[0];

        // Get the polygon centroid
        const centerCoords = centerLatLngFromFeature(feature);
        const name = feature.properties[objectName];
        // // Populate the popup and set its coordinates
        // // based on the feature found.
        popup.setLngLat(centerCoords).setHTML(name);
        
        if (!popup._map) {
            popup.addTo(map);
        }
    });

    map.on('mousemove', layerId, (e) => {
        const feature = e.features[0];

        const centerCoords = centerLatLngFromFeature(feature);
        const name = feature.properties[objectName];
        // // Populate the popup and set its coordinates
        // // based on the feature found.
        popup.setLngLat(centerCoords).setHTML(name);
        if (popup.map) {
            popup.remove();
        }
        popup.addTo(map);
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', layerId, (e) => {
        map.getCanvas().style.cursor = '';
        popup.remove()
    });
}

async function getPointsWithinIntersectingFeatures(map, pointType, polygonLayerId) {
    const pointSourceId = configData.LAYERS.STATION[pointType].SOURCE_ID;
    const pointSource = map.getSource(pointSourceId);
    const pointData = await pointSource.getData();
    const polygonSource = await map.getSource(polygonLayerId);
    if (polygonSource) { 
        const polygonData = await polygonSource.getData();
        const pointsWithinIntersectingFeatures = turf.pointsWithinPolygon(pointData, polygonData);
        return pointsWithinIntersectingFeatures;
    }
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

export { addPointSource, addPointLayer, addCustomMarkerForPointLayer, togglePointLayers, addBoundarySource, addBoundaryLayer, cursorToPointerOnHover, getIntersectingPolygons, handleClickOnLayer };