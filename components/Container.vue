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
    if(props.container.block){
      return 'block'
    }else if(props.container.component){
      return 'component'
    }else{
      return false
    }
  })

</script>

<template>
  <div>
    <div v-if="!contentType">Block or Component could not be found</div>
    <BlockRenderer v-else-if="contentType === 'block'" :block="container.expand.block" />
    <ComponentRenderer v-else-if="contentType === 'component'" :component="container.expand.component" />
  </div>
</template>
