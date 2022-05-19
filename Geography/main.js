const map = L.map ('map', {
    center: [40.789433	-73.947589],
    Zoom: 16,
    scrollWheelZoom: true
});
//const basemapStamenTerrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
//	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	//subdomains: 'abcd',
	//minZoom: 0,
	//maxZoom: 18,
	//ext: 'png'
//})
    //.addTo(map);

    var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

    $.get('../data/ENGBV_Resource_Directory.csv', function(
        csvString) {
const data = Papa.parse(
    csvString, {header: true, dynamicTyping: true}).data;
console.log(data)
for (var i in data) {
    var row = data[i];

    let popupContent = "<div class=popup"+'<p>'+'Age: '+row.
    Age+"<p>"+"Type : "+row.Title+"</p>"+"</div>";

let marker = L.circleMarker([row.Latitude, row.Longitude],{

radius: 7,
fillColor: "Purple",
color: "blue",
weight: 1,
opacity:0.8,
fillOpacity:0.6
})

.bindPopup(popupContent);

marker.addTo(map);
}
        }
    );
    