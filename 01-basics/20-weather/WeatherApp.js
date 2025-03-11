import { defineComponent } from 'vue';
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts';

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData();

    function convertKelvinToCelsius(degrees) {
      return degrees - 273.15;
    }

    function convertHPaToMmHg(pressure) {
      return pressure * 0.75;
    }

    function convertTimeToMinutes(time) {
      const [hours, minutes] = time.split(':');

      return Number(hours) * 60 + Number(minutes);
    }

    function isNight(dt, sunrise, sunset) {
      const dtMinutes = convertTimeToMinutes(dt);
      const sunriseMinutes = convertTimeToMinutes(sunrise);
      const sunsetMinutes = convertTimeToMinutes(sunset);

      return dtMinutes < sunriseMinutes || dtMinutes >= sunsetMinutes;
    }

    return {
      weatherData,
      WeatherConditionIcons,
      convertKelvinToCelsius,
      convertHPaToMmHg,
      isNight,
    };
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li
          v-for="weather in weatherData"
          class="weather-card"
          :class="{ 'weather-card--night': isNight(weather.current.dt, weather.current.sunrise, weather.current.sunset) }"
        >
          <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ WeatherConditionIcons[weather.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ convertKelvinToCelsius(weather.current.temp).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ convertHPaToMmHg(weather.current.pressure).toFixed() }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
});
