<script setup lang="ts">
  // const res = await $fetch('/nuxtapi/saveTailwindClasses')
  // console.log('res',res);

  const props = withDefaults(
    defineProps<{
      container?: object;
    }>(),
    {
      container: undefined,
    }
  );

  const contentType = computed(() => {
    if (props.container.block) {
      return "block";
    } else if (props.container.component) {
      return "component";
    } else {
      return false;
    }
  });
</script>

<template>
  <div>
    <div v-if="!contentType">Block or Component could not be found</div>
    <div
      v-else-if="contentType === 'block'"
      :class="[{ 'max-container': container.expand.block.isMaxContainer }]"
    >
      <BlockRenderer :block="container.expand.block" />
    </div>
    <ComponentRenderer
      v-else-if="contentType === 'component'"
      :component="container.expand.component"
    />
  </div>
</template>
