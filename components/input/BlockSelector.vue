<script setup lang="ts">
  import { useSidebarStore } from '~/store/sidebar'
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { setComponentContentType } = sidebarStore;
  const { componentContent, componentContentType } = storeToRefs(sidebarStore);

  const changeType = (event) => {
    setComponentContentType(event.target.value)
  }
</script>
<template>
  <div class="p-4">
    <select @change="changeType" :value="componentContentType" name="contentType" id="contentTypeSelector" class="rounded-sm bg-transparent border border-darkOffwhite border-opacity-20 py-1 px-2">
      <option value="container" class="bg-black">Container</option>
      <option value="markdown" class="bg-black">Markdown</option>
    </select>
  </div>
</template>