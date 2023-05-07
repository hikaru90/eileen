<script setup lang="ts">
  import { useContentStore } from "~/store/content";
  import { useSidebarStore } from "~~/store/sidebar";

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
    storePending: true
  })

  const { pending, data: content } = await useAsyncData("count", () =>
    pb.collection("pages").getFirstListItem(`slug="${slug}"`, {
      expand: "blocks",
    })
  );
  state.storePending = false

  sidebarStore.$subscribe((mutation, state) => {
    console.log('refresh');
    state.storePending = true
    refresh()
  })


  const refresh = async () => {
    await setTimeout(async() => {
      await refreshNuxtData("count");
    }, 200);
    state.storePending = false
  };
</script>

<template>
  <main>
    <div v-if="state.storePending">
      pending
    </div>
    <div v-else>
      <DebugPane v-if="contentStore.debugVisible" :content="content" @refresh="refresh" />
      
      <div class="max-container">
        <div class="py-10">
          <h1>{{ content?.title }}</h1>
          
          <Container :blocks="content?.expand.blocks" />
        </div>
      </div>
    </div>
  </main>
</template>
