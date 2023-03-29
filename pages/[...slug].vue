<script setup lang="ts">
  import { useContentStore } from "~/store/content";
  const contentStore = useContentStore();
  const {pb} = usePocketbase()
  const route = useRoute();
  let slug = route.params.slug;
  !slug ? 'index' : slug

  const { pending, data: content } = await useAsyncData("count", () =>
    pb.collection("pages").getFirstListItem(`slug="${slug}"`, {
      expand: "blocks",
    })
  );
  const refresh = () => {
    refreshNuxtData("count");
  }
</script>

<template>
  <main>
    <DebugPane v-if="contentStore.debugVisible" :content="content" @refresh="refresh" />

    <div class="max-container">
      <div class="py-10">

        <h1>{{ content?.title }}</h1>
        
        <BlockRenderer :blocks="content?.expand.blocks" />
      </div>      
    </div>
  </main>
</template>
