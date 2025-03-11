import { defineComponent, createApp } from 'vue';

const App = defineComponent({
  name: 'App',

  setup() {
    function formatAsLocalDate(timestamp) {
      return new Date(timestamp).toLocaleString(navigator.language, { dateStyle: 'long' });
    }

    return {
      formatAsLocalDate,
    };
  },

  template: `Сегодня {{ formatAsLocalDate(new Date()) }}`,
});

const app = createApp(App);
app.mount('#app');
