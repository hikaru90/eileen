<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveBlock, setProperty, deleteProperty } = sidebarStore;

  const property = "background";

  const isRealColor = computed(() => {
    const entry = componentCss.value[viewport.value]?.find((entry) =>
      entry.hasOwnProperty(property)
    );
    if (entry) return true;
    return false;
  });

  const currentColor = computed(() => {
    const entry = componentCss.value[viewport.value]?.find((entry) =>
      entry.hasOwnProperty(property)
    );
    if (entry) return entry[property];
  });

  const state = reactive({
    swatches: [
      {
        id: 0,
        name: "darkGreen",
        value: "radial-gradient(circle, rgba(2,55,41,1) 0%, rgba(0,31,31,1) 60%, rgba(53,65,30,1) 100%)",
      },
      {
        id: 1,
        name: "gold",
        value: "linear-gradient(180deg, rgba(227,200,121,1) 0%, rgba(251,244,138,1) 40%, rgba(155,108,28,1) 100%)",
      },
    ],
  });
</script>

<template>
  <div class="">
    <h2 class="text-xs mb-2 opacity-40">Background Color</h2>
    <InputColorPicker
      :color="currentColor"
      @deleteColor="deleteProperty(property)"
      @setColor="setProperty(property, $event)"
      :class="[isRealColor ? 'opacity-100' : 'opacity-20']"
      class="mb-2"
    />

    <div class="flex items-center gap-2">
      <button
        v-for="(swatch, index) in state.swatches"
        @click="setProperty(property, swatch.value)"
        class="w-6 h-6 border border-offwhite border-opacity-10 rounded-sm"
        :style="[{background: swatch.value}]"
        :key="'swatch' + index"
      ></button>
    </div>
  </div>
</template>
