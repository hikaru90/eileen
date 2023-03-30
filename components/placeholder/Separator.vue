<script setup lang="ts">

const props = defineProps<{
      number: string;
      text: string;
    }>()

</script>
<template>
  <div>
    <div class="outer-container">
      <div class="flex items-start">
        <span class="text-xs mt-1 mr-1 text-sand font-heading">
          {{ props.number }}
        </span>
        <span class="font-heading text-xl">
          {{ props.text }}
        </span>
      </div>
    </div>
    <div class="w-full border-b border-sand border-opacity-20">
    </div>
  </div>
</template>