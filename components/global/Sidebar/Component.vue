<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  import { useContentStore } from "~/store/content";
  const sidebarStore = useSidebarStore();
  const { pb } = usePocketbase();
  const emit = defineEmits(["setContentType"]);
  const { setComponentType } = sidebarStore;
  const { componentCss, componentContentType } = storeToRefs(sidebarStore);
  const contentStore = useContentStore();
  const { capitalize } = contentStore;

  const props = withDefaults(
    defineProps<{
      selectedMode: number;
    }>(),
    {
      selectedMode: 0,
    }
  );

  onMounted(() => {
    setComponentType('component')
  });
</script>

<template>
  <div>
    <div v-if="props.selectedMode === 0">
      <InputComponentSelector class="border-b border-darkOffwhite border-opacity-20" />
    </div>
    <div v-if="props.selectedMode === 1">
      <component :is="'Sidebar' + capitalize(componentContentType)"></component>
    </div>
  </div>
</template>
