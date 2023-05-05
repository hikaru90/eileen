<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { pb } = usePocketbase();
  const emit = defineEmits(["setTitle"]);
  // const { safelistDynamicClasses } = sidebarStore;
  const { componentCss } = storeToRefs(sidebarStore);

  const state = reactive({
    viewport: 0
  })

  const setViewport = (value) => {
    state.viewport = value
  };

  onMounted(() => {
    emit("setTitle", "Edit Block");
    // getPagelist()
  });
</script>

<template>
  <div>
    <ViewportSelector @setViewport="setViewport" />
    <InputColor :viewport="state.viewport" class="mb-2" />
    <InputBackgroundColor :viewport="state.viewport" class="mb-2" />

    <!-- <button @click="safelistDynamicClasses">Save Classes</button> -->
  </div>
</template>
