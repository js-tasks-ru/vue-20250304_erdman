import { defineComponent, computed } from 'vue';
import { UiButton } from '@shgk/vue-course-ui';
import './UiCounter.css';

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    const isDecrementDisabled = computed(() => props.count <= props.min);
    const isIncrementDisabled = computed(() => props.count >= props.max);

    function decrement() {
      emit('update:count', props.count - 1);
    }

    function increment() {
      emit('update:count', props.count + 1);
    }

    return {
      isDecrementDisabled,
      isIncrementDisabled,
      decrement,
      increment,
    };
  },

  template: `
    <div class="counter">
      <UiButton
        aria-label="Decrement"
        :disabled="isDecrementDisabled"
        @click="decrement"
      >
        ➖
      </UiButton>

      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton
        aria-label="Increment"
        :disabled="isIncrementDisabled"
        @click="increment"
      >
        ➕
      </UiButton>
    </div>
  `,
});
