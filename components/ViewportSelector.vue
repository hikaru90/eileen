<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const emit = defineEmits(["setViewport"]);
  // const { safelistDynamicClasses } = sidebarStore;
  const { viewports } = storeToRefs(sidebarStore);

  const state = reactive({
    selectedViewport: 0,
  })

  const selectViewport = (viewport: object) => {
    state.selectedViewport = viewport.id
    emit('setViewport', viewport.id)
  }

</script>

<template>
  <div class="flex items-center px-4 gap-2 mb-2 h-8 pb-4 border-b border-darkLilac">
    <div v-for="(viewport, index) in viewports" :key="'viewport'+index" :class="[ state.selectedViewport === viewport.id ? 'bg-white bg-opacity-20 opacity-100' : 'opacity-60' ]" class="flex rounded-sm hover:text-white">
      <button @click="selectViewport(viewport)">
        <nuxt-icon :name="viewport.icon" class="text-4xl animate-spin" />
      </button>
    </div>
  </div>
</template>
