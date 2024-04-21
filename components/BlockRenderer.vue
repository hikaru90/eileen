<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSidebarStore } from "~~/store/sidebar";
  import { useContentStore } from "~/store/content";
  import { onClickOutside } from "@vueuse/core";
  import { useAuthStore } from "~/store/auth";
  const { $event } = useNuxtApp()


  const { pb } = usePocketbase();
  const authStore = useAuthStore();
  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { viewports, componentId } = storeToRefs(sidebarStore);
  const { windowWidth } = storeToRefs(contentStore);
  const {
    setComponentName,
    setComponentCss,
    setComponentId,
    setComponentContentType,
    setComponentContent,
    setComponentIsMaxContainer,
    setComponentBackgroundToMaxContainer,
    setComponentChildren,
  } = sidebarStore;
  const { capitalize } = contentStore;

  const props = withDefaults(
    defineProps<{
      block: object;
      depth?: number;
      isFirst?: boolean;
    }>(),
    {
      depth: 0,
      isFirst: false,
    }
  );

  const state = reactive({
    matrix: [],
  });

  const createMatrix = (cssClasses) => {
    try {
      const keys = JSON.parse(JSON.stringify(cssClasses.flat())).map((row) => Object.keys(row)[0]);
      const uniqueKeys = [...new Set(keys)];
      let matrix = viewports.value.map((entry) => []);

      for (const [index, viewport] of matrix.entries()) {
        if (index === 0) {
          matrix[index] = cssClasses[index];
        } else if (cssClasses[index]) {
          // const lastKeys = cssClasses[index - 1].map(entry => Object.keys(entry)[0])
          const lastEntries = matrix[index - 1].map((entry) => Object.entries(entry)[0]);
          const lastKeys = lastEntries.map((entry) => entry[0]);
          const lastValues = lastEntries.map((entry) => entry[1]);
          // const currentKeys = cssClasses[index].map(entry => Object.keys(entry)[0])
          const currentEntries = cssClasses[index].map((entry) => Object.entries(entry)[0]);
          const currentKeys = currentEntries.map((entry) => entry[0]);
          const currentValues = currentEntries.map((entry) => entry[1]);
          for (const currentEntry of currentEntries) {
            if (lastKeys.includes(currentEntry[0])) {
              // console.log(currentEntry[0],' was changed');
              let newProperty = {};
              newProperty[currentEntry[0]] = currentEntry[1];
              matrix[index].push(newProperty);
            } else {
              // console.log(currentEntry[0],' was added');
              let newProperty = {};
              newProperty[currentEntry[0]] = currentEntry[1];
              matrix[index].push(newProperty);
            }
          }
          for (const lastEntry of lastEntries) {
            if (!currentKeys.includes(lastEntry[0])) {
              // console.log(lastEntry[0],' was removed');
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
    } catch (err) {
      return [[], [], [], [], []];
      console.log("error creative style matrix");
    }
  };

  const currentViewportIndex = computed(() => {
    return viewports.value
      .filter((viewport) => windowWidth.value >= viewport.value)
      .reduce((prev, current) => {
        return prev.value > current.value ? prev : current;
      }).id;
  });

  const style = computed(() => {
    state.matrix = createMatrix(props.block.cssClasses);

    const blockStyle = state.matrix.map((viewport) =>
      viewport.filter((property) => {
        if (property.hasOwnProperty("background") && !props.block.limitBackgroundToMaxContainer) return false;
        return true;
      })
    )[currentViewportIndex.value];

    const containerStyle = state.matrix.map((viewport) =>
      viewport.filter((property) => {
        if (property.hasOwnProperty("background") && !props.block.limitBackgroundToMaxContainer) return true;
        if (property.hasOwnProperty("width")) return true;
        return false;
      })
    )[currentViewportIndex.value];

    return { container: containerStyle, block: blockStyle };
  });

  const selectBlock = () => {
    if (authStore.token) {
      console.log("props.block.id", props.block.id);
      setComponentId(props.block.id);
      setComponentIsMaxContainer(props.block.isMaxContainer);
      setComponentBackgroundToMaxContainer(props.block.limitBackgroundToMaxContainer);
      setComponentCss(props.block.cssClasses);
      setComponentName("SidebarBlock");
      setComponentContentType(props.block.type);
      setComponentContent(props.block.content);
      setComponentChildren(props.block.expand.blocks);
    }
  };

  // watch(isLoggedIn, () => {
  //   console.log('isLoggedIn ref changed, do something!')
  // })

  const addBlock = async (container) => {
    console.log("container", container);
    const block = await pb.collection("blocks").create({
      type: "default",
      isMaxContainer: false,
      cssClasses: [
        [
          { paddingTop: "40px" },
          { paddingBottom: "40px" },
          { marginTop: "40px" },
          { marginBottom: "40px" },
        ],
        [],
        [],
        [],
        [],
      ],
    });
    let allBlocks = props.block.blocks;
    allBlocks.push(block.id);
    const updatedBlock = await pb.collection("blocks").update(container.id, { blocks: allBlocks });
    $event("refresh");
  };

  onMounted(() => {});
</script>

<template>
  <div
    id="sidebarTarget"
    :style="[style.container]"
    @click.stop="selectBlock"
    v-if="props.block?.type"
    class="flex"
  >
    <component
      :is="'Block' + capitalize(props.block.type)"
      :block="props.block"
      :isFirst="props.isFirst"
      :depth="props.depth + 1"
      :style="[style.block]"
      :class="[
        { 'hover:shadow-block': authStore.token },
        { 'shadow-block': authStore.token && componentId === props.block?.id },
        { 'max-container': props.block.isMaxContainer },
      ]"
    >
    </component>
  </div>
  <div class="relative -top-6 h-0">
    <Adder v-if="props.depth === 0" @addBlock="addBlock(props.block)">Block</Adder>
  </div>
</template>
