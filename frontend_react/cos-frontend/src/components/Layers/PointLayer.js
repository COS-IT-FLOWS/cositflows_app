import { useState } from 'react';
import maplibregl from 'maplibre-gl';
import {useConfig } from '../../ConfigContext';
import * as turf from '@turf/turf';
import { Sort, Visibility } from '@mui/icons-material';
import { centerLatLngFromFeature, generateCustomMarker, incrementState } from './misc';
import { addBoundaryLayer, removeBoundaryLayer, getIntersectingPolygons } from './PolygonLayer';


function addPointSource(map, sourceType, config) {
    const apiKey = config.MAPTILER_API_KEY;
    const sourceConfigData = config.LAYERS.STATION[sourceType];
    const sourceId = sourceConfigData.SOURCE_ID;
    const url = sourceConfigData.URL + apiKey;

    map.addSource(sourceId, {
        type: 'geojson',
        data: url
    })
};

function addPointLayer(map, layerType, data, config) {
    const layerConfigData = config.LAYERS.STATION[layerType];
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

function removePointLayer(map, layerType, config) {
    const layers = map.getStyle().layers;
    const layerId = config.LAYERS.STATION[layerType].LAYER_ID;
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

function togglePointLayers(map, gaugeVisibility, mapState, currentFeatureLayerId, markerState, setMarkerState, config) {    
    const boundaryLevel = mapState['boundaryLevel'];
    if (boundaryLevel === 0) {
        Object.keys(gaugeVisibility).forEach(async (layerType) => {
            const layerVisibility = gaugeVisibility[layerType];
            const layerConfigData = config.LAYERS.STATION[layerType];
            if (layerConfigData) {
                if (layerVisibility == true) {
                    addPointLayer(map, layerType, null, config);
                } else {
                    removePointLayer(map, layerType, config);
                }
            }   
        });
    } else if (boundaryLevel > 0 && boundaryLevel < 2 ) {
        Object.keys(gaugeVisibility).forEach(async (layerType) => {
            const layerVisibility = gaugeVisibility[layerType];
            const layerConfigData = config.LAYERS.STATION[layerType];
            if (layerConfigData) {
                removePointLayer(map, layerType, config);
                if (layerVisibility === true) {
                    const pointsCollection = await getPointsWithinIntersectingFeatures(map, layerType, currentFeatureLayerId, config);
                    addPointLayer(map, layerType, pointsCollection, config);
                } else if(layerVisibility === false && markerState[layerType] && markerState[layerType].length) {
                    removePointLayer(map, layerType, config);
                }
            }   
        });
    } else if (boundaryLevel >= 2) {
        Object.keys(gaugeVisibility).forEach(async (layerType) => {
            const layerVisibility = gaugeVisibility[layerType]; 
            const layerConfigData = config.LAYERS.STATION[layerType];
            // console.log(layerType, gaugeVisibility[layerType]);
            if (layerConfigData) {
                removePointLayer(map, layerType, config);
                if (layerVisibility) {
                    const pointsCollection = await getPointsWithinIntersectingFeatures(map, layerType, currentFeatureLayerId, config);
                    await addCustomMarkerForPointLayer(map, layerType, pointsCollection, setMarkerState);
                } else {
                    await removeCustomMarkerLayer(map, layerType, markerState);
                }

            }
        });
        
    }
}

async function handleClickOnLayer(map, setMapState, setCurrentFeatureLayerId, config) {
    
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
                intersectingFeatures = await getIntersectingPolygons(map, targetLayerType, feature, config);
                targetLayerId = addBoundaryLayer(map, targetLayerType, intersectingFeatures, config);
                setCurrentFeatureLayerId(targetLayerId);
                const bbox = turf.bbox(intersectingFeatures);
                map.fitBounds(bbox, {
                    padding: 80
                })
                setMapState(incrementState('boundaryLevel'));
                cursorToPointerOnHover(map, targetLayerType, targetLayerId, config);
                
            } else if (feature.layer.id.includes('river-basin-layer')) {
                const layerId = feature.layer.id;
                const targetLayerType = 'PANCHAYAT';
                removeBoundaryLayer(map, layerId);
                intersectingFeatures = await getIntersectingPolygons(map, targetLayerType, feature, config);
                targetLayerId = addBoundaryLayer(map, targetLayerType, intersectingFeatures, config);
                setCurrentFeatureLayerId(targetLayerId);
                const bbox = turf.bbox(intersectingFeatures);
                map.fitBounds(bbox, {
                    padding: 80
                })
                setMapState(incrementState('boundaryLevel'));       
                cursorToPointerOnHover(map, targetLayerType, targetLayerId, config);
            }
            // TODO: Move this setState and other functions here from if-else-if statements
            // setBoundaryLevel(targetLayerType)     
        });
    });
}

function cursorToPointerOnHover(map, layerType, layerId, config) {
    const layerConfigData = config.LAYERS.BOUNDARY[layerType];
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

async function getPointsWithinIntersectingFeatures(map, pointType, polygonLayerId, config) {
    const pointSourceId = config.LAYERS.STATION[pointType].SOURCE_ID;
    const pointSource = map.getSource(pointSourceId);
    const pointData = await pointSource.getData();
    const polygonSource = await map.getSource(polygonLayerId);
    if (polygonSource) { 
        const polygonData = await polygonSource.getData();
        const pointsWithinIntersectingFeatures = turf.pointsWithinPolygon(pointData, polygonData);
        return pointsWithinIntersectingFeatures;
    }
}


export { addPointSource, addPointLayer, addCustomMarkerForPointLayer, togglePointLayers, cursorToPointerOnHover, handleClickOnLayer };