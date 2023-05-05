<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports } = storeToRefs(sidebarStore);
  const { saveBlock } = sidebarStore

  const props = withDefaults(
    defineProps<{
      viewport?: number;
    }>(),
    {
      viewport: 0,
    }
  );

  const realColor = computed(() => {
    const color = componentCss.value[props.viewport]?.find((entry) => entry.hasOwnProperty('color'))?.color;
    if(color)return true
    return false
  })

  const currentColor = computed(() =>{
    const color = componentCss.value[props.viewport]?.find((entry) => entry.hasOwnProperty('color'))?.color;
    return color
  })

  const setProperty = (property, value) => {
    const entry = componentCss.value[props.viewport]?.find((entry) => entry.hasOwnProperty(property));
    if (entry) {
      entry[property] = value;
    } else {
      let newValue = {};
      newValue[property] = value;
      componentCss.value[props.viewport]?.push(newValue);
    }
    saveBlock()
  };

  const setColor = (payload) =>{
    setProperty('color', payload)
  }
</script>

<template>
  <div class="px-4">

    <h2 class="text-xs mb-2">
      Font Color
    </h2>
    <InputColorPicker :color="currentColor" @setColor="setColor" :class="[ realColor ? 'opacity-100' : 'opacity-20' ]" />
  </div>
</template>
