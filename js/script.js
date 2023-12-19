const apiKey = "a8fd3c8de6a4b0d7617fad065d839b68";
const apiCountryURL = "https://flagsapi.com/BR/flat/64.png";

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data');
const errorMessage = document.querySelector('#error');

//Functions

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

const showWeather = async (city) => {
    const data = await getWeatherData(city);

    if (!data.id) {
        weatherContainer.classList.add("hide");
        errorMessage.classList.remove("hide");
    }
    else {
        cityElement.innerText = data.name;
        tempElement.innerHTML = parseInt(data.main.temp);
        descElement.innerHTML = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        umidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;

        weatherContainer.classList.remove("hide");
        errorMessage.classList.add("hide");
    }
}

//Events

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeather(city);
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeather(city);
    }
})