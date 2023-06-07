<script setup lang="ts">
import defaults from '~/lib/defaults'
import { BookingAppointment } from '~~/.nuxt/components';

  const props = defineProps<{
    booking: object;
  }>();

  const getDateString = (dateString) => {
    const date = new Date(dateString.split(".")[0]);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const prettifyAppointmentType = (payload) => {
    const value = defaults.find((e) => e.type === 'appointmentTypes')!.options?.find((option) => option.value === payload).label
    return value
  }
  const prettifyService = (payload) => {
    const value = defaults.find((e) => e.type === 'services')!.options?.find((option) => option.value === payload).label
    return value
  }

  const state = reactive({
    isOpen: false,
    formEntries: [
      {name: 'Vorname', value: props.booking.firstName},
      {name: 'Nachname', value: props.booking.lastName},
      {name: 'E-Mail', value: props.booking.mail},
      {name: 'Telefonnummer', value: props.booking.phone},
      {name: 'Terminart', value: prettifyAppointmentType(props.booking.appointmentType)},
      {name: 'Leistung', value: prettifyService(props.booking.service)},
      {name: 'Ort', value: props.booking.place},
      {name: 'Thema', value: props.booking.description},
      {name: 'Rechnungsadresse', value: props.booking.invoiceAddress},
    ]
  });
</script>
<template>
  <div
    class="select-none border border-darkGrey border-opacity-40 bg-offwhite rounded"
  >
    <button @click="state.isOpen = !state.isOpen" class="w-full flex items-center justify-between p-4">
      <div class="flex items-center">
        <div>Buchung</div>
        <nuxt-icon v-if="!state.isOpen" name="icon-triangle_down" class="text-xl" />
        <nuxt-icon v-else name="icon-triangle_up" class="text-xl" />
      </div>
      <div class="flex items-center gap-2">
        <span class="border border-darkGrey px-2 rounded">
          {{ getDateString(booking.start) }}
        </span>
        -
        <span class="border border-darkGrey px-2 rounded">
          {{ getDateString(booking.end) }}
        </span>
      </div>
    </button>
    <div v-if="state.isOpen" class="p-4 border-t border-grey border-opacity-20 flex flex-col">
      <div v-for="(entry, index) in state.formEntries" class="flex items-center justify-between border-b border-grey border-opacity-20 last:border-b-0 py-1 px-2">
        <div class="">
          {{ entry.name }}
        </div>
        <div class="font-bold">
          {{ entry.value }}
        </div>
      </div>
    </div>
  </div>
</template>
