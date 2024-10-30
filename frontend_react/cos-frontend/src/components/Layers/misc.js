import * as turf from '@turf/turf';
import maplibregl from 'maplibre-gl';
import { userConfig } from '../../ConfigContext';

function centerLatLngFromFeature(feature) {
    const centroid = turf.centroid(feature.geometry);
    const lngLat = new maplibregl.LngLat(centroid.geometry.coordinates[0], centroid.geometry.coordinates[1])
    return lngLat;
}




async function generateCustomMarker(layerType, config) {
    const urlBase = config.MARKER_BASE.URL;
    const urlStation = config.LAYERS.STATION[layerType].MARKER_PATH;
    const [svg1, svg2] = await Promise.all([
        fetch(urlStation).then(response => response.text()),
        fetch(urlBase).then(response => response.text())
    ]);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '48');

    const g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g1.innerHTML = svg1; // first SVG content
    svg.appendChild(g1);

    const g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g2.setAttribute('transform', 'translate(0, 24)'); // move the second SVG down by 24 pixels
    g2.innerHTML = svg2; // second SVG content
    svg.appendChild(g2);

    const marker = new maplibregl.Marker({
        element: svg,
        draggable: false,
        anchor: 'bottom'
    });
    return marker;
}



function incrementState(property) {
  return (prevState) => ({ ...prevState, [property]: prevState[property] + 1 });
}

export { centerLatLngFromFeature, generateCustomMarker, incrementState }