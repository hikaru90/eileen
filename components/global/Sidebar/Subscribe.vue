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
        placeholder="e.g. Newsletter abonnieren"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
    </div>

    <div class="mb-4">
      <h2 class="text-xs mb-2 opacity-40">Description</h2>
      <textarea
        @change="saveContent"
        v-model="componentContent.description"
        placeholder="Beschreibung des Newsletters"
        rows="4"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
    </div>

    <div class="mb-4">
      <h2 class="text-xs mb-2 opacity-40">Button Text</h2>
      <input
        @change="saveContent"
        v-model="componentContent.buttonText"
        type="text"
        placeholder="e.g. Newsletter abonnieren"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
    </div>

    <div class="mb-4">
      <h2 class="text-xs mb-2 opacity-40">MailerLite Group ID</h2>
      <input
        @change="saveContent"
        v-model="componentContent.groupId"
        type="text"
        placeholder="e.g. 164511800528734081"
        class="w-full rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
      <p class="text-xs opacity-60 mt-1">
        Die Group ID aus MailerLite, zu der Abonnenten hinzugefügt werden sollen.
      </p>
    </div>

    <div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
      <h3 class="text-xs font-medium text-blue-800 mb-2">Newsletter Integration</h3>
      <p class="text-xs text-blue-600">
        Diese Komponente sammelt Namen und E-Mail-Adressen für den MailerLite Newsletter.
        Die Daten werden automatisch an die konfigurierte MailerLite-Gruppe gesendet.
      </p>
    </div>
  </div>
</template>