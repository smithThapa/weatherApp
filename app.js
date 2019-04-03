let leftButton = document.querySelector(".arrow-image-left");
let rightButton = document.querySelector(".arrow-image-right");
let cityTitle = document.querySelector(".city-title");
let currentTemperature = document.querySelector(".current-temp");
let weatherCondition = document.querySelector(".weather-condition");
let wrapper = document.querySelector(".wrapper");
let fivedayForecastWrapper = document.querySelector(".five-days-forecast-wrapper");
let mainIcons = document.querySelector(".main-icons");
let loader = `<div class="loader-wrapper"><div class="lds-dual-ring"></div></div>`;

const CITIES = {
    "Sydney": {
        lat: "-33.8688",
        lon: "151.2093"
    },
    "Brisbane": {
        lat: "-27.4698",
        lon: "153.0251"
    },
    "Melbourne": {
        lat: "-37.8136",
        lon: "144.9631"
    },
    "Snowy Mountains": {
        lat: "-36.5000",
        lon: "148.3333"
    }
};

const API_KEY = "wSo0LRcHZMmsh4rXshasAImNK7Ulp19zkGQjsnUjeMXsnpyilC";
const CITIES_NAMES = ["Sydney", "Brisbane", "Melbourne", "Snowy Mountains"];


let date = moment();
let currentIndex = 0;
let fetchData = {
    headers: {
        "X-Mashape-Key": API_KEY
    }
};
let url = `https://weatherbit-v1-mashape.p.mashape.com/forecast/daily?lat=${
  CITIES[CITIES_NAMES[0]].lat
}&lon=${CITIES[CITIES_NAMES[0]].lon}`;

fetchWeatherData(url, fetchData);

function weatherIconSelector(code) {
    if (code === 800) {
        return "sunny";
    } else {
        code = Number(code.toString()[0]);
        switch (code) {
            case 2:
                return "thunderStorm";
            case 3:
            case 5:
                return "rain";
            case 6:
                return "snow";
            case 7:
            case 8:
                return "cloudy";
        }
    }
}

function renderHTML(citiesNamesArr,daysArr, date){
    return `
    <div class="city-title-wrapper">
        <p class="city-title">${citiesNamesArr[currentIndex]}</p>
    </div>
    
    
    <div class="main-icons">
        <img class="arrow-image arrow-image-left" src="assets/leftArrow.png" alt="Left arrow button" />
        <img class="big-image" src="assets/${weatherIconSelector(daysArr[0].weather.code)}.png" alt="Thunderstorm icon" />
        <img class="arrow-image arrow-image-right" src="assets/rightArrow.png" alt="Rigth arrow button" />
    </div> 
    
    <p class="current-temp">${Math.round(daysArr[0].temp)}°</p>
    <div class="range">
        <p class="low-temp">${Math.round(daysArr[0].min_temp)}°</p>
        <p class="high-temp">${Math.round(daysArr[0].max_temp)}°</p>
    </div>
    <p class="weather-condition">${daysArr[0].weather.description}</p>
    <hr>
    
    
  
    <div class="five-day-forecast">
        <div class=" day day-one">
            <p class="week-day">${date.clone().add(1, "days").format("dddd").slice(0,3)}</p>
            <img class="small-image" src="https://bit.ly/webApp_Assets_${weatherIconSelector(daysArr[1].weather.code)}" alt="Sunny icon" />
            <p class="week-temperature">${Math.round(daysArr[1].max_temp)}/${Math.round(daysArr[1].min_temp)}</p>
        </div>
        <div class=" day day-one">
            <p class="week-day">${date.clone().add(2, "days").format("dddd").slice(0,3)}</p>
            <img class="small-image" src="https://bit.ly/webApp_Assets_${weatherIconSelector(daysArr[2].weather.code)}" alt="Sunny icon" />
            <p class="week-temperature">${Math.round(daysArr[2].max_temp)}/${Math.round(daysArr[2].min_temp)}
            </p>
        </div>
        <div class="day day-two">
            <p class="week-day">${date.clone().add(3, "days").format("dddd").slice(0,3)}</p>
            <img class="small-image" src="https://bit.ly/webApp_Assets_${weatherIconSelector(daysArr[3].weather.code)}" alt="Sunny icon" />
            <p class="week-temperature">${Math.round(daysArr[3].max_temp)}/${Math.round(daysArr[3].min_temp)}
            </p>
        </div>
        <div class="day day-three">
            <p class="week-day">${date.clone().add(4, "days").format("dddd").slice(0,3)}</p>
            <img class="small-image" src="https://bit.ly/webApp_Assets_${weatherIconSelector(daysArr[4].weather.code)}" alt="Sunny icon" />
            <p class="week-temperature">${Math.round(daysArr[4].max_temp)}/${Math.round(daysArr[4].min_temp)}
            </p>
        </div>
        <div class="day day-four">
            <p class="week-day">${date.clone().add(5, "days").format("dddd").slice(0,3)}</p>
            <img class="small-image" src="https://bit.ly/webApp_Assets_${weatherIconSelector(daysArr[5].weather.code)}" alt="Sunny icon" />
            <p class="week-temperature">${Math.round(daysArr[5].max_temp)}/${Math.round(daysArr[5].min_temp)}
            </p>
        </div>
    </div>`;
}


function fetchWeatherData(url, fetchData) {
    wrapper.innerHTML = loader;
    fetch(url, fetchData)
        .then(res => res.json())
        .then(data => {
            let sixDaysTempData = data.data.filter((value, index, arr) => index<6);

            wrapper.innerHTML = renderHTML(CITIES_NAMES, sixDaysTempData, date);
        })
        .catch(err => {
            console.log(err);
        });
};

$(document).on("click", ".arrow-image-left", () => {
    if (currentIndex === 0) {
        currentIndex = CITIES_NAMES.length - 1;
    } else {
        currentIndex--;
    }

    let lat = CITIES[CITIES_NAMES[currentIndex]].lat;
    let lon = CITIES[CITIES_NAMES[currentIndex]].lon;

    url = `https://weatherbit-v1-mashape.p.mashape.com/forecast/daily?lat=${lat}&lon=${lon}`;

    fetchWeatherData(url, fetchData);
});

$(document).on("click", ".arrow-image-right", () => {
    if (currentIndex === CITIES_NAMES.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }

    let lat = CITIES[CITIES_NAMES[currentIndex]].lat;
    let lon = CITIES[CITIES_NAMES[currentIndex]].lon;

    url = `https://weatherbit-v1-mashape.p.mashape.com/forecast/daily?lat=${lat}&lon=${lon}`;

    fetchWeatherData(url, fetchData);
});