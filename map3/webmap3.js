let stateMap = L.map('map3').setView([32.18, -99.14], 4)
L.tileLayer('https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png').addTo(stateMap)
let stateDemographicsUrl = 'https://geog4046.github.io/portfolio/data/us_state_demographics_ESRI_2010A.geojson'
jQuery.getJSON(stateDemographicsUrl, function (data) {
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
  let name = feature.properties.STATE_NAME
       let age = feature.properties.AVE_HH_SZ
       layer.bindPopup('Median House Hold Size of ' + name + ': ' + age + '<br>National average: 2.5')
   }
  let stateGeojsonOptions = {
    style: stateStyle,
    onEachFeature: onEachFeature
   }
  L.geoJSON(data, stateGeojsonOptions).addTo(stateMap)
})
