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

  // const handleChange = () => {
  //   console.log('change');
  //   // setComponentContent()
  //   //saveContent
  // }
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
        v-for="(faq, index) in componentContent.faqs"
        @arrayChanged="saveContent"
        :key="'child' + index"
        :array="componentContent.faqs"
        :entry="faq"
        :index="index"
        :label="faq.question"
      >
        <div class="px-2">
          <input
            @change="saveContent"
            v-model="faq.question"
            type="text"
            class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 mb-2"
          />
          <textarea
            @change="saveContent"
            v-model="faq.answer"
            type="text"
            class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
          />
        </div>
      </ArrayPane>
    </div>
    <button aria-label="FAQ Frage hinzufügen"
      @click="componentContent.faqs.push({ question: '', answer: '' })"
      class="rounded-sm hover:bg-white hover:bg-opacity-20 px-2 border border-darkOffwhite border-opacity-20"
    >
      FAQ hinzufügen
    </button>
  </div>
</template>
