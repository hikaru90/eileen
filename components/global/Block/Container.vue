<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      block: object;
      depth?: number;
    }>(),
    {
      depth: 0,
    }
  );
</script>

<template>
  <div style="min-height: 20px">
    <BlockRenderer
      v-for="(block, index) in props.block.expand.blocks"
      :block="block"
      :depth="props.depth"
      :key="'block' + props.depth + index"
    />
  </div>
</template>
