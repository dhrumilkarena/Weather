const ipapiUrl = 'https://ipapi.co/json/';
const openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = "7cc86e0719f9590c4b8aa1cd7bc6b7ce";
const imgUrl = 'http://openweathermap.org/img/wn/';


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        
        const weatherApiUrl = `${openWeatherMapUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        fetchWeatherData(weatherApiUrl);
      },
      error => {
        console.log('Error getting location:', error);
        
        fetchWeatherWithIP();
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
    fetchWeatherWithIP();
  }
}


function fetchWeatherData(url) {
  fetch(url)
    .then(response => response.json())
    .then(weatherData => {
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const location = weatherData.name;
      const imgCode = weatherData.weather[0].icon;
      const imgAddr = `${imgUrl}${imgCode}@2x.png`;

      const imageElement = document.getElementById("icon");
      const temp = document.getElementById('temperature');
      const desc = document.getElementById('description');
      const loc = document.getElementById('loc');
      temp.innerHTML = Math.round(temperature - 273);
      desc.innerHTML = description;
      loc.innerHTML = location;
      imageElement.setAttribute("src", imgAddr);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function fetchWeatherWithIP() {
  fetch(ipapiUrl)
    .then(response => response.json())
    .then(ipData => {
      const latitude = ipData.latitude;
      const longitude = ipData.longitude;


      const weatherApiUrl = `${openWeatherMapUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
      fetchWeatherData(weatherApiUrl);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


document.addEventListener("DOMContentLoaded", getLocation);