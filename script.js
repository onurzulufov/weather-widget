const apiKey = '8c7bd4763b3c7e722f5fe146009019e9'

const cityInput = document.querySelector('.widget__input')
const searchBtn = document.querySelector('.widget__search-btn')
const weatherIcon = document.querySelector('.widget__icon')
const cityName = document.querySelector('.widget__city-name')
const error = document.querySelector('.widget__error')
const weatherInfo = document.querySelector('.widget__info')
const temperature = document.querySelector('.widget__temperature')
const wind = document.querySelector('.widget__wind')
const humidity = document.querySelector('.widget__humidity')

async function getWeather(city) {
  error.textContent = 'Загрузка...'
  error.className = 'widget__error info'

  if (city.trim() === '') {
    error.textContent = 'Введите название города'
    error.className = 'widget__error error'
    weatherInfo.classList.remove('show')
    return
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`,
    )
    const data = await response.json()

    error.textContent = ''
    error.className = 'widget__error error'

    if (data.cod === '404') {
      error.textContent = 'Город не найден'
      weatherInfo.classList.remove('show')
      return
    }

    weatherInfo.classList.add('show')

    cityName.innerHTML = data.name
    temperature.innerHTML = `${Math.round(data.main.temp)}&#8451;`
    wind.innerHTML = `${Math.round(data.wind.speed)} м/с`
    humidity.innerHTML = `${data.main.humidity}%`

    if (data.weather[0].main === 'Clear') {
      weatherIcon.src = `./images/Clear.svg`
    } else if (data.weather[0].main === 'Clouds') {
      weatherIcon.src = `./images/Clouds.svg`
    } else if (data.weather[0].main === 'Rain') {
      weatherIcon.src = `./images/Rain.svg`
    } else if (data.weather[0].main === 'Drizzle') {
      weatherIcon.src = `./images/Drizzle.svg`
    } else if (data.weather[0].main === 'Fog') {
      weatherIcon.src = `./images/Fog.svg`
    } else {
      weatherIcon.src = `./images/Clear.svg`
    }

    cityInput.value = ''
  } catch (err) {
    error.textContent = 'Ошибка при загрузке данных. Попробуйте позже.'
    error.className = 'widget__error error'
    weatherInfo.classList.remove('show')
    console.error(err)
  }
}

searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value)
})

cityInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    getWeather(cityInput.value)
  }
})
