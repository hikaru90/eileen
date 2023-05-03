<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss } = storeToRefs(sidebarStore);
  const { saveBlock } = sidebarStore

  const props = withDefaults(
    defineProps<{
      viewport?: null | number;
    }>(),
    {
      viewport: null,
    }
  );

  const setProperty = (property, value) => {
    const entry = componentCss.value.find((entry) => entry.hasOwnProperty(property));
    if (entry) {
      entry[property] = value;
    } else {
      let newValue = {};
      newValue[property] = value;
      componentCss.value.push(newValue);
    }
    saveBlock()
  };

  const state = reactive({
    colors: [
      'blue', 'yellow'
    ]
  })
</script>

<template>
  <div>

    <h2>
      Background Color
    </h2>
    <div  class="flex items-center gap-1">
      <button v-for="(color, index) in state.colors" @click="setProperty('backgroundColor', color)" :style="[{ backgroundColor: color}]" class="w-5 h-5 rounded-full" :key="'color'+index"></button>
    </div>
  </div>
  </template>
