<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "~/store/auth";
  import { useContentStore } from "~/store/content";
  import { useSidebarStore } from "~~/store/sidebar";
  const authStore = useAuthStore();
  const contentStore = useContentStore();
  const { refresh } = authStore;
  // const { windowWidth } = storeToRefs(contentStore)
  const { setWindowWidth } = contentStore;
  refresh();

  const sidebarStore = useSidebarStore();
  const {
    setComponentName,
    setComponentCss,
    setComponentId,
    setComponentType,
    setComponentContentType,
    setComponentContent,
  } = sidebarStore;

  const handleResize = (event) => {
    setWindowWidth(event.target.innerWidth);
  };

  const deselectSidebar = (event) => {
    if(event.key === "Escape"){
      setComponentId(undefined);
      setComponentCss([]);
      setComponentName("");
      setComponentType(undefined);
      setComponentContentType({type: undefined, collection: 'blocks'});
      setComponentContent(undefined);
    }
  };

  onMounted(() => {
    if (process.client) {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      window.addEventListener("keyup", deselectSidebar);
    }
  });
  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keyup", deselectSidebar);
    }
  });
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
