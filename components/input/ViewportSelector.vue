<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const emit = defineEmits(["setViewport"]);
  const { setViewport } = sidebarStore;
  const { viewports, viewport } = storeToRefs(sidebarStore);

</script>

<template>
  <div class="flex items-center px-4 gap-2 mb-2 py-4 border-b border-darkLilac border-opacity-20">
    <div v-for="(viewportEntry, index) in viewports" :key="'viewport'+index" :class="[ viewport === viewportEntry.id ? 'bg-white bg-opacity-20 opacity-100' : 'opacity-60' ]" class="flex rounded-sm hover:text-white">
      <button @click="setViewport(viewportEntry.id)">
        <nuxt-icon :name="viewportEntry.icon" class="text-4xl animate-spin" />
      </button>
    </div>
  </div>
</template>
