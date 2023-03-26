<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col flex-grow">
      <EditorBar v-if="authStore.token" />
      <Menu class="" />
      <slot />
    </div>
    <Footer />
  </div>
</template>
