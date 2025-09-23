<script setup lang="ts">
  import defaults from "~/lib/defaults";
  import { useSidebarStore } from "~/store/sidebar";
  import { useContentStore } from "~/store/content";
  import { storeToRefs } from "pinia";
  //import EventBus from "~/plugins/mitt";
const { $event } = useNuxtApp()
  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { setComponentContent, setComponentContentType, saveContent, saveContentType } =
    sidebarStore;
  const { decapitalize } = contentStore;
  const { componentContent, componentType, componentContentType } = storeToRefs(sidebarStore);

  const state = reactive({
    modalVisible: false,
    componentTypeStore: '',
  });

  const openChangeTypeDialog = (componentType: string) => {
    console.log('isDefaultComponentContent.value',isDefaultComponentContent.value);
    if (!isDefaultComponentContent.value) {
      state.modalVisible = true;
      state.componentTypeStore = componentType
      return
    }
    changeType(componentType)
  };

  const changeType = (componentType: string) => {
    console.log('changeType');
    state.modalVisible = false
    setComponentContentType(componentType);
    setComponentContent(defaults.find((el) => el.type === decapitalize(componentType)).content);
    saveContent(true);
    setTimeout(() => {
      saveContentType(true);
      $event("refresh");
    }, 500);
  };

  const jsonIsEqual = (json1, json2) => {
    try{

      // Convert JSON objects to strings
      const str1 = JSON.stringify(json1, Object.keys(json1).sort());
      const str2 = JSON.stringify(json2, Object.keys(json2).sort());
      
      // Compare the string representations
      return str1 === str2;
    }catch(err){
      return true
    }
  };

  const isDefaultComponentContent = computed(() => {
    const defaultContent = defaults.find(
      (el) => el.type === decapitalize(componentContentType.value)
    ).content;
    const thisContent = JSON.parse(JSON.stringify(componentContent.value));
    if (jsonIsEqual(defaultContent, thisContent)) return true;
    return false;
  });

  const files = Object.keys(
    import.meta.glob("~/components/global/Component/*.vue", { query: "?raw", eager: true })
  ).map((path) => {
    const array = path.split("/");
    return array[array.length - 1].split(".")[0];
  });
</script>
<template>
  <div class="p-4">
    <div v-show="state.modalVisible">
      <div class="font-bold mb-2">
        Content löschen?
      </div>
      Bist Du sicher, dass Du die Komponente austauschen möchtest? Der bisherige Content wird gelöscht.

      <div class="flex items-center justify-between mt-6">
        <button @click="state.modalVisible = false" class="border border-red border-opacity-30 rounded px-2">
          Abbrechen
        </button>
        <button @click="changeType(state.componentTypeStore)" class="border bg-green-500/60 border-green-500/60 border-opacity-30 rounded px-4 py-1">
          Ja
        </button>
      </div>
    </div>
    <!-- <select @change="changeType" :value="componentContentType" name="contentType" id="contentTypeSelector" class="rounded-sm bg-transparent border border-darkOffwhite border-opacity-20 py-1 px-2">
      <option value="container" class="bg-sand">Container</option>
      <option value="markdown" class="bg-sand">Markdown</option>
    </select> -->
    <div v-show="!state.modalVisible" v-for="(component, index) in files" :key="'component' + index">
      <button
        @click="openChangeTypeDialog(component)"
        class="flex w-full items-center gap-2"
        :class="[{ 'bg-white bg-opacity-20 rounded': componentContentType === component }]"
      >
        <nuxt-icon :name="`icon-${component}`" style="font-size: 60px" class="text-lightBlue" />
        <div>
          {{ component }}
        </div>
      </button>
    </div>
  </div>
</template>
