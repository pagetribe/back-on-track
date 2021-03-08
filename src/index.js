import L from 'leaflet'
import Locate from 'leaflet.locatecontrol'
import _ from 'lodash'
import 'leaflet/dist/leaflet.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.css'
import "leaflet/dist/images/marker-icon-2x.png"

import './style.css'


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// console.log('working ..........: ', L)

// var map = L.map('mapid').setView([51.505, -0.09], 13);
var map = L.map('mapid', {
  // center: [-32.987602, 151.708308],
  zoom: 16,
});

map.locate({
  setView: 'true', //zooming the map view to the detected location
  maxZoom: 16,
});

// show the scale bar on the lower left corner
L.control.scale({ imperial: false }).addTo(map);




let startMarker;

function saveStartLatLng() {
  localStorage.setItem('startLatLng', startMarker.getLatLng())
  console.log('................. ', startMarker.getLatLng())
}

map.on('popupopen', function () {
  L.DomEvent.addListener(
    // document.getElementById('start-button'),
    L.DomUtil.get('start-button'),
    'click',
    function (e) {
      saveStartLatLng()
    });
});

function onLocationFound(e) {
  var radius = e.accuracy;

  startMarker = L.marker(e.latlng, { draggable: true })
    .addTo(map)
    .bindPopup("Save as starting point. <br> <button id='start-button'>save</button > ")
    .openPopup();

  // var buttonSubmit = L.DomUtil.get('start-button');

  // L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
  //   saveStartLatLng()
  // });

  // .bindPopup(<button onclick="window.location.href='https://w3docs.com';">Click Here</button>).openPopup();
  // .bindPopup("You are within " + radius + " meters from this point" + "<button onclick=" + saveStartLatLng() + ">save as start</button>").openPopup();
  // var popup = L.popup()
  //   .setLatLng(e.latlng)
  //   .setContent("<button id='start-button'>Click Here</button > ")
  //   .openOn(map);

  let circle = L.circle(e.latlng, radius).addTo(map);

  startMarker.on('dragend', function (e) {
    startMarker.openPopup()
  })

  startMarker.on('dragstart', function (e) {
    map.removeLayer(circle)
  })
  console.log(e.latlng)
}

map.on('locationfound', _.once(onLocationFound))
// map.on('locationfound', onLocationFound)

function onLocationError(e) {
  // alert(e.message);
}

map.on('locationerror', onLocationError);



// locate control ---------------------

const lc = new Locate({
  locateOptions: {
    // enableHighAccuracy: true,
    // setView: true, //zooming the map view to the detected location
  },
  // setView: true,
  keepCurrentZoomLevel: true,
  initialZoomLevel: 15,
  showCompass: true,
}).addTo(map)

// console.log(lc)
// L.control.locate({
//   locateOptions: {
//     enableHighAccuracy: true
//   },
//   keepCurrentZoomLevel: true,
//   showCompass: true
// }).addTo(map)

// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   subdomains: ['a', 'b', 'c']
// }).addTo(map);

var HikeBike_HikeBike = L.tileLayer('https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
//   maxZoom: 20,
//   attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
//   maxZoom: 20,
//   attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// function onMapClick(e) {
//   alert("You clicked the map at " + e.latlng);
// }
// map.on('click', onMapClick);



