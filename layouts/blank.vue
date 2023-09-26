<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const isDev = computed(() => {
    // return process.dev
    return config.ENV;
  });
</script>

<template>
  <div id="content-container" class="flex flex-col h-full justify-between">
    <!-- <template v-if="!isDev">
      <Placeholder />
    </template>
    <template v-else> -->
      <EditorBar />
      <div class="flex flex-col flex-grow">
            <slot />
      </div>
      <Footer />
    <!-- </template> -->
  </div>
</template>
