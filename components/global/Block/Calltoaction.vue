<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      block: object;
    }>(),
    {
    }
  );

  const state = reactive({
  });
</script>

<template>
  <div>
    <a :href="authStore.token ? '#' : props.block.content?.calltoaction.link" :title="props.block.content?.calltoaction.text" class="flex items-center border-2 border-gold rounded text-offwhite px-4 py-3">
      <div>
        {{ props.block.content?.calltoaction.text }}
      </div>
      <div class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4">
        <nuxt-icon :name="props.block.content?.calltoaction.icon" class="text-sm text-coffee" />
      </div>
    </a>
  </div>
</template>