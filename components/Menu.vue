<script setup lang="ts">
  const { pb } = usePocketbase();

  const records = await pb.collection("pages").getFullList(200 /* batch size */, {
    sort: "-created",
  });
</script>

<template>
  <div class="bg-white shadow">
    <div class="max-container w-full">
      <div class="flex items-center justify-between py-6">
        <div class="font-heading text-2xl">
          <NuxtLink to="/"> Dimple Goertz </NuxtLink>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-6">
            <NuxtLink
              :to="menuEntry.slug"
              v-for="(menuEntry, index) in records"
              v-show="menuEntry.inMenu"
              :key="'menuEntry' + index"
              class="font-bold"
            >
              {{ menuEntry.title }}
            </NuxtLink>
          </div>
          <NuxtLink
            to="/buchen"
            class="border-2 border-gold rounded text-offwhite flex items-center bg-white px-3 py-2"
          >
              <div class="text-black font-bold">Jetzt Termin buchen</div>
              <div class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4">
                <nuxt-icon name="icon-caret-right" class="text-sm text-black" />
              </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
