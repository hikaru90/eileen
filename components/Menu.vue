<script setup lang="ts">
  const { pb } = usePocketbase();

  const records = await pb.collection("pages").getFullList(200 /* batch size */, {
    sort: "-created",
  });
</script>

<template>
  <div class="bg-white shadow-xl">
    <div class="max-container w-full">
      <div class="flex items-center justify-between py-6">
        <div>
          <NuxtLink
            to="/">
            Logo
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <NuxtLink
            :to="menuEntry.slug"
            v-for="(menuEntry, index) in records"
            :key="'menuEntry' + index"
            class="font-bold"
          >
            {{ menuEntry.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
