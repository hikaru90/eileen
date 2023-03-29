<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const { token } = storeToRefs(authStore)

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

</script>

<template>
  <div v-for="block in props.blocks" :key="block.id" :class="[block.twClass, { 'hover:shadow-edit cursor-pointer': editMode } ]" >
    {{ block }}
  </div>
</template>