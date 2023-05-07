<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  

  const isDev = computed(() => {
    return process.dev;
  });
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <template v-if="!isDev">
      <Placeholder />
    </template>
    <template v-else>
      <div class="flex flex-grow">
        <div class="flex flex-col flex-grow">
          <div class="flex flex-col flex-grow">
            <div>
              <EditorBar v-if="authStore.token" />
            </div>
            <Menu class="" />
            <slot />
          </div>
          <Footer />
        </div>
        <div class="bg-lilac w-96 text-darkLilac">
          <Sidebar />
        </div>
      </div>
    </template>
  </div>
</template>
