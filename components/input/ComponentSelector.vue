<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { setComponentContentType } = sidebarStore;
  const { componentContent, componentContentType } = storeToRefs(sidebarStore);

  // const changeType = (event) => {
  //   setComponentContentType(event.target.value)
  // }

  const files = Object.keys(
    import.meta.glob("~/components/global/Component/*.vue", { as: "raw", eager: true })
  ).map((path) => {
    const array = path.split("/");
    return array[array.length - 1].split(".")[0];
  });
</script>
<template>
  <div class="p-4">
    <!-- <select @change="changeType" :value="componentContentType" name="contentType" id="contentTypeSelector" class="rounded-sm bg-transparent border border-darkOffwhite border-opacity-20 py-1 px-2">
      <option value="container" class="bg-black">Container</option>
      <option value="markdown" class="bg-black">Markdown</option>
    </select> -->
    <div v-for="(component, index) in files" :key="'component' + index" class="flex items-center gap-2">
      <nuxt-icon :name="`icon-${component}`" style="font-size: 60px;" class="text-lightBlue" />
      <button>
        {{ component }}
      </button>
    </div>
  </div>
</template>
