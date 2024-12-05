// Load the GeoTIFF file

async function loadGeoTIFF(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    
    // Get the raster data
    const rasterData = await image.readRasters();
    
    // Get the bounding box of the image
    const bbox = image.getBoundingBox();
    
    // Create an image source for the raster data
    map.on('load', () => {
        map.addSource('geotiff-source', {
            type: 'image',
            url: URL.createObjectURL(new Blob([rasterData], { type: 'image/tiff' })),
            coordinates: [
                [bbox[0], bbox[1]], // bottom-left
                [bbox[2], bbox[1]], // bottom-right
                [bbox[2], bbox[3]], // top-right
                [bbox[0], bbox[3]]  // top-left
            ]
        });

        // Add the image layer to the map
        map.addLayer({
            id: 'geotiff-layer',
            type: 'raster',
            source: 'geotiff-source',
            paint: {
                'raster-opacity': 0.8 // Adjust opacity as needed
            }
        });
    });
}