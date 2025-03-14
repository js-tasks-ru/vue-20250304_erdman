import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0);

    const isDecrementDisabled = computed(() => {
      return count.value <= 0;
    });

    const isIncrementDisabled = computed(() => {
      return count.value >= 5;
    });

    return {
      count,
      isDecrementDisabled,
      isIncrementDisabled,
    };
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="isDecrementDisabled"
        @click="count -= 1"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="isIncrementDisabled"
        @click="count += 1"
      >➕</button>
    </div>
  `,
});
