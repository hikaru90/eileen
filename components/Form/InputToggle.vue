<script setup lang="ts">
  import { useVModel } from "@vueuse/core";
  import { useEventListener } from "@vueuse/core";

  const props = defineProps<{
    modelValue?: boolean | null;
    label?: string | null;
    innerClass?: string;
    validation?: string;
  }>();

  const emit = defineEmits(["update:modelValue", "update"]);
  let data = useVModel(props, "modelValue", emit);

  const toggle = (e) => {
    if (e.code === "Space") {
      console.log("space toggle");
      data.value = !data.value;
    }
  };

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

  const touch = () => {
    state.touched = true;
    emit("update");
  };

  const errors = computed(() => {
    let errors = [];
    if (state.touched) {
      if (props.validation?.includes("required")) {
        if (props.modelValue === false) {
          errors.push("Bitte bestätige dieses Feld");
        }
      }
    }
    return errors;
  });

  const target = ref();
  useEventListener(target, "keyup", (e) => {
    toggle(e);
  });
</script>

<template>
  <div>
    <div :class="innerClass">
      <div class="relative">
        <FormInputLabel :label="props.label" class="text-left" />
        <div class="w-full relative">
          <div class="flex items-center gap-4">
            <label class="switch ml-02 my-01 flex-shrink-0">
              <input
                ref="target"
                type="checkbox"
                v-model="data"
                @input="emit('update')"
                @blur="touch"
                class="fieldTarget"
              />
              <span class="slider"></span>
            </label>
            <div class="text-left text-sm flex-grow">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isValid" v-for="(error, index) in errors" :key="'error' + index">
      <FormInputError :error="error" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .switch {
    @apply block relative inline-block w-10 h-6 rounded-full overflow-hidden;

    input {
      @apply opacity-0 w-0 h-0;
    }
  }
  .slider {
    @apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-red transition-all rounded-full;
    box-shadow: inset 0px 0px 6px 0px rgba(black, 0.5);
  }
  .slider:before {
    content: "";
    @apply absolute w-4 h-4 bg-white rounded-full transition-all left-1 top-1/2 transform -translate-y-1/2;
    box-shadow: 0px 1px 3px 0px rgba(black, 0.5);
  }
  input:checked + .slider {
    @apply bg-green;
  }
  input:focus + .slider {
    @apply outline outline-2;
  }
  input:checked + .slider:before {
    @apply left-5;
  }
</style>
