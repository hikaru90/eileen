<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { useContentStore } from "~/store/content";
  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { setComponentContent, saveContent, saveComponentChildren } = sidebarStore;
  const { moveUp, moveDown } = contentStore;

  const emit = defineEmits(['arrayChanged'])

  const props = defineProps<{
    array: [];
    entry: object;
    index: number;
  }>();

  const moveUpAndSave = (array, index) => {
    moveUp(array, index);
    emit('arrayChanged')
  };
  const moveDownAndSave = (array, index) => {
    moveDown(array, index);
    emit('arrayChanged')
  };
  const deleteAndSave = (array, index) => {
    array.splice(index,1)
    emit('arrayChanged')
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
        <button @click="deleteAndSave(props.array, props.index)">
          <nuxt-icon name="icon-cross" class="text-xl" />
        </button>
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
