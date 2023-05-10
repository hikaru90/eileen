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
      <InputBlockSelector class="border-b border-darkOffwhite border-opacity-20" />
      <InputContentMarkdown v-if="componentContentType === 'markdown'" />
    </div>
    <div v-else-if="props.selectedMode === 1">
      <InputViewportSelector />
      <InputDisplay class="mb-4 px-4" />
      <InputColumns class="mb-4 px-4" />
      <InputTextAlign class="mb-4 px-4" />
      <InputPadding class="mb-4 px-4" />
      <InputMargin class="mb-4 px-4" />
      <InputFontFamily class="mb-4 px-4" />
      <InputFontWeight class="mb-4 px-4" />
      <div class="flex items-center mb-4 px-4 gap-4">
        <InputFontSize class="" />
        <InputLineHeight class="" />
      </div>
      <InputColor class="mb-4 px-4" />
      <InputBackgroundColor class="mb-4 px-4" />
    </div>
  </div>
</template>
