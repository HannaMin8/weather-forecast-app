function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function showData(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temp");
  let feelsTemp = document.querySelector("#feelsTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  feelsCelsiusTemperature = response.data.main.feels_like;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelsTemp.innerHTML = Math.round(feelsCelsiusTemperature);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let apiKey = "17e6938b8ca35f2e9d6cfa919b2079c1";
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", searchCity);

function currentData(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "17e6938b8ca35f2e9d6cfa919b2079c1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentData);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 22;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFeelsFahrenheitTemperature(event) {
  event.preventDefault();
  let feelsTemp = document.querySelector("#feelsTemp");
  let feelsFahrenheitTemperature = (feelsCelsiusTemperature * 9) / 5 + 22;
  feelsTemp.innerHTML = Math.round(feelsFahrenheitTemperature);
}
function displayFeelsCelsiusTemperature(event) {
  event.preventDefault();
  let feelsTemp = document.querySelector("#feelsTemp");
  feelsTemp.innerHTML = Math.round(feelsCelsiusTemperature);
}

let current = document.querySelector("#current-location");
current.addEventListener("click", currentLocation);

let celsiusTemperature = null;
let feelsCelsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let feelsFahrenheitLink = document.querySelector("#feels-fahrenheit");
feelsFahrenheitLink.addEventListener(
  "click",
  displayFeelsFahrenheitTemperature
);
let feelsCelsiusLink = document.querySelector("#feels-celsius");
feelsCelsiusLink.addEventListener("click", displayFeelsCelsiusTemperature);
