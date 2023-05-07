<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { pb } = usePocketbase();
  const emit = defineEmits(["setContentType"]);
  const { setComponentType } = sidebarStore;
  const { componentCss } = storeToRefs(sidebarStore);

  const props = withDefaults(
    defineProps<{
      selectedMode: number;
    }>(),
    {
      selectedMode: 0,
    }
  );

  onMounted(() => {
    setComponentType('block')
  });
</script>

<template>
  <div>
    <div v-if="props.selectedMode === 0">
      <InputTypeSelector class="border-b border-darkLilac border-opacity-20" />
      
    </div>
    <div v-else-if="props.selectedMode === 1">
      <InputViewportSelector />
      <InputColor class="mb-2" />
      <InputBackgroundColor class="mb-2" />
    </div>
  </div>
</template>
