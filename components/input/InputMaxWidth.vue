<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore

  const property = 'maxWidth'

  const isRealProperty = computed(() => {
    const entry = componentCss.value[viewport.value]?.find((entry) => entry.hasOwnProperty(property))
    if(entry)return true
    return false
  })

  const currentProperty = computed(() =>{
    const entry = componentCss.value[viewport.value]?.find((entry) => entry.hasOwnProperty(property))
    if(entry) return entry[property]
  })

  const sanitizeInput = (value) => {
    if(!value){
      deleteProperty(property)
    }else{
      setProperty(property, `${value}%`)
    }
  }

</script>

<template>
  <div class="">
    <h2 class="text-xs mb-2 opacity-40">
      Max Width
    </h2>
    <div class="flex items-center gap-1" :class="[{ 'opacity-60': !isRealProperty }]">
        <input @change="sanitizeInput($event.target.value)" :value="currentProperty ? parseInt(currentProperty) : null" type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20">
        <span class="text-sm">%</span>
    </div>
  </div>
</template>
