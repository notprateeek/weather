window.addEventListener('load', () => {
  let lat, lon;
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');
  const weatherIcon = document.querySelector('.weather-icon');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const key = 'e343f2d0a39531a8b2ec7b84c41f89e9';

      //use proxy if this does not work on live server
      // const proxy = 'https://cors-anywhere.herokuapp.com/';

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const temp = Math.floor(data.main.temp - 273.15);
          const { description, icon } = data.weather[0];
          const location = data.name + ', ' + data.sys.country;

          //set DOM elements from API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = location;

          //formula
          let fahrenheit = (temp * 9) / 5 + 32;

          //change temperature
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === '°C') {
              temperatureSpan.textContent = '°F';
              temperatureDegree.textContent = Math.floor(fahrenheit);
            } else {
              temperatureSpan.textContent = '°C';
              temperatureDegree.textContent = temp;
            }
          });

          //weather icon
          weatherIcon.innerHTML = `<img src="icons/${icon}.png">`;
        });
    });
  }
});
