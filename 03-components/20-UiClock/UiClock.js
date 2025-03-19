import { defineComponent, ref, onUnmounted } from 'vue';

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(getTime());

    const timerId = setInterval(() => {
      time.value = getTime();
    }, 1000);

    function getTime() {
      return new Date().toLocaleString(navigator.language, { timeStyle: 'medium' });
    }

    onUnmounted(() => {
      clearInterval(timerId);
    });

    return {
      time,
    };
  },

  template: `<div class="clock">{{ time }}</div>`,
});
