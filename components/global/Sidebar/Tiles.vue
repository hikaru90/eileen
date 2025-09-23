<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { setComponentContent, saveContent, deleteFile } = sidebarStore;
  const { componentContent, componentId, componentType, componentFiles } =
    storeToRefs(sidebarStore);
  const { pb } = usePocketbase();
  const config = useRuntimeConfig();

  const state = reactive({
    heading: "",
  });

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

    <div class="flex flex-col gap-2">
      <ArrayPane
        v-for="(tile, index) in componentContent.tiles"
        @arrayChanged="saveContent"
        :key="'tile' + index"
        :array="componentContent.tiles"
        :entry="tile"
        :index="index"
        :label="tile.title || 'Tile ' + (index + 1)"
      >
        <div class="px-2 space-y-2">
          <div>
            <label class="text-xs opacity-40">Title</label>
            <input
              @change="saveContent"
              v-model="tile.title"
              type="text"
              placeholder="Tile title"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
            />
          </div>
          <div>
            <label class="text-xs opacity-40">Description</label>
            <textarea
              @change="saveContent"
              v-model="tile.description"
              placeholder="Tile description"
              rows="3"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
            />
          </div>
        </div>
      </ArrayPane>
    </div>
    <button aria-label="Tile hinzufügen"
      @click="componentContent.tiles.push({ title: '', description: '', icon: '', linkTitle: '', linkTarget: '' })"
      class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"
    >
      Tile hinzufügen
    </button>
  </div>
</template>