<script setup lang="ts">
  import { useSidebarStore } from '~/store/sidebar'
  import { useContentStore } from '~/store/content'
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { componentContent, componentContentType } = storeToRefs(sidebarStore);
  const { setComponentContentType, saveContentType } = sidebarStore;
  const { slugify } = contentStore;

  const files = Object.keys(
    import.meta.glob("~/components/global/Block/*.vue", { as: "raw", eager: true })
  ).map((path) => {
    const array = path.split("/");
    return array[array.length - 1].split(".")[0];
  });

  const changeType = (event) => {
    setComponentContentType(event.target.value)
    saveContentType()
  }
</script>
<template>
  <div class="p-4">
    <select @change="changeType" :value="componentContentType" name="contentType" id="contentTypeSelector" class="rounded-sm bg-transparent border border-darkOffwhite border-opacity-20 py-1 px-2">
      <option v-for="(option, index) in files" :key="'option'+index" :value="slugify(option)" class="bg-black">
      {{ option }}</option>
      <!-- <option value="container" class="bg-black">Container</option>
      <option value="markdown" class="bg-black">Markdown</option> -->
    </select>
  </div>
</template>