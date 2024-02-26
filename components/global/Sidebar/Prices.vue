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
      <h2 class="text-xs mb-2 opacity-40">Heading</h2>
      <textarea
        @change="saveContent"
        v-model="componentContent.subline"
        type="text"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
    </div>
    <div class="mb-4">
      <h2 class="text-xs mb-2 opacity-40">Prices</h2>

      <div class="flex flex-col gap-2">
        <ArrayPane
          v-for="(price, index) in componentContent.prices"
          @arrayChanged="saveContent"
          :key="'child' + index"
          :array="componentContent.prices"
          :entry="price"
          :index="index"
          :label="price.name"
        >
          <div class="px-2">
            <input
              @change="saveContent"
              v-model="price.name"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="price.price"
              type="number"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="price.duration"
              type="number"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <textarea
              @change="saveContent"
              v-model="price.description"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
            />
            <div class="py-4">
              <h2 class="text-xs mb-2 opacity-40">Text</h2>
              <input
                @change="saveContent"
                type="text"
                v-model="price.cta.text"
                class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
              />
              <h2 class="text-xs mb-2 opacity-40">Link</h2>
              <input
                @change="saveContent"
                type="text"
                v-model="price.cta.link"
                class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
              />
              <h2 class="text-xs mb-2 opacity-40">Icon</h2>
              <InputIconSelector v-model="price.cta.icon" />
            </div>
          </div>
        </ArrayPane>
      </div>
      <button
        @click="
          componentContent.prices.push({
            name: 'Einzelsitzung',
            price: 100.05,
            duration: 50,
            description: 'MwSt. inklusive',
            cta: {
              text: 'Buchen',
              icon: 'icon-caret-right',
              link: '/buchen',
            },
          })
        "
        class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"
      >
        Hinzufügen
      </button>
    </div>
  </div>
</template>
