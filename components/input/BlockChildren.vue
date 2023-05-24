<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { useContentStore } from "~/store/content";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentChildren } = storeToRefs(sidebarStore);
  const { setComponentChildren, saveComponentChildren } = sidebarStore;
  const contentStore = useContentStore();
  const { capitalize } = contentStore;
</script>

<template>
  <div class="p-4 flex flex-col gap-2">
    <ArrayPane
      v-for="(child, index) in componentChildren"
      @arrayChanged="saveComponentChildren"
      :key="'child' + index"
      :array="componentChildren"
      :entry="child"
      :index="index"
    >
      <div class="pb-2 px-2">
        {{ capitalize(child.type) }}
      </div>
    </ArrayPane>
  </div>
</template>
