<script setup lang="ts">
  import defaults from '~/lib/defaults'
  const { pb } = usePocketbase();
  const emit = defineEmits(["formSubmitted"]);
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
    success: false,
    formSubmitted: false,
    pending: true,
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

  const addMinutesToTimeslot = (minutes, timeslot) => {
    const timeParts = timeslot.split(":");
    const hours = parseInt(timeParts[0]);
    const mins = parseInt(timeParts[1]);

    let date = new Date();
    date.setHours(hours);
    date.setMinutes(mins);
    date.setMinutes(date.getMinutes() + minutes);

    const updatedHours = date.getHours().toString().padStart(2, "0");
    const updatedMinutes = date.getMinutes().toString().padStart(2, "0");

    const res = updatedHours + ":" + updatedMinutes;
    return res;
  };
  const appointmentDuration = computed(() => {
    let value = [];
    for (const letter of state.form.service.value) {
      if (!isNaN(parseInt(letter))) value.push(letter);
    }
    return parseInt(value.join(""));
  });

  const submitForm = async () => {
    if (process.client) {
      if (formIsValid.value) {
        console.log("submitForm");
        state.success = false;
        state.formSubmitted = false;
        state.pending = true;
        try {
          const data = {
            bookingType: "appointment",
            start: `${props.selectedTimeslot.year}-${props.selectedTimeslot.month}-${props.selectedTimeslot.day} ${props.selectedTimeslot.timeslot}:00.123Z`,
            end: `${props.selectedTimeslot.year}-${props.selectedTimeslot.month}-${
              props.selectedTimeslot.day
            } ${addMinutesToTimeslot(
              appointmentDuration.value,
              props.selectedTimeslot.timeslot
            )}:00.123Z`,
            firstName: state.form.firstName.value,
            lastName: state.form.lastName.value,
            mail: state.form.mail.value,
            phone: state.form.phone.value,
            appointmentType: state.form.appointmentType.value,
            service: state.form.service.value,
            place: state.form.place.value,
            description: state.form.description.value,
            invoiceAddress: state.form.invoiceAddress.value,
          };
          console.log("data", data);
          const record = await pb.collection("bookings").create(data);

          state.pending = false;
          state.formSubmitted = true;
          state.success = true;
          emit("formSubmitted", { success: true });
        } catch (err) {
          console.log("err", err);
          state.pending = false;
          state.formSubmitted = true;
          state.success = false;
          emit("formSubmitted", { success: false });
        }
      } else {
        touchAllFields();
      }
    }
  };

  const fillInDummyData = () => {
    state.form.firstName.value = "test";
    state.form.lastName.value = "test";
    state.form.mail.value = "test@test.de";
    state.form.phone.value = "1234";
    state.form.appointmentType.value = "firstMeeting";
    state.form.service.value = "coupleTherapy50";
    state.form.place.value = "online";
    state.form.description.value = "test";
    state.form.invoiceAddress.value = "test";
    state.form.approvedCancellationConditions.value = true;
    state.form.approvedDataprotection.value = true;
  };

  onMounted(() => {
    fillInDummyData();
  });
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
          :options="defaults.find((e) => e.type === 'appointmentTypes')!.options"
          label="Terminart"
          :validation="state.form.appointmentType.validation"
          class="p-2 w-full lg:w-1/2"
        />
        <FormInputSelect
          v-model="state.form.service.value"
          :options="defaults.find((e) => e.type === 'services')!.options"
          label="Leistung"
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
          <button type="submit"
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
