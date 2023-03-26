<script setup lang="ts">
  const props = defineProps<{
    content: object;
  }>();
  const emit = defineEmits(["refresh"]);
</script>

<template>
  <div class="bg-lightGrey m-2 p-2 rounded">
    <p class="text-sm">
      {{ props.content }}
    </p>
    <button @click="emit('refresh')" class="bg-white shadow px-2 py-1 rounded block mt-4">
      Refresh</button>
  </div>
</template>
