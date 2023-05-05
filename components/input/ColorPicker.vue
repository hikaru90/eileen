<script setup lang="ts">
  const emit = defineEmits(["setColor"]);
  const props = withDefaults(
    defineProps<{
      color?: string;
    }>(),
    {
      color: "#000000",
    }
  );

  const setColor = (event) => {
    emit('setColor', event?.target.value)
  }
</script>

<template>
  <input type="color" @change="setColor" :value="props.color" class="rounded-sm" />
</template>
