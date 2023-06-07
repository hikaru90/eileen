<script setup lang="ts">
  const { pb } = usePocketbase();

  const records = await pb.collection("pages").getFullList(200 /* batch size */, {
    sort: "-created",
  });

  const state = reactive({
    menuIsOpen: false,
  });

  const toggleMenu = () => {
    console.log("toggle");
    state.menuIsOpen = !state.menuIsOpen;
  };
</script>

<template>
  <div>
    <div :class="[ state.menuIsOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'scale-110 opacity-0 pointer-events-none']" class="fixed z-30 bg-white top-0 left-0 w-full h-full transform transition-all select-none">
      <div class="max-container w-full">
        <div class="flex items-center justify-between py-6 mb-10">
          <div class="font-heading text-2xl">
            <NuxtLink to="/"> Dimple Goertz </NuxtLink>
          </div>

          <button @click="toggleMenu" class="flex items-center justify-center rounded p-1">
            <nuxt-icon name="icon-cross" class="text-3xl text-red" />
          </button>
        </div>

        <div class="flex flex-col items-start gap-6">
              <div class="flex flex-col items-start gap-6">
                <NuxtLink
                  :to="menuEntry.slug === 'index' ? '/' : menuEntry.slug"
                  v-for="(menuEntry, index) in records"
                  v-show="menuEntry.inMenu"
                  :key="'menuEntry' + index"
                  :style="[{ transitionDelay: `${index*100}ms` }]"
                  :class="[ state.menuIsOpen ? 'transition-all opacity-100' : 'opacity-0']"
                  class="font-bold duration-300"
                >
                  {{ menuEntry.title }}
                </NuxtLink>
              </div>
              <NuxtLink
                to="/buchen"
                :style="[{ transitionDelay: `${(records.length+1)*100}ms` }]"
                :class="[ state.menuIsOpen ? 'transition-all opacity-100' : 'opacity-0']"
                class="border-2 border-gold rounded flex items-center px-3 py-2 duration-300"
              >
                <div class="font-bold">Jetzt Termin buchen</div>
                <div
                  class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
                >
                  <nuxt-icon name="icon-caret-right" class="text-sm text-black" />
                </div>
              </NuxtLink>
            </div>
      </div>
    </div>

    <div class="absolute top-0 left-0 w-full shadow z-20 text-white">
      <div class="max-container w-full">
        <div class="flex items-center justify-between py-6">
          <div class="font-heading text-2xl">
            <NuxtLink to="/"> Dimple Goertz </NuxtLink>
          </div>

          <div class="lg:hidden">
            <button @click="toggleMenu" class="flex items-center justify-center rounded p-1">
              <nuxt-icon name="icon-menu" class="text-2xl text-white" />
            </button>
          </div>
          <div class="hidden lg:block">
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-6">
                <NuxtLink
                  :to="menuEntry.slug === 'index' ? '/' : menuEntry.slug"
                  v-for="(menuEntry, index) in records"
                  v-show="menuEntry.inMenu"
                  :key="'menuEntry' + index"
                  class=""
                >
                  {{ menuEntry.title }}
                </NuxtLink>
              </div>
              <NuxtLink
                to="/buchen"
                class="border-2 border-gold rounded flex items-center px-3 py-2"
              >
                <div style="text-shadow: rgba(0,0,0,0.8) 0 0 40px;" class="">Jetzt Termin buchen</div>
                <div
                  class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
                >
                  <nuxt-icon name="icon-caret-right" class="text-sm text-black" />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
