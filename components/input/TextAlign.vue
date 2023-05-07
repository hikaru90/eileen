<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore

  const property = 'textAlign'

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
      { id: 0, icon: 'icon-left-aligned', value: 'left'},
      { id: 1, icon: 'icon-center-aligned', value: 'center'},
      { id: 2, icon: 'icon-right-aligned', value: 'right'},
    ]
  })

</script>

<template>
  <div class="px-4 mb-2">
    <h2 class="text-xs mb-2">
      Text Columns
    </h2>
    <div class="flex items-center gap-2" :class="[{ 'opacity-60': !isRealProperty }]">
      <button v-for="option in state.options" @click="setProperty(property, option.value)" :key="'columnCount'+option.value" :class="[ { 'bg-white bg-opacity-20': currentProperty === option.value } ]" class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkLilac border-opacity-20">
        <nuxt-icon :name="option.icon" class="text-2xl" />
      </button>
      <button v-if="isRealProperty" @click="deleteProperty(property)" class="border border-red rounded-sm">
        <nuxt-icon name="icon-cross" class="text-red text-xl" />
      </button>
    </div>
  </div>
</template>
