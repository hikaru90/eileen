<script setup lang="ts">
  const props = defineProps<{
    booking: object;
  }>();
</script>
<template>
  <div class="bg-offwhite rounded">
    {{ props.booking }}
  </div>
</template>