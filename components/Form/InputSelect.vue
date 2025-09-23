<script setup lang="ts">
  import { useVModel } from "@vueuse/core";

  const props = defineProps<{
    modelValue?: string | null;
    label?: string;
    options: { label: string; value: string | null }[];
    innerClass?: string;
    validation?: string;
  }>();

  const emit = defineEmits(["update:modelValue", "update"]);
  const data = useVModel(props, "modelValue", emit);

  const state = reactive({
    touched: false,
  });

  const isValid = computed(() => {
    if (state.touched) {
      if (errors.value.length > 0) {
        return false;
      }
      return true;
    }
    return undefined;
  });

  const errors = computed(() => {
    let errors = [];
    if (state.touched) {
      if (props.validation?.includes("required")) {
        if (!props.modelValue) {
          errors.push("Wähle bitte eine Option");
        }
      }
    }
    return errors;
  });

  const touch = () => {
    state.touched = true;
    emit("update");
  };
</script>

<template>
  <div :class="innerClass">
    <div class="relative">
      <FormInputLabel :label="props.label" class="text-left" />
      <div class="w-full relative">
        <select
          @blur="touch"
          v-model="data"
          @input="emit('update')"
          class="fieldTarget w-full border border-grey rounded pl-2 pr-8 py-[6px]"
        >
          <option
            v-for="(option, index) in props.options"
            :key="'option' + index"
            :value="option.value"
            :selected="option.value === data"
          >
            {{ option.label }}
          </option>
        </select>
        <div class="absolute top-1/2 right-5 transform -translate-y-1/2">
            <div v-if="isValid" class="bg-green-500/60 bg-opacity-40 rounded">
              <nuxt-icon name="icon-check" class="text-green-500/60 text-xl" />
            </div>
            <div v-if="isValid === false" class="bg-red bg-opacity-40 rounded">
              <nuxt-icon name="icon-cross" class="text-red text-xl" />
            </div>
        </div>
      </div>
      <div v-if="!isValid" v-for="(error, index) in errors" :key="'error' + index">
        <FormInputError :error="error" />
      </div>
    </div>
  </div>
</template>
