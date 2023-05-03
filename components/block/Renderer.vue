<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useSidebarStore } from "~~/store/sidebar";

const authStore = useAuthStore();
const { token } = storeToRefs(authStore)
const sidebarStore = useSidebarStore()
const { setComponentName, setComponentCss, setComponentId } = sidebarStore

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
    setComponentId(block.id)
    setComponentCss(block.cssClasses)
    setComponentName('SidebarBlock')
  }

</script>

<template>
  <div @click="selectBlock(block)" v-for="block in props.blocks" :key="block.id" :style="block.cssClasses" :class="[{ 'hover:shadow-edit cursor-pointer': editMode } ]" class="" >
    {{ block }}

    {{ block.cssClasses }}
  </div>
</template>