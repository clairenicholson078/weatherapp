import axios from "axios";
let apiKey = "01daaf85b5f99f10a866101e96d3478e";
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

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
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
    
 let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}



function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather/?lat=${Latitude}&lon=${Longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(alertWeather);
}

let button = document.querySelector("#chooseCurrentLocation");
button.addEventListener("click", currentPosition);

console.log(button);

function alertWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCondition = document.querySelector("#mainextradetails");
  console.log(response.data.weather[0].main);
  currentCondition.innerHTML = response.data.weather[0].main;
  console.log(response.data.weather.icon);
  let weather = document.querySelector("#currentlytemp");
  weather.innerHTML = `${temperature}°C`;
  
  //let currentTemp = (response.data.main.temp);
  //let currentTempRound = Math.round(currentTemp);
  //alert("The temperature is currently "+ currentTempRound + "°C");
  //let currentTemptoChange = document.querySelector("#currentlytemp");
  //currentTemptoChange.innerHTML = currentTempRound + "°C";
  let mainCity = document.querySelector("#currentcity");
  mainCity.innerHTML = response.data.name;
  //console.log(response.data);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);


}

let form = document.querySelector("form");

form.addEventListener("submit", submitCity);

function submitCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#yourcity");
  //console.log(inputCity.value);

  let searchCity = document.querySelector("#currentcity");
  //console.log(searchCity);

  searchCity.innerHTML = `${inputCity.value}`;
  enterCity(`${inputCity.value}`);
}
//Default City
enterCity("London");

function enterCity(city) {
  //event.preventDefault();
  let apiKey = "5562088dc6a08cb31f02b4a3aba8768d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(alertWeather);
}
