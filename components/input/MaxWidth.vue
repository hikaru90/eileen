<script setup lang="ts">
  import { useSidebarStore } from "~/store/sidebar";
  import { storeToRefs } from "pinia";
  const sidebarStore = useSidebarStore();
  const { componentCss, viewports, viewport } = storeToRefs(sidebarStore);
  const { saveCssClasses, setProperty, deleteProperty } = sidebarStore;

  const property = "maxWidth";

  const isRealProperty = computed(() => {
    const entry = componentCss.value[viewport.value]?.find((entry) =>
      entry.hasOwnProperty(property)
    );
    if (entry) return true;
    return false;
  });

  const removeNumbersFromString = (str) => {
    var result = "";
    for (var i = 0; i < str.length; i++) {
      if (isNaN(Number(str[i]))) {
        result += str[i];
      }
    }
    return result;
  };

  const currentProperty = computed(() => {
    const entry = componentCss.value[viewport.value]?.find((entry) =>
      entry.hasOwnProperty(property)
    );
    if (entry) return entry[property];
  });

  const currentUnit = computed(() => {
    if(!currentProperty.value) return null
    return removeNumbersFromString(currentProperty.value);
  });
  
  const currentValue = computed(() => {
    if(!currentProperty.value) return null
    return currentProperty.value.split(currentUnit.value)[0];
  });

  const inputValue = ref();
  const inputUnit = ref();

  const sanitizeInput = () => {
    if (!inputValue.value.value) {
      deleteProperty(property);
    } else {
      setProperty(property, `${inputValue.value.value}${inputUnit.value.value}`);
    }
  };
</script>

<template>
  <div class="">
    <h2 class="text-xs mb-2 opacity-40">Max Width</h2>
    <div class="flex items-center gap-1" :class="[{ 'opacity-60': !isRealProperty }]">
      <input
        ref="inputValue"
        @change="sanitizeInput()"
        :value="currentValue ? parseFloat(currentValue) : null"
        type="number"
        class="w-12 rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20"
      />
      <select
        ref="inputUnit"
        @change="sanitizeInput()"
        :value="currentUnit ? currentUnit : null"
        class="rounded-sm pl-1 bg-transparent border border-darkOffwhite border-opacity-20 text-white"
      >
        <option value="em" :selected="currentUnit === 'em'">em</option>
        <option value="%" :selected="currentUnit === '%'">%</option>
      </select>
    </div>
  </div>
</template>
