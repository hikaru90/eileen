<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { pb } = usePocketbase();
  const emit = defineEmits(["setContentType"]);
  const { setComponentType } = sidebarStore;
  const { componentCss, viewport, componentContentType } = storeToRefs(sidebarStore);

  const props = withDefaults(
    defineProps<{
      selectedMode: number;
    }>(),
    {
      selectedMode: 0,
    }
  );

  const displayCssValue = computed(() => {
    return componentCss.value[viewport.value]?.find((entry) => entry.hasOwnProperty('display'))?.display
  })
  const columnsCssValue = computed(() => {
    return componentCss.value[viewport.value]?.find((entry) => entry.hasOwnProperty('columns'))?.columns
  })

  onMounted(() => {
    setComponentType('block')
  });
</script>

<template>
  <div>
    <div v-if="props.selectedMode === 0">
      <InputBlockSelector class="border-b border-darkOffwhite border-opacity-20" />
      <InputMaxContainer />
      <InputMaxContainerBackground />
      <InputContentMarkdown v-if="componentContentType === 'markdown'" />
      <InputContentCallToAction v-if="componentContentType === 'calltoaction'" />
      <InputBlockChildren />
    </div>
    <div v-else-if="props.selectedMode === 1">
      <InputViewportSelector />
      <InputDisplay class="mb-4 px-4" />
      <InputFlexGrow class="mb-4 px-4" />
      <InputFlexShrink class="mb-4 px-4" />
      <template v-if="displayCssValue === 'flex'">
        <InputFlexDirection class="mb-4 px-4" />
        <InputAlignItems class="mb-4 px-4" />
        <InputJustifyContent class="mb-4 px-4" />
      </template>
      <InputColumns class="mb-4 px-4" />
      <template v-if="columnsCssValue">
        <InputColumnGap class="mb-4 px-4" />
      </template>
      <InputTextAlign class="mb-4 px-4" />
      <div class="mb-4 px-4 flex gap-2">
        <InputPaddingLeft />
        <InputPaddingTop />
        <InputPaddingRight />
        <InputPaddingBottom />
      </div>
      <!-- <InputPadding class="mb-4 px-4" /> -->
      <div class="mb-4 px-4 flex gap-2">
        <InputMarginLeft />
        <InputMarginTop />
        <InputMarginRight />
        <InputMarginBottom />
      </div>
      <InputFontFamily class="mb-4 px-4" />
      <InputFontWeight class="mb-4 px-4" />
      <div class="flex items-center mb-4 px-4 gap-4">
        <InputFontSize class="" />
        <InputLineHeight class="" />
      </div>
      <InputColor class="mb-4 px-4" />
      <InputBackgroundColor class="mb-4 px-4" />
      <InputWidth class="mb-4 px-4" />
      <InputMaxWidth class="mb-4 px-4" />
    </div>
  </div>
</template>
