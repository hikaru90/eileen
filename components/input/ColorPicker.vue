<script setup lang="ts">
  import { useValidationStore } from "~/store/validation";
  const validationStore = useValidationStore();
  const { isHexColor } = validationStore
  const emit = defineEmits(["setColor", "deleteColor"]);
  const props = withDefaults(
    defineProps<{
      color?: string;
    }>(),
    {
      color: "#000000",
    }
  );

  const setColor = (event) => {
    const value = event?.target.value
      if(isHexColor(value)){
        emit('setColor', value)
      }else{
        console.log('is not a hex color');
      }
  }

  const deleteColor = () => {
    emit('deleteColor')
  }
</script>

<template>
  <div class="flex items-center">
    <input type="color" @change="setColor" :value="props.color" class="rounded-sm w-6 h-6 mr-2" />
    <div>
      <input type="text" @change="setColor" :value="props.color" class="rounded-sm h-6 w-20 mr-2 bg-transparent border border-darkOffwhite border-opacity-20" />
    </div>
    <button @click="deleteColor" class="border border-red rounded-sm">
        <nuxt-icon name="icon-cross" class="text-red text-xl" />
      </button>
  </div>
</template>
