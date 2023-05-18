<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { useSidebarStore } from "~~/store/sidebar";
  import { useContentStore } from "~/store/content";
  import { onClickOutside } from "@vueuse/core";
  import { useAuthStore } from "~/store/auth";
  import EventBus from "~/plugins/mitt";

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
    setComponentIsMAxContainer,
  } = sidebarStore;
  const { capitalize } = contentStore;

  const props = withDefaults(
    defineProps<{
      block: object;
      depth?: number;
    }>(),
    {
      depth: 0,
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
    const style = state.matrix[currentViewportIndex.value];
    return style;
  });

  const selectBlock = () => {
    if (authStore.token) {
      console.log("props.block.id", props.block.id);
      setComponentId(props.block.id);
      setComponentIsMAxContainer(props.block.isMaxContainer);
      setComponentCss(props.block.cssClasses);
      setComponentName("SidebarBlock");
      setComponentContentType(props.block.type);
      setComponentContent(props.block.content);
    }
  };

  // watch(isLoggedIn, () => {
  //   console.log('isLoggedIn ref changed, do something!')
  // })

  const addBlock = async (container) => {
    console.log("container", container);
    const block = await pb
      .collection("blocks")
      .create({ type: "container", isMaxContainer: false, cssClasses: [[{padding: '40px 40px 40px 40px'},{margin: '40px 40px 40px 40px'}], [], [], [], []] });
    const updatedBlock = await pb.collection("blocks").update(container.id, { blocks: block.id });
    EventBus.emit("refresh");
  };

  onMounted(() => {});
</script>

<template>
    <component
      v-if="props.block?.type"
      @click.stop="selectBlock"
      id="sidebarTarget"
      :is="'Block' + capitalize(props.block.type)"
      :block="props.block"
      :depth="props.depth + 1"
      :style="[style]"
      :class="[{ 'hover:shadow-block': authStore.token },{ 'shadow-block': authStore.token && (componentId === props.block?.id) }]"
    >
    </component>
    <Adder v-if="props.depth === 0" @addContainer="addBlock(props.block)">Block</Adder>
</template>
