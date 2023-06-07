<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore

  const property = 'margin'

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
    margins: [
      { name: 'marginLeft', value: parseInt(currentProperty.value?.split('px')[3].trim()), icon: 'icon-margin-left' },
      { name: 'marginTop', value:  parseInt(currentProperty.value?.split('px')[0].trim()), icon: 'icon-margin-top' },
      { name: 'marginRight', value:  parseInt(currentProperty.value?.split('px')[1].trim()), icon: 'icon-margin-right' },
      { name: 'marginBottom', value:  parseInt(currentProperty.value?.split('px')[2].trim()), icon: 'icon-margin-bottom' },
    ]
  })

  const compileAndSetProperty = () => {
    if(state.margins.every(margin => typeof margin.value === 'number')){
      setProperty(property, `${state.margins[1].value}px ${state.margins[2].value}px ${state.margins[3].value}px ${state.margins[0].value}px`)
    }
  }

</script>

<template>
  <div class="">
    <h2 class="text-xs mb-2 opacity-40">
      Margin
    </h2>
    <div class="flex items-center gap-2" :class="[{ 'opacity-60': !isRealProperty }]">
      <template v-for="margin in state.margins">
        <div>
          <div class="flex">
            <nuxt-icon :name="margin.icon" class="text-3xl -mt-1" />
          </div>
          <input @change="compileAndSetProperty" v-model="margin.value" type="number" class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20">
          <span class="text-sm ml-1">px</span>
        </div>
      </template>
    </div>
  </div>
</template>
