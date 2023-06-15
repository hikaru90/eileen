<script setup lang="ts">
  const props = defineProps<{
    component: object;
  }>();

  const state = reactive({
    currentStep: 0,
    steps: [
      { id: 0, name: "Terminfindung" },
      { id: 1, name: "Buchung" },
    ],
    selectedTimeslot: undefined,
    formValues: undefined,
    formSubmitted: false,
    success: undefined,
  });

  const selectTimeslot = (timeslot: object) => {
    state.selectedTimeslot = timeslot;
    state.currentStep = 1;
  };

  const stepIsValid = (stepId) => {
    if (stepId === 0) {
      if (state.selectedTimeslot != undefined) return true;
      return false;
    }
    if (stepId === 1) {
      if (state.formValues != undefined) return true;
      return false;
    }
  };

  const validateAndSelectStep = (targetStepId) => {
    if (targetStepId === 0) {
      state.currentStep = 0;
    }
    if (targetStepId === 1) {
      if (stepIsValid(0)) {
        state.currentStep = 1;
      }
    }
  };

  const handleFormSubmit = (payload) => {
    console.log('payload',payload);
    if (payload.success === false) {
      console.log('state.success = false;',state.success = false);
      state.success = false;
    } else {
      console.log('state.success = true;',state.success = true);
      state.success = true;
    }
    state.formSubmitted = true;
  };
</script>

<template>
  <div class="max-container">
    <template v-if="state.formSubmitted">
      <div v-if="state.success" class="flex justify-center my-20">
        <div
          class="w-full lg:w-2/3 font-bold border-2 rounded border-green bg-green bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"
        >
          Vielen Dank für Ihre Buchung. <br>Sie haben soeben eine Zusammenfassung Ihrer Daten per E-Mail erhalten.
        </div>
      </div>
      <div v-else class="flex justify-center my-20">
        <div
          class="w-full lg:w-2/3 font-bold border-2 rounded border-red bg-red bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"
        >
          Bei der Übermittlung Ihrer Daten ist leider ein Fehler aufgetreten. <br>Versuchen Sie es bitte
          erneut. Sollte das Problem weiterhin bestehen, schreiben Sie mir bitte eine Mail an
          <a href="mailto:kontakt@dimplegoertz.de" class="underline">kontakt@dimplegoertz.de</a>.
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-center gap-10">
        <button aria-label="Schritt auswählen"
          @click="validateAndSelectStep(step.id)"
          v-for="(step, index) in state.steps"
          :key="'step' + index"
          class="flex flex-col gap-4 items-center justify-center w-1/3 py-10"
        >
          <div
            :class="[state.currentStep === step.id ? 'bg-gold' : 'bg-darkOffwhite']"
            class="w-full h-[5px] rounded relative"
          >
            <div
              :class="[
                state.currentStep === step.id
                  ? 'bg-gradient-to-b from-gold via-lightGold to-darkGold'
                  : 'bg-darkOffwhite',
              ]"
              class="w-5 h-5 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <nuxt-icon v-if="stepIsValid(step.id)" name="icon-check" class="text-xl" />
            </div>
          </div>
          <div
            :class="[state.currentStep === step.id ? 'text-black font-bold' : 'text-lightGrey']"
            class=""
          >
            {{ step.name }}
          </div>
        </button>
      </div>
      <BookingCalendarDate
        v-show="state.currentStep === 0"
        @selectTimeslot="selectTimeslot"
        :component="props.component"
        :selectedTimeslot="state.selectedTimeslot"
      />
      <BookingCalendarForm
        v-show="state.currentStep === 1"
        @formSubmitted="handleFormSubmit"
        :selectedTimeslot="state.selectedTimeslot"
      />
    </template>
  </div>
</template>
