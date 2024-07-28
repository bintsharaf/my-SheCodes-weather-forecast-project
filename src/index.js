function updateWeatherInfo(response) {
    
    let temperatureElement = document.querySelector("#temp-number");
    let temperature = Math.round(response.data.temperature.current);
    let searchCityElement = document.querySelector("#Search-input-city");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind"); 
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000); 
    let iconElement = document.querySelector("#icon"); 
    console.log(date);
    console.log(response.data.condition.icon_url);

    temperatureElement.innerHTML = temperature;
    searchCityElement.innerHTML = response.data.city;
    weatherDescriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    //created a function to display the real day 
    timeElement.innerHTML = formartDate(date);
    iconElement.innerHTML = `<img src= ${response.data.condition.icon_url}  class="temp-icon ">`
    getForecast(response.data.city);
}
function formartDate(date) {
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let day = days[date.getDay()];
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
    return `${day} ${hours}:${minutes}`
}   
function linkCity(city) {
    let  apiKey = "29583e5b03o3adtc2486edaf9f3af0e3"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(updateWeatherInfo);
  }

function onClickForm(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#Search-input-text");
    
    linkCity(searchInputElement.value);
}


let formElement = document.querySelector("#Search-form");
formElement.addEventListener("submit", onClickForm); 

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat" ];
    
    return days[date.getDay()];
    }

function getForecast(city) {
   let  apiKey = "29583e5b03o3adtc2486edaf9f3af0e3"
   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
   axios.get(apiUrl).then(displayForecast); 
} 

function displayForecast(response) {
    
    let forecastHtml = "";
    console.log(response.data);
   response.data.daily.forEach(function (day, index) {
    if (index < 5) {
        forecastHtml = forecastHtml + 
                `<div class="weather-forecast-day"> 
                    <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    <img src = "${day.condition.icon_url}" class="weather-forecast-icon">
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}</strong></div> 
                        <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}</div>
                    </div>
                </div>
                `;
    }
    });
    let weatherForecastElement = document.querySelector("#weather-forecast");
    weatherForecastElement.innerHTML = forecastHtml;
}

linkCity("Lagos");
