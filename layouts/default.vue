<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();

  const { ENV } = useRuntimeConfig();
  console.log('ENV',ENV);

</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <template v-if="ENV === 'prod'">
      <Placeholder />
    </template>
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
