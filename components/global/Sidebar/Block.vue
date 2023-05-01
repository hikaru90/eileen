<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { pb } = usePocketbase();
  const emit = defineEmits(["setTitle"]);
  const { safelistDynamicClasses } = sidebarStore;
  const { componentData } = storeToRefs(sidebarStore);

  const classes = computed(() => {
    if (componentData) {
      const twClasses = componentData.value.split(" ");
      return twClasses;
    }
    return null;
  });

  onMounted(() => {
    emit("setTitle", "Edit Block");
    // getPagelist()
  });
</script>

<template>
  <div>
    <div>
      {{ classes }}
    </div>

    <button @click="safelistDynamicClasses">Save Classes</button>
  </div>
</template>
