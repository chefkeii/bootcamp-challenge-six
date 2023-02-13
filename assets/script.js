const apiKey = 'd00d205a1e8496ce0adbd5b08fd6ba48';

let currentWeather = document.getElementById('current-weather');
let submitBtn = document.getElementById('citySearch');
let searchInput = document.querySelector('input');
let displayFiveDay = document.getElementById('display-five-day');
let pastSearchBtns = document.getElementById("past-search-btns");

submitBtn.addEventListener('click', searchSubmit);

// city search button
function searchSubmit(event) {
    event.preventDefault();
    if (!searchInput.value) {
        return;
    } else {
        let city = searchInput.value.toUpperCase().trim();
        fetchCurrentWeather(city);
        fetchFiveDayWeather(city);
        searchInput.value = "";
    }
    pastSearch();
}

//  current day weather fetch
function fetchCurrentWeather(city) {
    let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(apiUrlWeather)
        .then(results => results.json())
        .then(data => {
            console.log(data);  
            displayCurrentWeather(data, city);
        });
}

// weather = data from line 26
function displayCurrentWeather(weather, cityName) {
    let city = document.createElement('h3');
    city.textContent = cityName;

    let date = document.createElement('p');
    date.textContent = 'Today: ' + dayjs().format('MM/DD/YYYY');

    let iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    let icon = document.createElement('img');
    icon.setAttribute('src', iconUrl);
    icon.setAttribute('alt', weather.weather[0].description);

    let temp = document.createElement('p');
    temp.textContent = 'Temp: ' + weather.main.temp + ' °F';

    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + weather.main.humidity + '%';

    let wind = document.createElement('p');
    wind.textContent = 'Wind speed: ' + weather.wind.speed + 'mph';

    currentWeather.append(city, date, icon, temp, humidity, wind);  
    
    let cityName = weather.name;
    console.log("City name:", weather.name);
    let storedCityNames = JSON.parse(localStorage.getItem("cityNames")) || [];
    storedCityNames.push(cityName);
    localStorage.setItem("cityNames", JSON.stringify(storedCityNames));
}

// 5-day weather forecast fetch
function fetchFiveDayWeather(city) {
    let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}&units=imperial`;
    // ...
}
