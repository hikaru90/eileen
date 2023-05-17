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
  <div v-if="props.block" style="min-height: 20px">
    <div v-if="props.block.content?.markdown" v-html="$mdRenderer.render(props.block?.content?.markdown)"></div>
  </div>
</template>
