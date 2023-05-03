<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const emit = defineEmits(["setViewport"]);
  // const { safelistDynamicClasses } = sidebarStore;
  const { viewports } = storeToRefs(sidebarStore);
</script>

<template>
  <div class="flex items-center gap-2 mb-2">
    <div v-for="(viewport, index) in viewports" class="flex" :key="'viewport'+index">
      <button @click="emit('setViewport', viewport.value)">{{ viewport.name }}</button>
    </div>
  </div>
</template>
