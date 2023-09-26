<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { pb } = usePocketbase();

  const getDateFilter = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const dateTime = `${year}-${month}-${day}`;
    return dateTime;
  };
  const getTimeFilter = (date) => {
    // const noUtcDate = new Date(new Date(date).getTime() + new Date(date).getTimezoneOffset() * 60000);
    const noUtcDate = date

    const hours = String(noUtcDate.getHours()).padStart(2, "0");
    const minutes = String(noUtcDate.getMinutes()).padStart(2, "0");
    const seconds = String(noUtcDate.getSeconds()).padStart(2, "0");

    const dateTime = `${hours}:${minutes}:${seconds}`;
    return dateTime;
  };

  const changeDate = async (event, targetString) => {
    if(targetString === 'start') {
      state.start = getMoringOfDate(new Date(event.target.value))
      state.end = getEveningOfDate(new Date(event.target.value))
    }
    if(targetString === 'end') state.end = getEveningOfDate(new Date(event.target.value));
    await refreshNuxtData("bookings");
  };

  const getMoringOfDate = (date) => new Date(new Date(date).setHours(0, 0, 0));
  const getEveningOfDate = (date) => new Date(new Date(date).setHours(23, 59, 59));

  const state = reactive({
    start: getMoringOfDate(new Date()),
    end: getEveningOfDate(new Date(getMoringOfDate(new Date()).setDate(getEveningOfDate(new Date()).getDate() + 7))),
    type: undefined,
  });

  const typeFilterString = computed(() => {
    if (!state.type) {
      return "";
    }
    return ` && bookingType = "${state.type}"`;
  });
  const filterString = computed(() => {
    const value = `(end >= "${getDateFilter(state.start)} ${getTimeFilter(
      state.start
    )}" && start <= "${getDateFilter(state.end)} ${getTimeFilter(state.end)}")${typeFilterString.value}`;
    return value
  });

  const changeType = async (type) => {
    state.type = type
    console.log(filterString.value);
    await refreshNuxtData("bookings");
  }

  const { pending, data: bookings  } = await useAsyncData("bookings", () =>
    pb.collection("bookings").getFullList(200 /* batch size */, {
      filter: filterString.value,
      sort: "-start",
    })
  );

  definePageMeta({
    layout: "blank",
  });

</script>

<template>
  <div class="max-container" v-if="authStore.token">
    <div
      class="flex items-center justify-between mt-10 mb-4 border border-grey border-opacity-20 shadow-lg rounded p-2"
    >
      <div class="flex items-center gap-2">
        <button @click="changeType(undefined)" class="border border-grey border-opacity-20 rounded px-4 py-1">Alle</button>
        <button @click="changeType('block')" class="border border-grey border-opacity-20 rounded px-4 py-1">Block</button>
        <button @click="changeType('appointment')" class="border border-grey border-opacity-20 rounded px-4 py-1">Buchung</button>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="date"
          :value="getDateFilter(state.start)"
          @change="changeDate($event, 'start')"
          class="border border-grey border-opacity-20 rounded px-4 py-1"
        />
        <input
          type="date"
          :value="getDateFilter(state.end)"
          @change="changeDate($event, 'end')"
          class="border border-grey border-opacity-20 rounded px-4 py-1"
        />
      </div>
    </div>
    
    
    <div class="mb-10">
      <BookingBlockCreator @createdBlock="refreshNuxtData('bookings')" />
    </div>


    <div v-if="pending" class="flex justify-center">
      <nuxt-icon name="icon-pending" class="text-4xl inline-block animate-spin" />
    </div>
    <div v-else class="flex flex-col gap-4 mb-20">
      <div v-for="(booking, index) in bookings" class="">
        <BookingBlock @refreshBookings="refreshNuxtData('bookings')" v-if="booking.bookingType === 'block'" :booking="booking" />
        <BookingAppointment @refreshBookings="refreshNuxtData('bookings')" v-if="booking.bookingType === 'appointment'" :booking="booking" />
      </div>
    </div>
  </div>
</template>
