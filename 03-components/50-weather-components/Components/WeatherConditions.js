import { defineComponent, computed } from 'vue';
import { WeatherConditionIcons } from '../weather.service.ts';

export default defineComponent({
  name: 'WeatherConditions',

  props: {
    conditionId: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    temp: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const weatherConditionIcon = computed(() => WeatherConditionIcons[props.conditionId]);

    return {
      weatherConditionIcon,
    };
  },

  template: `
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="description">{{ weatherConditionIcon }}</div>
      <div class="weather-conditions__temp">
        {{ temp.toFixed(1) }} °C
      </div>
    </div>
  `,
});
