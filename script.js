const apiKey = '8c7bd4763b3c7e722f5fe146009019e9';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const error = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');

async function getWeather(city) {
  error.textContent = 'Загрузка...';
  error.className = 'info';

  if (city.trim() === '') {
    error.textContent = 'Введите название города';
    error.className = 'error';
    weatherInfo.classList.remove('show');
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    error.textContent = '';
    error.className = 'error';

    if (data.cod === '404') {
      error.textContent = 'Город не найден';
      weatherInfo.classList.remove('show');
      return;
    }

    weatherInfo.classList.add('show');

    document.getElementById('cityName').innerHTML = data.name;
    document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}&#8451;`;
    document.getElementById('wind').innerHTML = `${Math.round(data.wind.speed)} м/с`;
    document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;

    if (data.weather[0].main === 'Clear') {
      weatherIcon.src = `./images/Clear.svg`;
    } else if (data.weather[0].main === 'Clouds') {
      weatherIcon.src = `./images/Clouds.svg`;
    } else if (data.weather[0].main === 'Rain') {
      weatherIcon.src = `./images/Rain.svg`;
    } else if (data.weather[0].main === 'Drizzle') {
      weatherIcon.src = `./images/Drizzle.svg`;
    } else if (data.weather[0].main === 'Fog') {
      weatherIcon.src = `./images/Fog.svg`;
    }

    cityInput.value = '';
  } catch (err) {
    error.textContent = 'Ошибка при загрузке данных. Попробуйте позже.';
    error.className = 'error';
    weatherInfo.classList.remove('show');
    console.error(err);
  }
}

searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value);
});

cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    getWeather(cityInput.value);
  }
});
