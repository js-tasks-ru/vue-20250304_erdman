import { defineComponent, computed } from 'vue';
import WeatherAlert from './WeatherAlert.js';
import WeatherConditions from './WeatherConditions.js';
import WeatherDetails from './WeatherDetails.js';

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherConditions,
    WeatherDetails,
  },

  props: {
    weather: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const celsiusTemp = computed(() => convertKelvinToCelsius(props.weather.current.temp));
    const mmHgPressure = computed(() => convertHPaToMmHg(props.weather.current.pressure));
    const isNight = computed(() => {
      return (
        props.weather.current.dt < props.weather.current.sunrise ||
        props.weather.current.dt >= props.weather.current.sunset
      );
    });

    function convertKelvinToCelsius(kelvin) {
      return kelvin - 273.15;
    }

    function convertHPaToMmHg(hPa) {
      return hPa * 0.75;
    }

    return {
      celsiusTemp,
      mmHgPressure,
      isNight,
    };
  },

  template: `
    <li
      class="weather-card"
      :class="{ 'weather-card--night': isNight }"
    >
      <WeatherAlert
        v-if="weather.alert"
        :sender-name="weather.alert.sender_name"
        :description="weather.alert.description"
      />
      <div>
        <h2 class="weather-card__name">
          {{ weather.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ weather.current.dt }}
        </div>
      </div>
      <WeatherConditions
        :conditionId="weather.current.weather.id"
        :description="weather.current.weather.description"
        :temp="celsiusTemp"
      />
      <WeatherDetails
        :pressure="mmHgPressure"
        :humidity="weather.current.humidity"
        :clouds="weather.current.clouds"
        :wind-speed="weather.current.wind_speed"
      />
    </li>
  `,
});
