<script setup lang="ts">
  const props = defineProps<{
    label?: string | null;
  }>();
</script>

<template>
  <div class="text-xs font-bold ml-2" :class="[{'mb-1': props.label}]">
      {{ props.label }}
    </div>
</template>