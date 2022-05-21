const map = L.map('map', {
    center: [40.789433, -73.947589],
    zoom: 16,
    scrollWheelzoom: true
});
    const Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
})
    .addTo(map);


    $.get('../data/ENGBV_Resource_Directory.csv', function(
        csvString) {
            data1 = Papa.parse(
                csvString, {header: true, dynamicTyping: true}).
               data.filter(
                   function(row) {return row.Shift ==="FIRSTLANGUAGE"}
                    )
                data2 = Papa.parse(csvString, {header: true,
               dynamicTyping: true}).data.filter(
                    function(row) {return row.Shift === "SECONDLANGUAGE"}
                );



    //$.get('../data/ENGBV_Resource_Directory.csv', function(
        //csvString) {
//const data = Papa.parse(
    //csvString, {header: true, dynamicTyping: true}).data;
//console.log(data)
console.log(data1)
console.log(data2)
for (var i in data) {
    var row = data[i];

    let popupContent = "<div class=popup"+'<p>'+'Precinct: '+row.Precinct+"<p>"+"Number of Language Services : "+row.LanguageServices+"<br>"+"Program Hours : "+row.PROGRAMHOURS+"</p>"+"<p>"+"First Language : "+row.FIRSTLANGUAGE+"<br>"+"Second Language : "+row.SECONDLANGUAGE+"</p>"+"</div>";

    let marker = L.circleMarker([row.LATITUDE, row.LONGITUDE],{

radius: 7,
fillColor: "Purple",
color: "blue",
weight: 1,
opacity:0.8,
fillOpacity:0.6
})

.bindPopup(popupContent);

marker.addTo(map);

markers2.push(marker2);
}
layer2 = L.layerGroup(markers2).addTo(map);
legend.addOverlay(layer2,"LanguageServices")
        }
    );
    