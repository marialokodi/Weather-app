const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
const URL_FORECAST_WEATHER =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
const URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png
let weatherData = {};
let weatherDataCurrent = {};

async function showWeather() {
  let cityNameInput = document.querySelector("[name='city']").value;
  cityNameInput = cityNameInput.toLowerCase();

  const response = await fetch(URL_CURRENT_WEATHER + cityNameInput);
  weatherDataCurrent = await response.json();

  let weatherInfoText = document.querySelector("#currentWeatherInfo");

  weatherInfoText.innerHTML = `    
  <div class="weatherData">
    <div class="weatherInfo">
      <div>Temperature</div> 
      <div>${weatherDataCurrent.main.temp}&#176;C</div>
    </div>
    <div class="weatherInfo">
    <div>Humidity</div> 
    <div>${weatherDataCurrent.main.humidity}%</div>
  </div>
    <div class="weatherInfo">
      <div>Wind speed</div> 
      <div>${weatherDataCurrent.wind.speed}km/h</div>
    </div>
    <div class="weatherInfo">
      <div>Pressure</div> 
      <div>${weatherDataCurrent.main.pressure}</div>
    </div>
  </div>`;

  let placeEl = document.querySelector(".placeContainer");
  placeEl.innerHTML = `
  <div class="timeZone" id="timeZone">${weatherDataCurrent.name}</div>
  <div id="country" class="country">${weatherDataCurrent.sys.country}</div>
  `;

  let todayInfo = document.querySelector(".today");
  todayInfo.innerHTML = `
  <img
  src="http://openweathermap.org/img/w/${weatherDataCurrent.weather[0].icon}.png"
  alt="weather icon"
  class="w-icon"
  />
    <div class="day">Today</div>
    <div class="currentTemp">
      <div>Max</div> 
      <div>${weatherDataCurrent.main.temp_max} &#176;C</div>
    </div> 
    <div class="currentTemp">
      <div>Min</div> 
      <div>${weatherDataCurrent.main.temp_min} &#176;C</div>
    </div> `;
  showForecast();
}

async function showForecast() {
  document.querySelector(".futureForcast").classList.remove("hidden");
  let cityNameInput = document.querySelector("[name='city']").value;
  cityNameInput = cityNameInput.toLowerCase();

  const response = await fetch(URL_FORECAST_WEATHER + cityNameInput);
  weatherData = await response.json();

  let forcastInfoText = document.querySelector(".weatherForcasts");
  let str = "";

  let dayString = weatherData.list[0].dt_txt.substring(0, 10);

  for (let [i, article] of Object.entries(weatherData.list)) {
    if (article === null) {
      continue;
    }

    while (article.dt_txt.substring(0, 10) === dayString) {
      console.log(article.main.temp);
      break;
    }

    str += `
    <div class="weatherForcastItem">

      <div>${article.dt_txt.substring(10, 16)}</div>
      <div>
        <img src="http://openweathermap.org/img/w/${
          article.weather[0].icon
        }.png" alt="" />
      </div>
      <div class="forcastTemp">${article.main.temp} &#176;C</div>
    </div>`;
  }
  forcastInfoText.innerHTML = str;
}

function getDateTime() {
  const timeEl = document.querySelector(".time");
  const dateEl = document.querySelector(".date");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursInAmPm = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    let amPm = hour >= 12 ? "PM" : "AM";

    timeEl.innerHTML = `${hoursInAmPm}:${minutes} <span id="am-pm">${amPm}</span>`;
    dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`;
  }, 1000);
}
