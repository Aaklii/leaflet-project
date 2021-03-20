// Coordinates
var projectCoordinate = [38.8610, 71.2761];
var indiaCoordinate = [20.5937 , 78.9629];
var suratCoordinate = [21.1702, 72.8311];

// Focusing on particular part of the map based on the coordinate
var map = L.map('map').setView(projectCoordinate, 7);

// Position of zoom controller
map.zoomControl.setPosition('topright');

// adding osm tilelayer 
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// source: https://leaflet-extras.github.io/leaflet-providers/preview/

var watercolorMap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
});

var st = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

//Addming marker in the center of map
var singleMarker = L.marker([38.8610, 71.2761])
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();  

// Setting Up the Scale
L.control.scale({position: 'bottomleft'}).addTo(map);

//Trigger the full screen
var mapId = document.getElementById('map');
function fullScreenView() {
    mapId.requestFullscreen();
}

//Show Map coordinates on the web
map.on('mousemove', function(e){
    console.log(e)
    $('.coordinate').html('Lat: '+ e.latlng.lat +  " "+  'Lng: ' +  e.latlng.lng)
})

//Print Map
function printMap() {
    window.print();
}

//Will add print controllers
L.control.browserPrint().addTo(map)

//Measurement
L.control.measure({
    primaryLengthUnit: 'kilometers', 
    secondaryLengthUnit: 'meter',
    primaryAreaUnit: 'sqmeters', 
    secondaryAreaUnit: undefined,
    activeColor: '#165e9c',
    completedColor: '#165e9c'
}).addTo(map)

// Adding GeoJson Data Markers
// L.geoJSON(data).addTo(map);

//Leaflet layer control
var baseMaps = {
    'OSM': osm,
    'Water Color Map': watercolorMap,
    'Stamen Toner': st
}

var overlayMaps = {
    'GeoJSON Markers': marker,
    'Single Marker': singleMarker
}

L.control.layers(baseMaps, overlayMaps, { collapsed: false, position: 'topleft' }).addTo(map);


//Zoom to Layer
function zoomToLayer() {
    map.setView(projectCoordinate, 7);
}


