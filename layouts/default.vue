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
  <div class="flex flex-col h-full justify-between">
    <!-- <template v-if="!isDev">
      <Placeholder />
    </template>
    <template v-else> -->
      <div class="flex flex-grow h-screen">
        <div id="content-container" class="flex flex-col flex-grow overflow-auto relative">
          <div class="flex flex-col flex-grow">
            <div>
              <EditorBar v-if="authStore.token" />
            </div>
            <div class="flex flex-col flex-grow relative pt-20">
              <Menu class="" />
              <slot />
            </div>
          </div>
          <UpButton />
          <Footer />
        </div>
      </div>
    <!-- </template> -->
  </div>
</template>
