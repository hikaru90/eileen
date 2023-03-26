<script setup lang="ts">
  const {pb} = usePocketbase()

  const route = useRoute();
  const slug = route.params.slug;

  console.log("slug");
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
    <DebugPane :content="content" @refresh="refresh" />

    <h1>{{ content?.title }}</h1>
  </main>
</template>
