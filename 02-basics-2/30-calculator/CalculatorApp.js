import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);

    const operations = {
      sum: {
        symbol: '➕',
        func: (a, b) => a + b,
      },

      subtract: {
        symbol: '➖',
        func: (a, b) => a - b,
      },

      multiply: {
        symbol: '✖',
        func: (a, b) => a * b,
      },

      divide: {
        symbol: '➗',
        func: (a, b) => a / b,
      },
    };

    const operator = ref(Object.keys(operations)[0]);

    const result = computed(() => {
      return operations[operator.value]?.func(firstOperand.value, secondOperand.value);
    });

    return {
      firstOperand,
      secondOperand,
      operator,
      operations,
      result,
    };
  },

  template: `
    <div class="calculator">
      <input
        type="number"
        aria-label="First operand"
        v-model="firstOperand"
      />

      <div class="calculator__operators">
        <label v-for="(operation, operationOperator) in operations">
          <input
            type="radio"
            name="operator"
            :value="operationOperator"
            v-model="operator"
          />{{ operation.symbol }}
        </label>
      </div>

      <input
        type="number"
        aria-label="Second operand"
        v-model="secondOperand"
      />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
});
