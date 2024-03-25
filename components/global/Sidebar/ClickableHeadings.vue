<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  import EventBus from "~/plugins/mitt";
  const sidebarStore = useSidebarStore();
  const { setComponentContent, saveContent, deleteFile } = sidebarStore;
  const { componentContent, componentId, componentType, componentFiles } =
    storeToRefs(sidebarStore);
  const { pb } = usePocketbase();
  const config = useRuntimeConfig();

  const state = reactive({
    heading: "",
  });

  const handleFiles = async (event) => {
    const formData = new FormData();
    for (let file of event.target.files) {
      formData.append("files", file);
    }
    const createdRecord = await pb
      .collection(componentType.value + "s")
      .update(componentId.value, formData);
    console.log("createdRecord", createdRecord);
    EventBus.emit("refresh");
  };

  const getCurrentImageUrl = (filename) => {
    const img = useImage();
    const imgUrl = img(
      `${config.SERVER_URL}/api/files/${componentType.value + "s"}/${
        componentId.value
      }/${filename}?thumb=160x90f`,
      {
        format: "webp",
      }
    );
    return imgUrl;
  };
</script>
<template>
  <div class="p-4">
    <!-- <div class="mb-4">
      <h2 class="text-xs mb-2 opacity-40">Heading</h2>
      <input
        @change="saveContent"
        v-model="componentContent.heading"
        type="text"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
    </div> -->
    <div class="flex flex-col gap-2">
      <ArrayPane
        v-for="(block, index) in componentContent.blocks"
        @arrayChanged="saveContent"
        :key="'child' + index"
        :array="componentContent.blocks"
        :entry="faq"
        :index="index"
        :label="block.heading"
      >
        <div class="px-2">
          <input
            @change="saveContent"
            v-model="block.heading"
            type="text"
            class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
          />
          <textarea
            @change="saveContent"
            v-model="block.text"
            type="text"
            class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
          />
        </div>
      </ArrayPane>
    </div>
    <button aria-label="Block hinzufügen"
      @click="componentContent.blocks.push({ heading: '', text: '' })"
      class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"
    >
    Block hinzufügen
    </button>
  </div>
</template>
