<script setup lang="ts">
  const props = defineProps<{
    block: object;
  }>();
</script>

<template>
  <div style="min-height:20px;">
    <div v-html="$mdRenderer.render(block.content.markdown)">
    </div>
  </div>
</template>
