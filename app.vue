<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "~/store/auth";
  import { useContentStore } from "~/store/content";
  import { useSidebarStore } from "~~/store/sidebar";
  const nuxtApp = useNuxtApp();
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
    setComponentIsMaxContainer,
    setComponentBackgroundToMaxContainer,
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
      setComponentContentType(undefined);
      setComponentContent(undefined);
      setComponentIsMaxContainer(false);
      setComponentBackgroundToMaxContainer(false);
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

  const isSmooth = true
  nuxtApp.hook("page:finish", () => {
    if (process.client) {
      console.log("page:finish");
      if(isSmooth){
        document.querySelector("#__nuxt").scrollTo({
            top: 0,
            behavior: "smooth",
          });
        document.querySelector("#content-container").scrollTo({
            top: 0,
            behavior: "smooth",
          });
      }else{
        setTimeout(() => {
          document.querySelector('#__nuxt').scrollTop = 0
          document.querySelector('#content-container').scrollTop = 0
        }, 200);
      }
    }
  });


</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
