<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  //import EventBus from "~/plugins/mitt";
const { $event } = useNuxtApp()
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
    $event("refresh");
  };

  const getCurrentImageUrl = (filename) => {
    const img = useImage();
    const imgUrl = img(
      `${config.public.SERVER_URL}/api/files/${componentType.value + "s"}/${
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
      <h2 class="text-xs mb-2 opacity-40">Testimonials</h2>

      <div class="flex flex-col gap-2">
        <ArrayPane
          v-for="(testimonial, index) in componentContent.testimonials"
          @arrayChanged="saveContent"
          :key="'child' + index"
          :array="componentContent.testimonials"
          :entry="testimonial"
          :index="index"
          :label="testimonial.name"
        >
          <div class="px-2">
            <input
              @change="saveContent"
              v-model="testimonial.name"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <input
              @change="saveContent"
              v-model="testimonial.date"
              type="date"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
            <textarea
              @change="saveContent"
              v-model="testimonial.text"
              type="text"
              class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
            />
          </div>
        </ArrayPane>
      </div>
      <button
        @click="
          componentContent.testimonials.push({
          name: 'Silke',
          Date: '2023-10-01',
          text: 'Es war für mich ein Schicksalmoment und das größte Glück, mit dir arbeiten zu dürfen. Ich bin endlich wieder viel mehr ich als zuvor und bin immer noch auf dem Weg weiter zu mir.',
          })
        "
        class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"
      >
        Hinzufügen
      </button>
    </div>
  </div>
</template>
