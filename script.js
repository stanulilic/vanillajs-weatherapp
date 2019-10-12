const weather = document.querySelector('.weather');
const searchBtn = document.querySelector('button[role="search"]');
const cityField = document.querySelector('input[type="search"]');
const forecastRow = document.querySelector('.forecast > .row');
const dateElement = document.querySelector('.header__date');

function printTodayDate() {
  const today = new Date();
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  dateElement.insertAdjacentText('afterbegin', today.toLocaleString('en-us', options));
}

function getWeekDay(date) {
  const options = { weekday: 'long' };
  return date.toLocaleString('en-us', options);
}

function renderForecast(forecast) {
  while (forecastRow.firstChild) {
    forecastRow.removeChild(forecastRow.firstChild);
  }
  forecast.forEach((weatherData) => {
    const markup = `<div class="forecast__day">
     <h3 class="forecast__date">${getWeekDay(new Date(weatherData.dt * 1000))}</h3>
     <i class="wi wi-cloud forecast__icon"></i>
     <p class="forecast__temp">${Math.floor(weatherData.main.temp)}°C</p>
     <p class="forecast__desc">${weatherData.weather[0].main}</p>
   </div>`;
    forecastRow.insertAdjacentHTML('beforeend', markup);
  });
}

function getForecast(city) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecastData = data.list.filter((obj) => obj.dt_txt.endsWith('06:00:00'));
      renderForecast(forecastData);
    });
}
function getCityWeather(city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=35b1f1d45a7b4378cf2430ae601816be&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const markup = `<h1 class="location">${data.name}, ${data.sys.country}</h1>
 <div class="weather__summary">
    <p><i class="wi wi-cloud weather-icon"></i> <span class="weather__celsius-value">${Math.floor(data.main.temp)}°C</span></p>
    <p>${data.weather[0].main}</p>
    <ul class="weather__miscellaneous">
    <li><i class="wi wi-humidity"></i> Humidity  <span>${data.main.humidity}%</span></li>
    <li><i class="wi wi-small-craft-advisory"></i> Wind Speed <span>${data.wind.speed} m/s</span></li>
    </ul>
 </div>
 `;
      while (weather.firstChild) {
        weather.removeChild(weather.firstChild);
      }
      weather.insertAdjacentHTML('beforeend', markup);
    })
    .catch((error) => {
      console.log(error);
    });
}

printTodayDate();
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getCityWeather(cityField.value);
  getForecast(cityField.value);
});
