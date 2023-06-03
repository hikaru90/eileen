<script setup lang="ts">

  const props = defineProps<{
    error?: string;
  }>();

</script>

<template>
  <div class="bg-red bg-opacity-40 text-red text-sm mt-1 px-1 py-[2px] rounded">
    {{props.error}}
  </div>
</template>