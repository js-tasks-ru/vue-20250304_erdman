import { defineComponent, ref, computed, watch } from 'vue';
import { getMeetup } from './meetupsService.ts';

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedMeetupId = ref(1);
    const meetup = ref(null);

    const isPrevMeetupDisabled = computed(() => {
      return selectedMeetupId.value <= 1;
    });

    const isNextMeetupDisabled = computed(() => {
      return selectedMeetupId.value >= 5;
    });

    function nextMeetup() {
      selectedMeetupId.value += 1;
    }

    function prevMeetup() {
      selectedMeetupId.value -= 1;
    }

    watch(
      selectedMeetupId,
      async (newMeetupId) => {
        meetup.value = await getMeetup(newMeetupId);
      },
      { immediate: true },
    );

    return {
      selectedMeetupId,
      meetup,
      isPrevMeetupDisabled,
      isNextMeetupDisabled,
      nextMeetup,
      prevMeetup,
    };
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          :disabled="isPrevMeetupDisabled"
          @click="prevMeetup"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div v-for="meetupId in 5" class="radio-group__button">
            <input
              :id="\`meetup-id-\${meetupId}\`"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="meetupId"
              v-model="selectedMeetupId"
            />
            <label :for="\`meetup-id-\${meetupId}\`" class="radio-group__label">{{ meetupId }}</label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          :disabled="isNextMeetupDisabled"
          @click="nextMeetup"
        >
          Следующий
        </button>
      </div>

      <div v-if="meetup" class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
        </div>
      </div>

    </div>
  `,
});
