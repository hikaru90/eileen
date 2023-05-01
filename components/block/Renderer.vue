<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useSidebarStore } from "~~/store/sidebar";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore)
const sidebarStore = useSidebarStore()
const { setSidebarComponent, setSidebarData } = sidebarStore

// const res = await $fetch('/nuxtapi/saveTailwindClasses')
// console.log('res',res);

const props = withDefaults(
    defineProps<{
      blocks?: object[];
    }>(),
    {
      blocks: [],
    }
  );

  const editMode = computed(() => {
    if(token) return true
    return false
  })

  const selectBlock = (block) => {
    setSidebarData(block.twClasses)
    setSidebarComponent('SidebarBlock')
  }

</script>

<template>
  <div @click="selectBlock(block)" v-for="block in props.blocks" :key="block.id" :class="[block.twClasses, { 'hover:shadow-edit cursor-pointer': editMode } ]" class="" >
    {{ block }}
  </div>
</template>