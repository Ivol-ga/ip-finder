import {addOffset, validateIp} from './helpers/index.js';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
// const mapArea = document.querySelector('#map');
let map = L.map('map').setView([51.505, -0.09], 13);

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_Me5QwBMTpVzCxLqvpzyL11DQZdCUV&ipAddress=${ipInput.value}
      `
    )
      .then((response) => response.json())
      .then(setInfo);
  }
}

function handleKey(e) {
    if(e.key === 'Enter') {
        getData();
    }
}

function setInfo (mapData) {
  const {lat, lng} = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = mapData.location.country + ' ' + mapData.location.region;
  timezoneInfo.innerText = mapData.location.timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  let marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>${mapData.location.country + ' ' + mapData.location.region}</b><br>${mapData.ip}`).openPopup();

  if(matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a><a href="https://github.com/Ivol-ga" class ="copy">&#127757;Coded by Irina</a>'
}).addTo(map);

let   popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


