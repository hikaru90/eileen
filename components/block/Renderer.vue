<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSidebarStore } from "~~/store/sidebar";
  import { useContentStore } from "~/store/content";
  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { viewports } = storeToRefs(sidebarStore);
  const { windowWidth } = storeToRefs(contentStore);

  const props = withDefaults(
    defineProps<{
      block: object;
    }>(),
    {
      block: 0,
    }
  );

  const createMatrix = (cssClasses) => {
    const keys = JSON.parse(JSON.stringify(cssClasses.flat())).map((row) => Object.keys(row)[0]);
    const uniqueKeys = [...new Set(keys)];
    let matrix = viewports.value.map((entry) => []);

    for (const [index, viewport] of matrix.entries()) {
      if (index === 0) {
        matrix[index] = cssClasses[index];
      } else if (cssClasses[index]) {
        // const lastKeys = cssClasses[index - 1].map(entry => Object.keys(entry)[0])
        const lastEntries = cssClasses[index - 1].map((entry) => Object.entries(entry)[0]);
        const lastKeys = lastEntries.map((entry) => entry[0]);
        const lastValues = lastEntries.map((entry) => entry[1]);
        // const currentKeys = cssClasses[index].map(entry => Object.keys(entry)[0])
        const currentEntries = cssClasses[index].map((entry) => Object.entries(entry)[0]);
        const currentKeys = currentEntries.map((entry) => entry[0]);
        const currentValues = currentEntries.map((entry) => entry[1]);
        for (const currentEntry of currentEntries) {
          if (lastKeys.includes(currentEntry[0])) {
            let newProperty = {};
            newProperty[currentEntry[0]] = currentEntry[1];
            matrix[index].push(newProperty);
          }
          if (!lastKeys.includes(currentEntry[0])) {
            let newProperty = {};
            newProperty[currentEntry[0]] = currentEntry[1];
            matrix[index].push(newProperty);
          }
        }
        for (const lastEntry of lastEntries) {
          if (!currentKeys.includes(lastEntry[0])) {
            let newProperty = {};
            newProperty[lastEntry[0]] = lastEntry[1];
            matrix[index].push(newProperty);
          }
        }
      } else {
        matrix[index] = matrix[index - 1];
      }
    }

    return JSON.parse(JSON.stringify(matrix));
    // result = [
    //   [{ color: "red" }],
    //   [{ color: "yellow" }, { backgroundColor: "blue" }],
    //   [{ color: "yellow" }, { backgroundColor: "blue" }],
    //   [{ color: "yellow" }, { backgroundColor: "black" }],
    //   [{ color: "yellow" }, { backgroundColor: "blue" }],
    // ];
  };

  const currentViewportIndex = computed(() => {
    return viewports.value
      .filter((viewport) => windowWidth.value >= viewport.value)
      .reduce((prev, current) => {
        return prev.value > current.value ? prev : current
      }).id
  });

  const style = computed(() => {
    const matrix = createMatrix(props.block.cssClasses);
    const style = matrix[currentViewportIndex.value]
    return style;
  });
</script>

<template>
  <div :style="[style]">
    {{ props.block }}
  </div>
  <!-- <component :is="`style`" scoped lang="scss">
    @media screen and ( min-width: {{ viewports[0].value }}){ .{{props.block.id}} { {{ styles[0] }} } }
  </component> -->
</template>
