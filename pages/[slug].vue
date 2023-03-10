<script setup lang="ts">
  import PocketBase from 'pocketbase';
  const pb = new PocketBase('http://164.90.227.97');

  const route = useRoute();
  const slug = route.params.slug

  console.log('slug');

  const { pending, data: content } = await useAsyncData('count', () => pb.collection('pages').getFirstListItem(`slug="${slug}"`))
  const refresh = () => refreshNuxtData('count')
</script>

<template>
  <div>
    {{ pending ? 'Loading' : content }}
  </div>
  <button @click="refresh">Refresh</button>
</template>