import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WeatherDetailsItem',

  props: {
    label: {
      type: String,
      required: true,
    },

    value: {
      type: [String, Number],
    },
  },

  template: `
		<div class="weather-details__item">
			<div class="weather-details__item-label">{{ label }}</div>
			<div class="weather-details__item-value">
        <slot>{{ value }}</slot>
      </div>
		</div>
  `,
});
