<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSidebarStore } from "~/store/sidebar";
  const sidebarStore = useSidebarStore();
  const { componentName, componentCss, componentType } = storeToRefs(sidebarStore);

  const dynamicComponent = computed(() => {
    const componentNameValue = componentName.value
    if(componentNameValue){
      const thisComponent = resolveComponent(componentNameValue);
      return thisComponent
    }
  });

  const state = reactive({
    selectedMode: 0,
    modes: [
      { id: 0, name: 'Content' },
      { id: 1, name: 'Style' },
    ]
  })

</script>

<template>
  <div>
    <div class="">
      <div v-if="componentType === 'block'" style="padding-top: 17px;padding-bottom: 17px;" class="border-b border-darkLilac border-opacity-20 px-4 flex gap-2">
        <button v-for="mode in state.modes" :key="'mode'+mode.id" @click="state.selectedMode = mode.id" :class="[ {'bg-white bg-opacity-20': mode.id === state.selectedMode} ]" class="rounded-sm px-2 py-1">
          {{ mode.name }}
        </button>
      </div>
      <component :is="dynamicComponent" :selectedMode="state.selectedMode" />
    </div>
  </div>
</template>
