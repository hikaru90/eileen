<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "~/store/auth";
  import { useSidebarStore } from "~~/store/sidebar";
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const sidebarStore = useSidebarStore();
  

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
    if (token) return true;
    return false;
  });

</script>

<template>
  <div
    v-for="block in props.blocks"
    :key="block.id"
    :class="[{ 'hover:shadow-edit cursor-pointer': editMode }]"
    class=""
  >
    <Renderer :block="block" />
  </div>
</template>
