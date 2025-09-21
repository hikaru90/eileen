<script setup lang="ts">
  import { vOnClickOutside } from "@vueuse/components";
  import defaults from "~/lib/defaults";
  const { pb } = usePocketbase();

  const props = defineProps<{
    booking: object;
  }>();

  const emit = defineEmits(["refreshBookings"]);

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
    const value = defaults
      .find((e) => e.type === "appointmentTypes")!
      .options?.find((option) => option.value === payload)?.label;
    return value;
  };
  const prettifyService = (payload) => {
    const value = defaults
      .find((e) => e.type === "services")!
      .options?.find((option) => option.value === payload)?.label;
    return value;
  };

  const deleteBooking = async () => {
    await pb.collection("bookings").update(props.booking.id, { deleted: true, confirmed: false });
    state.deletionConfirmed = false;
    emit("refreshBookings");
  };
  const reactivateBooking = async () => {
    await pb.collection("bookings").update(props.booking.id, { deleted: false });
    emit("refreshBookings");
  };

  const approveBooking = async () => {
    const start = props.booking.start;
    const end = props.booking.end;

    const year = new Date(props.booking.start).getFullYear();
    const paddedMonth = String(new Date(props.booking.start).getMonth() + 1).padStart(2, "0");
    const paddedDay = String(new Date(props.booking.start).getDate()).padStart(2, "0");
    const paddedHour = props.booking.start.split(" ")[1].split(":")[0];
    const paddedMinutes = props.booking.start.split(":")[1].split(":")[0];

    const formData = {
      firstName: props.booking.firstName,
      lastName: props.booking.lastName,
      mail: props.booking.mail,
      phone: props.booking.phone,
      appointmentType: props.booking.appointmentType,
      service: props.booking.service,
      place: props.booking.place,
      description: props.booking.description,
      invoiceAddress: props.booking.invoiceAddress,
      timeslot: {
        year: year,
        month: paddedMonth,
        day: paddedDay,
        timeslot: `${paddedHour}:${paddedMinutes}`,
      },
    };

    await pb.collection("bookings").update(props.booking.id, { confirmed: true });
    const sendMailRes = await fetch("/api/mail/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template: "bookingConfirmationUser",
        recipient: props.booking.mail,
        formData: formData,
      }),
    });

    emit("refreshBookings");
  };

  const cancelDeletion = () => {
    state.deletionConfirmed = false;
  };

  const state = reactive({
    deletionConfirmed: false,
    isOpen: false,
    formEntries: [
      { name: "Vorname", value: props.booking.firstName },
      { name: "Nachname", value: props.booking.lastName },
      { name: "E-Mail", value: props.booking.mail },
      { name: "Telefonnummer", value: props.booking.phone },
      { name: "Terminart", value: prettifyAppointmentType(props.booking.appointmentType) },
      { name: "Leistung", value: prettifyService(props.booking.service) },
      { name: "Ort", value: props.booking.place },
      { name: "Thema", value: props.booking.description },
      { name: "Rechnungsadresse", value: props.booking.invoiceAddress },
    ],
  });
</script>
<template>
  <div
    :class="[
      props.booking.deleted ? 'bg-red opacity-20' : '',
      props.booking.confirmed ? 'bg-green' : '',
      { 'bg-offwhite': !props.booking.deleted && !props.booking.confirmed },
    ]"
    class="select-none border border-darkGrey border-opacity-40 rounded"
  >
    <button
      aria-label="Buchung öffnen"
      @click="state.isOpen = !state.isOpen"
      class="w-full flex items-center justify-between p-4"
    >
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
      <div>
        <div
          v-for="(entry, index) in state.formEntries"
          class="flex items-center justify-between border-b border-grey border-opacity-20 last:border-b-0 py-1 px-2"
        >
          <div class="">
            {{ entry.name }}
          </div>
          <div class="">
            {{ entry.value }}
          </div>
        </div>
      </div>
      <div
        v-if="props.booking.deleted"
        class="bg-white rounded p-2 shadow-lg mt-4 flex items-center justify-center"
      >
        <button
          @click="reactivateBooking"
          class="border-2 border-sand/70 hover:border-sand text-coffee/70 hover:text-coffee rounded px-4 py-1 flex items-center"
        >
          Reaktivieren
        </button>
      </div>
      <div
        v-else-if="props.booking.confirmed"
        class="bg-white rounded p-2 shadow-lg mt-4 flex items-center justify-center"
      >
        Bestätigt
      </div>
      <div v-else class="bg-white rounded p-2 shadow-lg mt-4 flex items-center justify-between">
        <button
          v-show="!state.deletionConfirmed"
          @click="state.deletionConfirmed = true"
          class="border-2 border-red/50 hover:border-red text-red/70 hover:text-red rounded px-4 py-1 flex items-center"
        >
          <nuxt-icon name="icon-trash" class="text-2xl -ml-2" />
          Löschen
        </button>
        <button
          v-show="state.deletionConfirmed"
          @click="deleteBooking()"
          v-on-click-outside="cancelDeletion"
          class="border-2 border-red/50 hover:border-red text-red/70 hover:text-red rounded px-4 py-1 flex items-center"
        >
          <nuxt-icon name="icon-check" class="text-2xl -ml-2" />
          Sicher?
        </button>
        <button
          @click="approveBooking"
          class="border-2 border-green/70 hover:border-green text-green/70 hover:text-green rounded px-4 py-1 flex items-center"
        >
          <nuxt-icon name="icon-check" class="text-2xl -ml-2" />
          Bestätigen
        </button>
      </div>
    </div>
  </div>
</template>
