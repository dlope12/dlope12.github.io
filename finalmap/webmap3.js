let stateMap = L.map('map3').setView([32.78, -97.25], 6)
L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png').addTo(stateMap)
let wastefascilities = 'https://opendata.arcgis.com/datasets/05a4fee4d8ac4bc99ecf00ef0a0fbdfa_0.geojson'
jQuery.getJSON(wastefascilities, function (data) {
  let stateStyle = function (feature) {
  let age = feature.properties.AVE_HH_SZ // get the current state's Median Age attribute
  let stateColor = 'purple' // let the initial color be a darker green
  if ( age > 2.5 ) { stateColor = 'blue' } // if the state's median age is less than the average, color it a lighter green
  return {
    color: stateColor, //use the color variable above for the value
    weight: 1,
    fillOpacity: 0.2,
    opacity: 1.0

  }
}
let onEachFeature = function (feature, layer) {
  let namestate = feature.properties.STATE
  let city = feature.properties.CITY
  let wastename = feature.properties.NAME
  let type = feature.properties.TYPE
       let stat = feature.properties.STATUS
       layer.bindPopup( '<font size="2"><b>Fascility Name:</b></font> ' + wastename +'<br><font size="2"><b> City and State:</font></b> '+ city +', '+ namestate + '<br><font size="2"><b>Status: </font></b> ' +  stat + '<br><font size="2"><b>Type:  </font></b> ' + type )
   }
  let stateGeojsonOptions = {
    style: stateStyle,
    onEachFeature: onEachFeature
   }
  L.geoJSON(data, stateGeojsonOptions).addTo(stateMap)
})
