<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      block: object;
      depth?: number;
    }>(),
    {
      depth: 0,
    }
  );
</script>

<template>
  <div style="min-height: 20px">
    Suche bitte einen Block aus
  </div>
</template>