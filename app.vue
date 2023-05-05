<script setup lang="ts">
  import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
  import { useContentStore } from "~/store/content";
  const authStore = useAuthStore();
  const contentStore = useContentStore();
  const { refresh } = authStore;
  // const { windowWidth } = storeToRefs(contentStore)
  const { setWindowWidth } = contentStore;
  refresh()

  const handleResize = (event) => {
    setWindowWidth(event.target.innerWidth)
  }

  onMounted(() => {
    if(process.client){
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }
  })
  onUnmounted(() => {
    if(process.client){
      window.removeEventListener('resize', handleResize)
    }
  })
  
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
