<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentContent, defaults } = storeToRefs(sidebarStore);
  const { setComponentContent, saveContent } = sidebarStore;

  const save = (event) => {
    // console.log('content', event.target.value);
    setComponentContent({ calltoaction: state.calltoaction });
    saveContent();
  };

  const state = reactive({
    calltoaction: {
      text: "Jetzt Termin buchen",
      link: "/buchung",
      icon: "icon-caret-right",
    },
  });

  onMounted(() => {
    if (componentContent.value?.hasOwnProperty("calltoaction")) {
      state.calltoaction = componentContent.value.calltoaction;
    }
  });
</script>
<template>
  <div class="p-4">
    <h2 class="text-xs mb-2 opacity-40">Text</h2>
    <input
      @change="save"
      type="text"
      v-model="state.calltoaction.text"
      class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
    />
    <h2 class="text-xs mb-2 opacity-40">Link</h2>
    <input
      @change="save"
      type="text"
      v-model="state.calltoaction.link"
      class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
    />
    <h2 class="text-xs mb-2 opacity-40">Icon</h2>
    <InputIconSelector v-model="state.calltoaction.icon" />
  </div>
</template>
