const wContainer = document.querySelector(".js-weather"),
  wInfo = wContainer.querySelector("h4");

const API_KEY = "9787989dad415fad935518cd5b866286" ; 
const COORDS_LS = "coords"; 


function getWeatherInfo ( lat , lng ) {
  fetch (
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then ( function( response ) {
    return response.json(); 
  }).then( function(jsonData) {
    wInfo.innerText = `${jsonData.name} : ${jsonData.main.temp}℃`
  });

}

function saveCoords(coords) {
  localStorage.setItem(COORDS_LS , JSON.stringify(coords)) ; 
}

function handleGeoSuccess(position) {
  const lat = position.coords.latitude; 
  const lng = position.coords.longitude; 
  const coordsOjb = {
    lat , 
    lng
  }
  saveCoords ( coordsOjb); 
  getWeatherInfo ( lat , lng )

}

function handelGeoFail () {
  console.log('Fail to get geo informaiton'); 
}

function askForCoords () {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess , handelGeoFail ); ß
}

function loadCoords () {
  const loadedCoords = localStorage.getItem(COORDS_LS); 
  if ( loadedCoords === null ) {
      askForCoords(); 
  }
  else {
    const parsedCoords = JSON.parse(loadedCoords); 
    getWeatherInfo( parsedCoords.lat , parsedCoords.lng ) ; 

  }
}

function init () {

  loadCoords(); 

}


init ();  
