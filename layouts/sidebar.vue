<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  

  const isDev = computed(() => {
    return process.dev;
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
          <div class="flex flex-col flex-grow ">
            <div>
              <EditorBar v-if="authStore.token" />
            </div>
            <div :class="[{ 'overflow-x-hidden': !authStore.token }]" class="flex flex-col flex-grow relative">
              <Menu id="top" class="" />
              <slot />
            </div>
          </div>
          <UpButton />
          <Footer />
        </div>
        <div v-if="authStore.token" class="bg-coffee w-96 text-darkOffwhite overflow-auto flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    <!-- </template> -->
  </div>
</template>
