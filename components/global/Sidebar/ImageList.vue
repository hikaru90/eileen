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
      <div class="mb-4">
        <h2 class="text-xs mb-2 opacity-40">Heading</h2>
        <input
          @change="saveContent"
          v-model="componentContent.heading"
          type="text"
          class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
        />
      </div>
      <div class="mb-4">
        <h2 class="text-xs mb-2 opacity-40">Image</h2>
        <input
          @change="saveContent"
          v-model="componentContent.image"
          type="text"
          class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
        />
      </div>
      <div class="mb-2 flex items-center justify-between">
        <h2 class="text-xs opacity-40">Slides</h2>
        <div
          class="py-1px px-2 rounded-full bg-offwhite text-xs text-black font-bold flex items-center justify-center"
        >
          {{ componentContent.list.length }}
        </div>
      </div>
      <div class="mb-4">
        <ArrayPane
          v-for="(item, index) in componentContent.list"
          @arrayChanged="saveContent"
          :key="'item' + index"
          :array="componentContent.slides"
          :entry="item"
          :index="index"
        >
          <div class="px-2">
            <h2 class="text-xs mb-2 opacity-40">Typ</h2>
            <input
              @change="saveContent"
              v-model="item.type"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
            />
            <h2 class="text-xs mb-2 opacity-40">Ort</h2>
            <input
              @change="saveContent"
              v-model="item.place"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
            />
            <h2 class="text-xs mb-2 opacity-40">Name</h2>
            <input
              @change="saveContent"
              v-model="item.name"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
            />
          </div>
        </ArrayPane>
        <button
        @click="
          componentContent.list.push({
          type: 'Ausbildung',
          place: 'IGST Heidelberg',
          name: 'Systemische Sexualtherapie',
        })
        "
        class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"
      >
        Hinzufügen
      </button>
      </div>
      <h2 class="text-xs opacity-40">Dateien</h2>
      <div v-for="(filename, index) in componentFiles" class="flex items-center gap-2">
        <div
          :style="[{ backgroundImage: `url(${getCurrentImageUrl(filename)})` }]"
          class="w-10 h-10 bg-cover bg-no-repeat bg-center"
        ></div>
        <span>{{ filename }}</span>
        <button @click="deleteFile(filename)" class="border border-red rounded-sm">
          <nuxt-icon name="icon-cross" class="text-red text-xl" />
        </button>
      </div>
      <input @change="handleFiles" type="file" class="mt-2" />
    </div>
</template>
