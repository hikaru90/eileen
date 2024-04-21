<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  //import EventBus from "~/plugins/mitt";
const { $event } = useNuxtApp()
  const sidebarStore = useSidebarStore();
  const { componentIsMaxContainer } = storeToRefs(sidebarStore);
  const { saveIsMaxContainer, setComponentIsMaxContainer } = sidebarStore

  const setMaxContainerAndSave = (event) => {
    setComponentIsMaxContainer(event.target.checked)
    saveIsMaxContainer()
    $event('refresh')
  }
</script>

<template>
  <div class="flex items-center gap-2 px-4 py-4 border-b border-offwhite border-opacity-20">
    <input @change="setMaxContainerAndSave" v-model="componentIsMaxContainer" type="checkbox" class="w-6 h-6 rounded-sm">
    <h2 class="opacity-40">
      Breite begrenzen
    </h2>
  </div>
</template>
