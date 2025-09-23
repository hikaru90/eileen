<script setup lang="ts">
import { useContentStore } from "~/store/content";
import { useSidebarStore } from "~~/store/sidebar";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
//import EventBus from "~/plugins/mitt";
const { $event, $listen } = useNuxtApp();
const { pb } = usePocketbase();
const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const contentStore = useContentStore();
const { moveDown, moveUp, setPage, savePage } = contentStore;
const { page } = storeToRefs(contentStore);
const { token } = storeToRefs(authStore);
const { viewports, componentId } = storeToRefs(sidebarStore);

const route = useRoute();
let slug = route.params.slug;
// Handle different slug formats for catch-all routes
if (!slug || (Array.isArray(slug) && slug.length === 0)) {
  slug = "index";
} else if (Array.isArray(slug)) {
  slug = slug.join('/');
}

// Filter out Chrome DevTools requests
if (slug.includes('.well-known')) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

definePageMeta({
  layout: "sidebar",
});

const state = reactive({
  currentContainer: null,
});

const { pending, data: pageContent } = await useAsyncData("pageContent", async () => {
  try {
    const res = await pb.collection("pages").getFirstListItem(`slug="${slug}"`, {
      expand: "containers.block.blocks,containers.component,seo",
    })
    // Convert to plain object to avoid serialization issues
    return JSON.parse(JSON.stringify(res))
  } catch (error) {
    console.error('Error loading page with slug:', slug, error.status || error.message)
    if (error.status === 404) {
      throw createError({ statusCode: 404, statusMessage: `Page "${slug}" not found` });
    }
    return null
  }
});

useHead(() => {
  if (!pageContent.value) {
    return {
      title: 'Eileen George',
      meta: [{ name: "description", content: '' }],
    }
  }

  return {
    title: pageContent.value.expand?.seo?.title
      ? `Eileen George — ${pageContent.value.expand?.seo?.title}`
      : `Eileen George — ${pageContent.value.title}`,
    meta: [{ name: "description", content: pageContent.value.expand?.seo?.description || '' }],
  }
});

$listen("refresh", () => {
  console.log("content saved");
  refresh();
});

const refresh = async () => {
  await setTimeout(async () => {
    await refreshNuxtData("pageContent");
    if (pageContent.value) {
      // Ensure we pass a clean copy to the store
      setPage(JSON.parse(JSON.stringify(pageContent.value)));
    }
  }, 400);
};

const moveUpAndSave = (array, index) => {
  moveUp(array, index);
  savePage();
};
const moveDownAndSave = (array, index) => {
  moveDown(array, index);
  savePage();
};
const deleteContainer = async (array, index) => {
  const container = await pb.collection("containers").getOne(array[index]);
  const blockId = container.block;
  const componentId = container.component;
  if (blockId) await pb.collection("blocks").delete(blockId);
  if (componentId) await pb.collection("components").delete(componentId);
  await pb.collection("containers").delete(container.id);
  array.splice(index, 1);
  savePage();
};

const currentContainerAuth = computed(() => {
  if (authStore?.token) {
    return state.currentContainer;
  }
  return null;
});

const isSelected = (container) => {
  const id = container?.expand?.block?.id || container?.expand?.component?.id;
  if (componentId?.value === id) return true;
  return false;
};

const addBlockContainer = async (index) => {
  const block = await pb.collection("blocks").create({
    type: "default",
    isMaxContainer: false,
    cssClasses: [[{ paddingTop: "40px" }, { marginTop: "40px" }], [], [], [], []],
  });
  const container = await pb.collection("containers").create({ block: block.id });
  // const container = await pb.collection('containers').create();
  const createdId = container.id;
  const containers = pageContent.value.containers;
  containers.splice(index, 0, createdId);
  const page = await pb
    .collection("pages")
    .update(pageContent.value.id, { containers: containers });
  refresh();
};
const addComponent = async (index) => {
  const component = await pb.collection("components").create({ type: "default" });
  const container = await pb.collection("containers").create({ component: component.id });
  const createdId = container.id;
  const containers = pageContent.value.containers;
  containers.splice(index, 0, createdId);
  const page = await pb
    .collection("pages")
    .update(pageContent.value.id, { containers: containers });
  refresh();
};

onMounted(() => {
  if (pageContent.value) {
    // Ensure we pass a clean copy to the store
    setPage(JSON.parse(JSON.stringify(pageContent.value)));
  }
});
</script>

<template>
  <main class="mt-24">
      <DebugPane
        v-if="contentStore?.debugVisible"
        :content="page"
        @refresh="refresh"
      />

      <template v-if="!pageContent?.published">
        <div class="flex justify-center items-center h-full">
          <a href="/">
            Zur Startseite
          </a>
        </div>
      </template>
      <template v-else>

        <div class="">
          <div class="">
            <!-- <h1>{{ page?.title }}</h1> -->
            <!-- {{ content }} -->
            <Adder
              @addBlock="addBlockContainer(0)"
              @addComponent="addComponent(0)"
              displayComponentOption
            />
            <div
              @mouseenter="state.currentContainer = index"
              v-if="page?.expand?.containers"
              v-for="(container, index) in page.expand.containers"
              :key="container.id"
              :class="[
                { 'hover:shadow-edit': authStore?.token && currentContainerAuth },
                { 'cursor-cell': authStore?.token },
                { 'shadow-edit': isSelected(container) },
              ]"
              class="relative"
            >
              <div
                v-show="currentContainerAuth === index"
                class="absolute w-full flex justify-between pointer-events-none z-10"
              >
                <div class="flex items-center pointer-events-auto">
                  <button
                    @click="moveUpAndSave(page.containers, index)"
                    class="bg-gold"
                  >
                    <nuxt-icon
                      name="icon-triangle_up"
                      class="text-xl"
                    />
                  </button>
                  <button
                    @click="moveDownAndSave(page.containers, index)"
                    class="bg-gold"
                  >
                    <nuxt-icon
                      name="icon-triangle_down"
                      class="text-xl"
                    />
                  </button>
                </div>
                <div class="flex items-center bg-red pointer-events-auto">
                  <button @click="deleteContainer(page.containers, index)">
                    <nuxt-icon
                      name="icon-cross"
                      class="text-xl"
                    />
                  </button>
                </div>
              </div>
              <Container
                :container="container"
                :isFirst="index === 0"
              />
              <Adder
                @addBlock="addBlockContainer(index + 1)"
                @addComponent="addComponent(index + 1)"
                displayComponentOption
              />
            </div>
          </div>
        </div>
      </template>
  </main>
</template>
