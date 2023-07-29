<script setup lang="ts">
  import { vOnClickOutside } from "@vueuse/components";
  const { pb } = usePocketbase();
  const emit = defineEmits(["createdBlock"]);

  const getDateString = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString.split(".")[0]);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  const cancelDeletion = () => {
    state.deletionConfirmed = false;
  };

  const state = reactive({
    booking: {
      start: undefined,
      end: undefined,
    },
    deletionConfirmed: false,
  });

  const formatDate = (dateString:string) => {
    //2023-08-02T01:00
    const datePart = dateString.split('T')[0]
    const timePart = dateString.split('T')[1]
    return `${datePart} ${timePart}:00.123Z`
  }

  const createBlock = async () => {
    const data = {
      bookingType: "block",
      start: formatDate(state.booking.start),
      end: formatDate(state.booking.end),
    };

    await pb.collection("bookings").create(data);
    state.booking.start = undefined;
    state.booking.end = undefined;
    emit("createdBlock");
  };
</script>
<template>
  <div
    class="border border-dashed border-darkGrey border-opacity-40 rounded pl-4 p-2 flex items-center justify-between"
  >
    <div class="">Neuen Block erstellen</div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <!-- <span class="border border-darkGrey px-2 rounded">
          {{ getDateString(state.booking.start) }}
        </span> -->
        <input
          type="datetime-local"
          v-model="state.booking.start"
          class="border border-grey border-opacity-20 rounded px-4 py-1"
        />
        -
        <!-- <span class="border border-darkGrey px-2 rounded">
          {{ getDateString(state.booking.end) }}
        </span> -->
        <input
          type="datetime-local"
          v-model="state.booking.end"
          class="border border-grey border-opacity-20 rounded px-4 py-1"
        />
      </div>
      <button
        @click="createBlock"
        class="border-2 border-green hover:border-green/50 text-green hover:text-green/70 rounded px-4 py-1 flex items-center"
      >
        <nuxt-icon name="icon-trash" class="text-2xl -ml-2" />
        Erstellen
      </button>
    </div>
  </div>
</template>
