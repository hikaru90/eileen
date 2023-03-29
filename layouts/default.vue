<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();

  const { nodeEnv } = useRuntimeConfig();

  const isProd = computed(() => {
    if (nodeEnv === "production") {
      return true;
    }
    return false;
  });
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <template v-if="isProd"> </template>
    <template v-else>
      <div class="flex flex-col flex-grow">
        <div>
          <EditorBar v-if="authStore.token" />
        </div>
        <Menu class="" />
        <slot />
      </div>
      <Footer />
    </template>
  </div>
</template>
