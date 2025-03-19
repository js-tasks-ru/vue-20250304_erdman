import { defineComponent } from 'vue';
import WeatherCard from './WeatherCard';

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherCard,
  },

  props: {
    weatherData: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="weather-list unstyled-list">
      <WeatherCard
        v-for="weather in weatherData"
        :key="weather.geographic_name"
        :weather
      />
    </ul>
  `,
});
