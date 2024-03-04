const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const API_KEY = "8393c545ff4e1a4c93ee6aa25aa11268";
let cityName;
const inputCityName = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const displayIcon = document.querySelector(".weather-icon");
// const displayTemp = document.querySelector(".temp");

const getWeatherInfo = async () => {
  try {
    // cityName = inputCityName.value || "hanoi";
    cityName = inputCityName.value;
    const response = await fetch(`${BASE_URL}&q=${cityName}&appid=${API_KEY}`);
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      const data = await response.json();
      displayIcon.src =
        data.weather[0].main === "Clouds"
          ? "images/clouds.png"
          : data.weather[0].main === "Clear"
          ? "images/clear.png"
          : data.weather[0].main === "Rain"
          ? "images/rain.png"
          : data.weather[0].main === "Drizzle"
          ? "images/drizzle.png"
          : data.weather[0].main === "Mist"
          ? "images/mist.png"
          : null;

      document.querySelector(".temp").innerHTML =
        Math.floor(data.main.temp) + "°C";
      document.querySelector(".city").innerHTML = data.name.toUpperCase();
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }

    // console.log(data);

    // return data;
  } catch (error) {
    console.log(error);
  }
};

// const renderWeatherInfo = async () => {
//   const data = await getWeatherInfo();
//   console.log(data.main.humidity);
//   console.log(data.wind.speed);
// };
// renderWeatherInfo();

getWeatherInfo();
inputCityName.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

searchButton.addEventListener("click", getWeatherInfo);
