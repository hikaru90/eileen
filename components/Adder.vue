<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const emit = defineEmits(["addBlock", "addComponent"]);

  const props = withDefaults(
    defineProps<{
      displayComponentOption?: boolean;
    }>(),
    {
      displayComponentOption: false,
    }
  );
</script>

<template>
  <div v-if="authStore.token" class="element relative w-full h-0">
    <div class="absolute top-1/2 border-b-2 border-gold w-full opacity-0"></div>
    <div
      class="absolute top-1/2 transform -translate-y-1/2 w-full flex items-center justify-center opacity-0 z-10 gap-2"
    >
      <button aria-label="Add Block" @click="emit('addBlock')" class="p-0">
        <div class="flex items-center bg-lightBlue rounded-full m-0">
          <nuxt-icon name="icon-plus" class="text-xl" />
          <span style="padding-top: 2px" class="text-xs pr-2"> Block </span>
        </div>
      </button>
      <button aria-label="Add Component" v-if="props.displayComponentOption" @click="emit('addComponent')" class="p-0">
        <div class="flex items-center bg-lightGreen rounded-full m-0">
          <nuxt-icon name="icon-plus" class="text-xl" />
          <span style="padding-top: 2px" class="text-xs pr-2"> Component </span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .element:hover {
    @apply h-0;
    .opacity-0 {
      @apply opacity-100;
    }
  }
</style>
