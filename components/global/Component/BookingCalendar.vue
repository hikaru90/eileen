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
      state.currentStep = 0
    }
    if (targetStepId === 1) {
      if (stepIsValid(0)) {
        state.currentStep = 1
      }
    }
  };
</script>

<template>
  <div class="max-container">
    <div class="flex items-center justify-center gap-10">
      <button @click="validateAndSelectStep(step.id)"
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
      @submitForm="submitForm"
      :selectedTimeslot="state.selectedTimeslot"
    />
  </div>
</template>
