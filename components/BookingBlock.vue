<script setup lang="ts">
  const props = defineProps<{
    booking: object;
  }>();
</script>
<template>
  <div class="bg-grey">
    {{ props.booking }}
  </div>
</template>