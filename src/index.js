import axios from "axios";
let apiKey = "01daaf85b5f99f10a866101e96d3478e";
function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

$(window).load(function(){
  let button = document.querySelector("#chooseCurrentLocation");
  button.addEventListener("click", currentPosition);
  enterCity("London");
}

,function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather/?lat=${Latitude}&lon=${Longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(alertWeather);
}

,function alertWeather(response) {
  window.onload=function(){
let form = document.querySelector("form");

form.addEventListener("submit", submitCity);

}
  
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
}

               
,function enterCity(city) {
  //event.preventDefault();
  let apiKey = "5562088dc6a08cb31f02b4a3aba8768d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(alertWeather);
}
               
,function submitCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#yourcity");
  //console.log(inputCity.value);

  let searchCity = document.querySelector("#currentcity");
  //console.log(searchCity);

  searchCity.innerHTML = `${inputCity.value}`;
  enterCity(`${inputCity.value}`);
}

//end of code// 
