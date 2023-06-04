<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { pb } = usePocketbase();

  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateTime;
  };

  const bookings = await pb.collection("bookings").getFullList(200 /* batch size */, {
    filter: `start >= "${getCurrentDateTime()}"`,
    sort: "-start",
  });
</script>

<template>
  <div class="max-container" v-if="authStore.token">
    <h2>Buchungen</h2>
    <div v-for="(booking, index) in bookings" class="flex flex-col gap-4">
      <BookingBlock v-if="booking.bookingType === 'block'" :booking="booking" />
      <BookingAppointment v-if="booking.bookingType === 'block'" :booking="booking" />
    </div>
  </div>
</template>
