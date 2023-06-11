<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { useContentStore } from "~/store/content";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentChildren } = storeToRefs(sidebarStore);
  const {
    setComponentName,
    setComponentCss,
    setComponentId,
    setComponentContentType,
    setComponentContent,
    setComponentIsMaxContainer,
    setComponentChildren,
    saveComponentChildren,
  } = sidebarStore;
  const contentStore = useContentStore();
  const { capitalize } = contentStore;

  const selectChild = (child) => {
    console.log("child", child);
    setComponentId(child.id);
    setComponentIsMaxContainer(child.isMaxContainer);
    setComponentCss(child.cssClasses);
    setComponentName("SidebarBlock");
    setComponentContentType(child.type);
    setComponentContent(child.content);
    setComponentChildren(child.expand.blocks);
  };
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
      <button @click="selectChild(child)" class="pb-2 px-2">
        {{ capitalize(child.type) }}
      </button>
    </ArrayPane>
  </div>
</template>
