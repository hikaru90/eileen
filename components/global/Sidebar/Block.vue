<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { pb } = usePocketbase();
  const emit = defineEmits(["setContentType"]);
  const { setComponentType } = sidebarStore;
  const { componentCss, componentContentType } = storeToRefs(sidebarStore);

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
      <InputContentMarkdown v-if="componentContentType === 'markdown'" />
    </div>
    <div v-else-if="props.selectedMode === 1">
      <InputViewportSelector />
      <InputDisplay class="mb-2" />
      <InputColumns class="mb-2" />
      <InputTextAlign class="mb-2" />
      <InputPadding class="mb-2" />
      <InputMargin class="mb-2" />
      <InputColor class="mb-2" />
      <InputBackgroundColor class="mb-2" />
    </div>
  </div>
</template>
