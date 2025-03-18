const apiKey = "27918d822d0de89c09d53634bb7dc3ab";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchZone = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; 
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        console.log(data.weather[0].main);
        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "img/clouds.png";
      } else if (data.weather[0].main == "Clear") {
          if (data.main.temp < 0) {
              weatherIcon.src = "img/drizzle.png"; 
          } else {
              weatherIcon.src = "img/clear.png";
          }
      } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "img/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "img/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "img/mist.png";
      } else if (data.weather[0].main == "Snow") {
          weatherIcon.src = "img/snow.png"; 
      }
      
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchZone.value);
});
checkWeather();
