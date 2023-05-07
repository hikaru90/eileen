<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore

  const property = 'display'

  const isRealProperty = computed(() => {
    const entry = componentCss.value[viewport.value]?.find((entry) => entry.hasOwnProperty(property))
    if(entry)return true
    return false
  })

  const currentProperty = computed(() =>{
    const entry = componentCss.value[viewport.value]?.find((entry) => entry.hasOwnProperty(property))
    if(entry) return entry[property]
  })

  const state = reactive({
    options: [
      { id: 0, name: 'block', value: 'block'},
      { id: 1, name: 'flex', value: 'flex'},
      { id: 2, name: 'inline', value: 'inline'},
      { id: 3, name: 'inline-block', value: 'inline-block'},
      { id: 4, name: 'inline-flex', value: 'inline-flex'},
    ]
  })

</script>

<template>
  <div class="px-4 mb-2">
    <h2 class="text-xs mb-2">
      Display
    </h2>
    <div class="flex flex-wrap items-center gap-2" :class="[{ 'opacity-60': !isRealProperty }]">
      <button v-for="option in state.options" @click="setProperty(property, option.value)" :key="'columnCount'+option.id" :class="[ { 'bg-white bg-opacity-20': currentProperty === option.value } ]" class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 break-inside-avoid whitespace-nowrap border border-darkLilac border-opacity-20">
        {{ option.name }}
      </button>
      <button v-if="isRealProperty" @click="deleteProperty(property)" class="border border-red rounded-sm">
        <nuxt-icon name="icon-cross" class="text-red text-xl" />
      </button>
    </div>
    <!-- <InputColorPicker :color="currentColor" @deleteColor="deleteProperty(property)" @setColor="setProperty(property, $event)" :class="[ isRealColor ? 'opacity-100' : 'opacity-20' ]" /> -->
  </div>
</template>
