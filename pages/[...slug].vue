<script setup lang="ts">
  import { useContentStore } from "~/store/content";
  import { useSidebarStore } from "~~/store/sidebar";
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "~/store/auth";
  import EventBus from "~/plugins/mitt";
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
  !slug ? "index" : slug;

  definePageMeta({
    layout: "sidebar",
  });

  const state = reactive({
    storePending: true,
    currentContainer: null,
  });

  const { pending, data: pageContent } = await useAsyncData("pageContent", () =>
    pb.collection("pages").getFirstListItem(`slug="${slug}"`, {
      expand: "containers.block,containers.component",
    })
  );
  state.storePending = false;

  EventBus.on("refresh", () => {
    console.log("content saved");
    state.storePending = true;
    refresh();
  });

  const refresh = async () => {
    await setTimeout(async () => {
      await refreshNuxtData("pageContent");
      setPage(pageContent.value);
    }, 400);
    state.storePending = false;
  };

  const moveUpAndSave = (array, index) => {
    moveUp(array, index);
    savePage();
  };
  const moveDownAndSave = (array, index) => {
    moveDown(array, index);
    savePage();
  };

  const currentContainerAuth = computed(() => {
    if (authStore.token) {
      return state.currentContainer;
    }
    return null;
  });

  const isSelected = (container) => {
    const id = container.expand.block?.id || container.expand.component?.id
    if (componentId.value === id) return true;
    return false;
  };

  onMounted(() => {
    setPage(pageContent.value);
  });
</script>

<template>
  <main>
    <div v-if="state.storePending">pending</div>
    <div v-else>
      <DebugPane v-if="contentStore.debugVisible" :content="page" @refresh="refresh" />

      <div class="">
        <div class="py-10">
          <!-- <h1>{{ page?.title }}</h1> -->
          <!-- {{ content }} -->
          <div
            @mouseenter="state.currentContainer = index"
            @mouseleave="state.currentContainer = null"
            v-if="page.expand"
            v-for="(container, index) in page.expand.containers"
            :key="container.id"
            :class="[
              { 'hover:shadow-edit': authStore.token && currentContainerAuth },
              { 'cursor-cell': authStore.token },
              { 'shadow-edit': isSelected(container) },
            ]"
            class="relative"
          >
            <div v-show="currentContainerAuth === index" class="absolute bg-gold">
              <div class="flex items-center">
                <button @click="moveUpAndSave(page.containers, index)">
                  <nuxt-icon name="icon-triangle_up" class="text-xl" />
                </button>
                <button @click="moveDownAndSave(page.containers, index)">
                  <nuxt-icon name="icon-triangle_down" class="text-xl" />
                </button>
              </div>
            </div>
            <Container :container="container" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
