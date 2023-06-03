<script setup lang="ts">
  const emit = defineEmits(["submitForm"]);
  const props = withDefaults(
    defineProps<{
      selectedTimeslot?: object;
    }>(),
    {}
  );

  const timeslotString = computed(() => {
    if (!props.selectedTimeslot) return;
    const dateString = new Date(
      `${props.selectedTimeslot.year}-${props.selectedTimeslot.month}-${props.selectedTimeslot.day}`
    ).toLocaleDateString("de-DE", {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return `${dateString} um ${props.selectedTimeslot.timeslot}`;
  });

  const state = reactive({
    form: {
      firstName: {
        value: undefined,
        validation: "required",
      },
      lastName: {
        value: undefined,
        validation: "required",
      },
      mail: {
        value: undefined,
        validation: "required|email",
      },
      phone: {
        value: undefined,
        validation: "",
      },
      appointmentType: {
        value: undefined,
        validation: "required",
      },
      service: {
        value: undefined,
        validation: "required",
      },
      place: {
        value: undefined,
        validation: "required",
      },
      description: {
        value: undefined,
        validation: "required",
      },
      invoiceAddress: {
        value: undefined,
        validation: "required",
      },
      approvedCancellationConditions: {
        value: false,
        validation: "required",
      },
      approvedDataprotection: {
        value: false,
        validation: "required",
      },
    },
  });

  const touchAllFields = () => {
    if (process.client) {
      const inputs = document.querySelectorAll(".fieldTarget");
      for (const input of inputs) {
        input.focus();
        input.blur();
      }
    }
  };

  const formIsValid = computed(() => {
    let res = [];

    for (const el of Object.values(state.form)) {
      if (el.validation) {
        if (el.validation === "required" && !el.value) {
          res.push("error");
        }
      }
    }

    if (res.length === 0) {
      return true;
    } else {
      return false;
    }
  });

  const submitForm = async () => {
    if (formIsValid.value) {
      console.log("submitForm");
      state.success = false;
      state.formSubmitted = false;
      state.pending = true;
      try {
        // await $fetch("/api/inquiries/create", {
        //   method: "POST",
        //   body: stringifiedForm.value,
        // });
        // state.pending = false;
        // state.formSubmitted = true;
        // state.success = true;
      } catch (err) {
        // state.pending = false;
        // state.formSubmitted = true;
        // state.success = false;
        // console.log("error submitting form", err);
      }
    } else {
      touchAllFields();
    }
  };
</script>
<template>
  <div class="max-container">
    <div class="flex flex-col items-center justify-center text-center">
      <div class="mb-4">Sie haben folgenden Termin ausgewählt:</div>
      <div class="font-bold text-xl border-2 rounded border-gold inline-block px-4 py-1 mb-10">
        {{ timeslotString }}
      </div>
      <div class="w-full lg:w-2/3 mb-10">
        Um Ihre Buchung abzuschließen, benötige ich noch ein paar Informationen von Ihnen. Füllen
        Sie bitte untenstehendes Formular aus.
      </div>

      <form @submit.prevent="submitForm" class="w-full lg:w-2/3 flex flex-wrap -m-2">
        <FormHeading class="mb-4">Ihre Angaben</FormHeading>

        <FormInput
          v-model="state.form.firstName.value"
          label="Vorname"
          placeholder="Vorname"
          :validation="state.form.firstName.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInput
          v-model="state.form.lastName.value"
          label="Nachname"
          placeholder="Nachname"
          :validation="state.form.lastName.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInput
          v-model="state.form.mail.value"
          label="E-Mail"
          placeholder="E-Mail"
          :validation="state.form.mail.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInput
          v-model="state.form.phone.value"
          label="Telefonnummer (optional)"
          placeholder="Telefonnummer"
          :validation="state.form.phone.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInputSelect
          v-model="state.form.appointmentType.value"
          :options="[
            { label: 'Erstgespräch', value: 'firstMeeting' },
            { label: 'Folgetermin', value: 'followup' },
          ]"
          label="Terminart"
          :validation="state.form.appointmentType.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInputSelect
          v-model="state.form.service.value"
          :options="[
            { label: 'Kennenlerntermin Paartherapie (50 Min.)', value: 'coupleTherapy50' },
            { label: 'Paartherapie (Paar) (80 Min.)', value: 'coupleTherapy80' },
            { label: 'Sexualtherapie (Einzelperson) (50 Min.)', value: 'sexTherapy50' },
            { label: 'Sexualtherapie (Paar) (80 Min.)', value: 'sexTherapy80' },
            {
              label: 'Beziehungscoaching (Einzelperson) (50 Min.)',
              value: 'relationshipCoaching50',
            },
          ]"
          label="Terminart"
          :validation="state.form.service.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInputSelect
          v-model="state.form.place.value"
          :options="[
            { label: 'In meiner Praxis', value: 'inPerson' },
            { label: 'Online', value: 'online' },
          ]"
          label="Wo soll der Termin stattfinden?"
          :validation="state.form.place.validation"
          class="p-2 w-full lg:w-1/2 mb-8"
        />

        <FormHeading class="mb-4">Terminvorbereitung</FormHeading>
        <FormInputTextarea
          v-model="state.form.description.value"
          label="Beschreibung Ihres Themas"
          placeholder="Bitte beschreiben Sie kurz Ihr Thema"
          :validation="state.form.description.validation"
          class="p-2 w-full"
        />
        <FormInputTextarea
          v-model="state.form.invoiceAddress.value"
          label="Rechnungsadresse"
          placeholder="Bitte tragen Sie die gewünschte Rechnungsadresse ein"
          :validation="state.form.invoiceAddress.validation"
          class="p-2 w-full mb-6"
        />
        <FormHeading class="mb-4">Rechtliches</FormHeading>

        <FormInputToggle
          v-model="state.form.approvedCancellationConditions.value"
          class="p-2 w-full"
          innerClass=""
          :validation="state.form.approvedCancellationConditions.validation"
        >
          Ich habe verstanden, dass eine kostenlose Stornierung meines Termins bis zu 48 Stunden vor
          Terminbeginn möglich ist und dass danach eine Ausfallgebühr von 50% fällig wird.
        </FormInputToggle>
        <FormInputToggle
          v-model="state.form.approvedDataprotection.value"
          class="p-2 w-full mb-6"
          innerClass=""
          :validation="state.form.approvedDataprotection.validation"
        >
          Ich habe die
          <a href="/datenschutz" target="_blank" class="underline">Datenschutzbestimmung</a> gelesen
          und bin damit einverstanden.
        </FormInputToggle>

        <div class="flex justify-center w-full">
          <button
            @click="submitForm"
            class="border-2 border-gold bg-gold rounded text-offwhite flex items-center px-3 py-2 mb-20"
          >
            <div class="text-black font-bold">Termin buchen</div>
            <div class="flex items-center justify-center bg-white rounded-full ml-2 w-4 h-4">
              <nuxt-icon name="icon-check" class="text-sm text-black" />
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
