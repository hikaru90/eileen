<script setup lang="ts">
  const props = defineProps<{
    booking: object;
  }>();

  const getDateString = (dateString) => {
    const date = new Date(dateString.split('.')[0])
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
  }

</script>
<template>
  <div class="border border-darkGrey border-opacity-40 bg-grey rounded p-4 flex items-center justify-between">
    <div class="text-darkOffwhite">
      Block
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
  </div>
</template>