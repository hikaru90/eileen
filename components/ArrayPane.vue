<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { useContentStore } from "~/store/content";
  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { setComponentContent, saveContent } = sidebarStore;
  const { moveUp, moveDown } = contentStore;

  const props = defineProps<{
    array: [];
    entry: object;
    index: number;
  }>();

  const moveUpAndSave = (array, index) => {
    moveUp(array, index);
    saveContent();
  };
  const moveDownAndSave = (array, index) => {
    moveDown(array, index);
    saveContent();
  };

  const state = reactive({
    expanded: false,
  });
</script>

<template>
  <div class="mb-2 border border-offwhite rounded-sm border-opacity-20">
    <div
      class="flex items-center justify-between px-2 hover:bg-offwhite hover:bg-opacity-20" :class="[{ 'border-b border-offwhite mb-2 border-opacity-20' : state.expanded }]"
    >
      <button @click="state.expanded = !state.expanded" class="flex-grow text-left">
        {{ state.expanded ? "-" : "+" }}
      </button>
      <div class="flex items-center">
        <button @click="moveUpAndSave(props.array, props.index)">
          <nuxt-icon name="icon-triangle_up" class="text-xl" />
        </button>
        <button @click="moveDownAndSave(props.array, props.index)">
          <nuxt-icon name="icon-triangle_down" class="text-xl" />
        </button>
      </div>
    </div>
    <slot v-if="state.expanded"></slot>
  </div>
</template>
