<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSidebarStore } from "~/store/sidebar";
  const sidebarStore = useSidebarStore();
  const { componentName, componentCss } = storeToRefs(sidebarStore);

  const dynamicComponent = computed(() => {
    const componentNameValue = componentName.value
    if(componentNameValue){
      const thisComponent = resolveComponent(componentNameValue);
      return thisComponent
    }
  });

  const data = reactive({
    title: '',
  })

  const setTitle = (title) => {
    data.title = title
  }

</script>

<template>
  <div>
    <div class="">
      <div class="mb-5">
        {{ data.title }}
      </div>
      <component :is="dynamicComponent" @setTitle="setTitle" />
    </div>
  </div>
</template>
