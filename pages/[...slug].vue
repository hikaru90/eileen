<script setup lang="ts">
  import { useContentStore } from "~/store/content";
  import { useSidebarStore } from "~~/store/sidebar";
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);

  const sidebarStore = useSidebarStore();
  const contentStore = useContentStore();
  const { pb } = usePocketbase();
  const route = useRoute();
  let slug = route.params.slug;
  !slug ? "index" : slug;

  definePageMeta({
    layout: "sidebar",
  });

  const state = reactive({
    storePending: true,
  });

  const { pending, data: content } = await useAsyncData("count", () =>
    pb.collection("pages").getFirstListItem(`slug="${slug}"`, {
      expand: "containers.block,containers.component",
    })
  );
  state.storePending = false;

  sidebarStore.$subscribe((mutation, state) => {
    console.log("refresh");
    state.storePending = true;
    refresh();
  });

  const editMode = computed(() => {
    if (token) return true;
    return false;
  });

  const refresh = async () => {
    await setTimeout(async () => {
      await refreshNuxtData("count");
    }, 200);
    state.storePending = false;
  };
</script>

<template>
  <main>
    <div v-if="state.storePending">pending</div>
    <div v-else>
      <DebugPane v-if="contentStore.debugVisible" :content="content" @refresh="refresh" />

      <div class="max-container">
        <div class="py-10">
          <h1>{{ content?.title }}</h1>

          {{ content }}
          <div
            v-for="container in content?.expand.containers"
            :key="container.id"
            :class="[{ 'hover:shadow-edit cursor-pointer': editMode }]"
            class=""
          >
            <Container :container="container" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
