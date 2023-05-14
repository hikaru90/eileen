<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSidebarStore } from "~~/store/sidebar";
  import { useContentStore } from "~/store/content";
  import { onClickOutside } from "@vueuse/core";

  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { viewports, componentId } = storeToRefs(sidebarStore);
  const { windowWidth } = storeToRefs(contentStore);
  const {
    setComponentName,
    setComponentCss,
    setComponentId,
    setComponentContentType,
    setComponentContent,
    setComponentFiles,
  } = sidebarStore;
  const { capitalize } = contentStore;

  const props = defineProps<{
    component: object;
  }>();

  const state = reactive({
    matrix: [],
  });

  const selectBlock = () => {
    setComponentId(props.component.id);
    setComponentCss(undefined);
    setComponentName("SidebarComponent");
    setComponentContentType(props.component.type);
    setComponentContent(props.component.content);
    setComponentFiles(props.component.files);
  };

  const isSelected = computed(() => {
    if (componentId.value === props.component.id) return true;
    return false;
  });

  onMounted(() => {});
</script>

<template>
  <div>
    <component
      @click="selectBlock"
      id="sidebarTarget"
      :is="'Component' + capitalize(props.component.type)"
      :component="props.component"
      :class="[{ 'shadow-edit': isSelected }]"
    >
  </component>
  </div>
</template>
