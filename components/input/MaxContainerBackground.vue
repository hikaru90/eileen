<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  import EventBus from "~/plugins/mitt";
  const sidebarStore = useSidebarStore();
  const { limitBackgroundToMaxContainer } = storeToRefs(sidebarStore);
  const { saveLimitToMaxContainer, setComponentBackgroundToMaxContainer } = sidebarStore

  const setLimitBackgroundToMaxContainerAndSave = (event) => {
    setComponentBackgroundToMaxContainer(event.target.checked)
    saveLimitToMaxContainer()
    EventBus.emit('refresh')
  }
</script>

<template>
  <div class="flex items-center gap-2 px-4 py-4 border-b border-offwhite border-opacity-20">
    <input @change="setLimitBackgroundToMaxContainerAndSave" v-model="limitBackgroundToMaxContainer" type="checkbox" class="w-6 h-6 rounded-sm">
    <h2 class="opacity-40">
      Hintergrund auf Container begrenzen
    </h2>
  </div>
</template>
