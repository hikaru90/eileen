<script setup lang="ts">
  import { useVModel } from "@vueuse/core";

  const props = withDefaults(
    defineProps<{
      modelValue?: string;
      label?: string | null;
      innerClass?: string;
      placeholder?: string;
      validation?: string;
      type?: "text" | "password" | "textarea" | "number";
    }>(),
    {
      type: "textarea",
    }
  );

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
          errors.push("Dieses Feld ist ein Pflichtfeld");
        }
      }
      if (props.validation?.includes("email")) {
        if (props.modelValue?.includes("@") === false) {
          errors.push("Bitte gib eine gültige E-Mail-Adresse ein");
        }
      }
    }
    return errors;
  });

  const touch = () => {
    state.touched = true;
    emit("update");
  };

  const emit = defineEmits(["update:modelValue", "update"]);
  const data = useVModel(props, "modelValue", emit);
</script>

<template>
  <div :class="innerClass">
    <div class="relative">
      <FormInputLabel :label="props.label" class="text-left" />
      <div class="w-full relative">
        <textarea
          autocomplete="disabled"
          :type="type"
          :placeholder="placeholder"
          v-model="data"
          @blur="touch"
          class="fieldTarget w-full p-2 border border-grey rounded"
        />
        <div class="absolute top-2 right-2">
          <div v-if="isValid" class="bg-green/600bg-opacity-40 rounded">
              <nuxt-icon name="icon-check" class="text-green/600text-xl" />
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
