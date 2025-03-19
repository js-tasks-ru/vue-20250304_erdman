import { defineComponent } from 'vue';
import WeatherDetailsItem from './WeatherDetailsItem.js';

export default defineComponent({
  name: 'WeatherDetails',

  components: {
    WeatherDetailsItem,
  },

  props: {
    pressure: {
      type: Number,
      required: true,
    },

    humidity: {
      type: Number,
      required: true,
    },

    clouds: {
      type: Number,
      required: true,
    },

    windSpeed: {
      type: Number,
      required: true,
    },
  },

  template: `
    <div class="weather-details">
      <WeatherDetailsItem label="Давление, мм рт. ст.">{{ pressure.toFixed() }}</WeatherDetailsItem>
      <WeatherDetailsItem label="Влажность, %">{{ humidity }}</WeatherDetailsItem>
      <WeatherDetailsItem label="Облачность, %">{{ clouds }}</WeatherDetailsItem>
      <WeatherDetailsItem label="Ветер, м/с">{{ windSpeed }}</WeatherDetailsItem>
    </div>
  `,
});
