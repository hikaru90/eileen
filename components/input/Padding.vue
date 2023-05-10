<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore

  const property = 'padding'

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
    paddings: [
      { name: 'paddingLeft', value: parseInt(currentProperty.value?.split('px')[3].trim()), icon: 'icon-padding-left' },
      { name: 'paddingTop', value:  parseInt(currentProperty.value?.split('px')[0].trim()), icon: 'icon-padding-top' },
      { name: 'paddingRight', value:  parseInt(currentProperty.value?.split('px')[1].trim()), icon: 'icon-padding-right' },
      { name: 'paddingBottom', value:  parseInt(currentProperty.value?.split('px')[2].trim()), icon: 'icon-padding-bottom' },
    ]
  })

  const compileAndSetProperty = () => {
    if(state.paddings.every(padding => typeof padding.value === 'number')){
      setProperty(property, `${state.paddings[1].value}px ${state.paddings[2].value}px ${state.paddings[3].value}px ${state.paddings[0].value}px`)
    }
  }

</script>

<template>
  <div class="">
    <h2 class="text-xs mb-2 opacity-40">
      Padding
    </h2>
    <div class="flex items-center gap-2" :class="[{ 'opacity-60': !isRealProperty }]">
      <template v-for="padding in state.paddings">
        <div>
          <div class="flex">
            <nuxt-icon :name="padding.icon" class="text-3xl -mt-1" />
          </div>
          <input @change="compileAndSetProperty" v-model="padding.value" type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20">
          <span class="text-sm ml-1">px</span>
        </div>
      </template>
    </div>
  </div>
</template>
