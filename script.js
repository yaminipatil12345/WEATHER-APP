const inputBox = document.querySelector('.input-box');
const searchbtn = document.getElementById('searchbtn');
const weather_img = document.querySelector('.weather-img'); // Corrected selector
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

async function checkWeather(city) {
    const api_key = "6978149cd68cc8d65c4b5de078c6abf0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === 200) {
            temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${Math.round(weather_data.wind.speed)} Km/H`;

            switch (weather_data.weather[0].main) {
                case 'Clouds':
                    weather_img.src = "cloud.png";
                    break;
                case 'Clear':
                    weather_img.src = "clear.png";
                    break;
                case 'Rain':
                    weather_img.src = "rain.png";
                    break;
                case 'Mist':
                    weather_img.src = "mist.png";
                    break;
                case 'Snow':
                    weather_img.src = "snow.png";
                    break;
                default:
                    weather_img.src = "404.png"; // Set a default image if weather type doesn't match
                    break;
            }
        } else {
            alert('City not found! Please enter a valid city name.');
        }

    } catch (error) {
        console.log('Error fetching weather data:', error);
        alert('Unable to fetch weather data. Please try again later.');
    }
}

searchbtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a location');
    }
});
