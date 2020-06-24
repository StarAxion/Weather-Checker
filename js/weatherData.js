let apiKey = '3b234bf2de38c9709d58416f2d8443de';

let temperature = getElement("current-temperature"),
  humidity = getElement("current-humidity"),
  windSpeed = getElement("current-wind-speed"),
  pressure = getElement("current-pressure"),
  weatherSummary = getElement("weather-summary"),
  geoWeatherButton = getElement("geo-weather"),
  cityWeatherButton = getElement("city-weather");

function getElement(id) {
  return document.getElementById(id);
}



function getCurrentGeoPosition() {
  cityNameField.value = '';
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    });
  } else {
    temperature.innerHTML = '---';
    humidity.innerHTML = '---';
    windSpeed.innerHTML = '---';
    pressure.innerHTML = '---';
    weatherSummary.innerHTML = 'Your browser does not support Geolocation API!';
  }
}

if (geoWeatherButton) {
  geoWeatherButton.addEventListener('click', getCurrentGeoPosition);
}

function fetchWeatherByCoords(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      displayWeatherData(result);
    })
    .catch(function () {
      temperature.innerHTML = '---';
      humidity.innerHTML = '---';
      windSpeed.innerHTML = '---';
      pressure.innerHTML = '---';
      weatherSummary.innerHTML = 'Something went wrong. Please try again.';
    });
}



function enterCityName(e) {
  e.preventDefault();
  if (cityNameField.value != '') {
    fetchWeatherByCity(cityNameField.value);
  } else {
    cityNameField.focus();
  }
}

if (cityWeatherButton) {
  cityWeatherButton.addEventListener('click', enterCityName);
}

function fetchWeatherByCity(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      displayWeatherData(result);
    })
    .catch(function () {
      temperature.innerHTML = '---';
      humidity.innerHTML = '---';
      windSpeed.innerHTML = '---';
      pressure.innerHTML = '---';
      weatherSummary.innerHTML = 'Invalid city name. Please try again.';
      cityNameField.value = '';
      cityNameField.focus();
    });
}



function displayWeatherData(data) {
  temperature.innerHTML = convertKelvinToCelsius(data.main.temp) + ' °C';
  humidity.innerHTML = data.main.humidity + ' %';
  windSpeed.innerHTML = data.wind.speed + ' m/s';
  pressure.innerHTML = data.main.pressure + ' hPa';
  weatherSummary.innerHTML = data.weather[0].main;
}

function convertKelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}