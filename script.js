const res = fetch('http://api.openweathermap.org/data/2.5/weather?q=zomba&APPID=35b1f1d45a7b4378cf2430ae601816be');

res
  .then((data) => data.json())
  .then((weatherData) => {
    console.log(weatherData.weather);
  })
  .catch((err) => {
    console.log(err);
  });
