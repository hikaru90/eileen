<script setup lang="ts">

const props = withDefaults(
    defineProps<{
      name?: string;
    }>(),
    {
      name: 'Name',
    }
  );

</script>

<template>
  <div>
    <span class="text-xs font-bold">
      {{ props.name }}
    </span>
    <div>
      <slot></slot>
    </div>
  </div>
</template>