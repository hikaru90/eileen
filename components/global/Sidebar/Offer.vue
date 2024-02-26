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
    offers: [],
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
  <div class="p-4 relative">
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
      <h2 class="text-xs mb-2 opacity-40">Subline</h2>
      <textarea
        @change="saveContent"
        v-model="componentContent.subline"
        type="text"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
    </div>
    <div class="mb-4">
      <h2 class="text-xs mb-2 opacity-40">Offers</h2>

      <div class="flex flex-col gap-2">
        <ArrayPane
          v-for="(offer, index) in componentContent.offers"
          @arrayChanged="saveContent"
          :key="'child' + index"
          :array="componentContent.offers"
          :entry="offer"
          :index="index"
          :label="offer.name"
        >
          <div class="px-2">
            <input
              @change="saveContent"
              v-model="offer.name"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="offer.image"
              type="text"
              placeholder="Bild"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="offer.type"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="offer.description"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="offer.price"
              type="number"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="offer.duration"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <div class="py-4">
              <h2 class="text-xs mb-2 opacity-40">Button</h2>
              <input
                @change="saveContent"
                type="text"
                v-model="offer.cta.text"
                class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
              />
              <h2 class="text-xs mb-2 opacity-40">Link</h2>
              <input
                @change="saveContent"
                type="text"
                v-model="offer.cta.link"
                class="rounded-sm px-2 py-1 w-full bg-transparent border border-darkOffwhite border-opacity-20 mb-4"
              />
              <h2 class="text-xs mb-2 opacity-40">Icon</h2>
              <InputIconSelector v-model="offer.cta.icon" />
            </div>
          </div>
        </ArrayPane>
      </div>
      <button
        @click="
          componentContent.offers.push({
            name: 'Psychologisches Coaching',
            type: 'Einzelcoaching',
            description: 'Individuelles psychologisches Coaching',
            price: 75,
            duration: '50 Minuten',
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
    <h2 class="text-xs opacity-40">Dateien</h2>
    <div v-for="(filename, index) in componentFiles" class="flex items-center gap-2 w-full">
      <div
        :style="[{ backgroundImage: `url(${getCurrentImageUrl(filename)})` }]"
        class="w-10 h-10 bg-cover bg-no-repeat bg-center"
      ></div>
      <div class="flex-shrink max-w-[250px] overflow-hidden">{{ filename }}</div>
      <button @click="deleteFile(filename)" class="border border-red rounded-sm">
        <nuxt-icon name="icon-cross" class="text-red text-xl" />
      </button>
    </div>
    <input @change="handleFiles" type="file" class="mt-2" />
  </div>
</template>
