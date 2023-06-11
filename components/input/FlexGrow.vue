<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore

  const property = 'flexGrow'

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
      { value: 1, name: 'Grow'},
      { value: 0, name: 'Don\'t Grow'},
    ]
  })

</script>

<template>
  <div class="">
    <h2 class="text-xs mb-2 opacity-40">
      Flex Grow
    </h2>
    <div class="flex items-center gap-2" :class="[{ 'opacity-60': !isRealProperty }]">
      <button v-for="option in state.options" @click="setProperty(property, option.value)" :key="'columnCount'+option.value" :class="[ { 'bg-white bg-opacity-20': currentProperty === option.value } ]" class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20">
        {{ option.name }}
      </button>
      <button v-if="isRealProperty" @click="deleteProperty(property)" class="border border-red rounded-sm">
        <nuxt-icon name="icon-cross" class="text-red text-xl" />
      </button>
    </div>
  </div>
</template>
