<script setup lang="ts">
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
  const emit = defineEmits(["update:modelValue"]);

  const icons = Object.keys(
    import.meta.glob("~/assets/icons/*.svg", { as: "raw", eager: true })
  ).map((path) => {
    const array = path.split("/");
    return array[array.length - 1].split(".")[0];
  });

  const props = defineProps<{
    modelValue: string;
  }>();

  console.log('props.modelValue',props.modelValue);

  const selectIcon = (icon) => {
    state.isOpen = false;
    state.icon = icon;
    emit('update:modelValue', icon)
  };

  const closeModal = () => {
    state.isOpen = false
  }

  const state = reactive({
    isOpen: false,
  });
</script>

<template>
  <div class="flex relative">
    <button @click="state.isOpen = true" class="border border-darkOffwhite border-opacity-20 p-1">
      <nuxt-icon :name="props.modelValue" class="text-xl text-white" />
    </button>
    <div v-show="state.isOpen" v-on-click-outside="closeModal" class="absolute top-0 left-0 w-full bg-sand border border-darkOffwhite border-opacity-20 rounded-sm flex flex-wrap items-center justify-center gap-1 pt-1">
      <button
        v-for="(icon, index) in icons"
        :key="index"
        @click="selectIcon(icon)"
        class="border border-darkOffwhite border-opacity-20 p-[1px]"
      >
        <nuxt-icon :name="icon" class="text-2xl text-white" />
      </button>
    </div>
  </div>
</template>
