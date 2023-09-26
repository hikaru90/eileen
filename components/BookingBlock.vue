<script setup lang="ts">
  import { vOnClickOutside } from "@vueuse/components";
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
  const cancelDeletion = () => {
    state.deletionConfirmed = false;
  };

  const state = reactive({
    deletionConfirmed: false,
  });

  const deleteBooking = async () => {
    await pb.collection("bookings").delete(props.booking.id);
    state.deletionConfirmed = false;
    emit("refreshBookings");
  };
</script>
<template>
  <div
    class="border border-grey bg-gradient-to-r from-grey to-offwhite rounded p-4 flex items-center justify-between"
  >
    <div class="text-darkOffwhite">Block</div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="border border-darkGrey px-2 rounded">
          {{ getDateString(booking.start) }}
        </span>
        -
        <span class="border border-darkGrey px-2 rounded">
          {{ getDateString(booking.end) }}
        </span>
      </div>
      <button
        v-show="!state.deletionConfirmed"
        @click="state.deletionConfirmed = true"
        class="border-2 border-lightRed hover:border-lightRed/50 text-lightRed hover:text-lightRed/70 rounded px-4 py-1 flex items-center"
      >
        <nuxt-icon name="icon-trash" class="text-2xl -ml-2" />
        Löschen
      </button>
      <button
        v-show="state.deletionConfirmed"
        @click="deleteBooking()"
        v-on-click-outside="cancelDeletion"
        class="border-2 border-lightRed hover:border-lightRed/50 text-lightRed hover:text-lightRed/70 rounded px-4 py-1 flex items-center"
      >
        <nuxt-icon name="icon-check" class="text-2xl -ml-2" />
        Sicher?
      </button>
    </div>
  </div>
</template>
