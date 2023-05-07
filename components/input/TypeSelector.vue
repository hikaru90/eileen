<script setup lang="ts">
  import { useSidebarStore } from '~/store/sidebar'
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { setComponentContent } = sidebarStore;
  const { componentContent, componentContentType } = storeToRefs(sidebarStore);
</script>
<template>
  <div class="p-4">
    <select :value="componentContentType" name="contentType" id="contentTypeSelector" class="rounded-sm">
      <option value="container">Container</option>
      <option value="markdown">Markdown</option>
    </select>
  </div>
</template>