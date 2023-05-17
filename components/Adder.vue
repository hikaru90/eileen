<script setup lang="ts">
  const emit = defineEmits(["addContainer"]);
</script>

<template>
  <div class="element relative w-full h-4">
    <div class="absolute top-1/2 border-b-2 border-gold w-full opacity-0"></div>
    <div
      class="absolute top-1/2 transform -translate-y-1/2 w-full flex items-center justify-center opacity-0 z-10"
    >
      <button @click="emit('addContainer')" class="p-0">
        <div class="flex items-center bg-gold rounded-full m-0">
          <nuxt-icon name="icon-plus" class="text-xl" />
          <span style="padding-top: 2px" class="text-xs pr-2"> <slot></slot> </span>
        </div>
      </button>
    </div>
  </div>
</template>


<style scoped lang="scss">
  .element:hover{
    @apply h-4;
    .opacity-0{
      @apply opacity-100;
    }
  }
</style>
