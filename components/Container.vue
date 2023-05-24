<script setup lang="ts">
  import { useSidebarStore } from "~~/store/sidebar";
  import { useAuthStore } from "~/store/auth";

  const authStore = useAuthStore();
  const sidebarStore = useSidebarStore();
  const {
    setComponentName,
    setComponentCss,
    setComponentId,
    setComponentContentType,
    setComponentContent,
    setComponentFiles,
  } = sidebarStore;

  const props = withDefaults(
    defineProps<{
      container?: object;
    }>(),
    {
      container: undefined,
    }
  );

  const contentType = computed(() => {
    if (props.container.block) {
      return "block";
    } else if (props.container.component) {
      return "component";
    } else {
      return false;
    }
  });

  const selectContainer = (container) => {
    if(authStore.token){
      setComponentId(props.container.id);
      setComponentCss(undefined);
      setComponentName("SidebarContainer");
      setComponentContentType(props.container.type);
      setComponentContent(undefined);
      setComponentFiles(undefined);
    }
  }

</script>

<template>
  <div>
    <div v-if="!contentType">Block or Component could not be found</div>
    <BlockRenderer v-else-if="contentType === 'block'" :block="container.expand.block" />
    <ComponentRenderer
      v-else-if="contentType === 'component'"
      :component="container.expand.component"
    />
  </div>
</template>
