<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { refresh } = authStore;
  refresh()
  
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
