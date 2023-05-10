<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentContent } = storeToRefs(sidebarStore);
  const { saveContent, setComponentContent } = sidebarStore;

  const save = (event) => {
    // console.log('content', event.target.value);

    setComponentContent({ markdown: event.target.value})
    saveContent()
  }
</script>
<template>
  <div class="p-4">
    <textarea @change="save" rows="20" :value="componentContent.markdown" class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20"></textarea>
  </div>
</template>