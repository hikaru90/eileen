<script setup lang="ts">
import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentContent } = storeToRefs(sidebarStore);

  const props = defineProps<{
    block: object;
  }>();

</script>

<template>
  <div v-if="props.block.content?.markdown" style="min-height: 20px" v-html="$mdRenderer.render(props.block?.content?.markdown)" class="markdown">
  </div>
</template>

<style lang="scss">


.markdown{
  h1{
    @apply font-bold text-2xl mb-10 mt-6;
  }
  h2{
    @apply font-bold text-xl mb-8 mt-4;
  }
  h3{
    @apply font-bold text-lg mb-6 mt-2;
  }
  p{
    @apply mb-10;
  }
}

</style>