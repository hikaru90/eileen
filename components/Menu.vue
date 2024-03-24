<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { pb } = usePocketbase();

  const records = await pb.collection("pages").getFullList(200 /* batch size */, {
    sort: "-created",
    expand: "subpages",
  });

  const state = reactive({
    menuIsOpen: false,
    hoverIndex: null,
    menuEntryCount: 0,
    top: 0,
  });

  const menuEntries = computed(() => {
    let entries = records.filter((record) => record.inMenu === true);
    entries.sort((a, b) => a.menuOrder - b.menuOrder);
    let i = 0;
    for (const entry of entries) {
      entry.delay = i * 100;
      i++;
      if (entry.subpages.length > 0) {
        for (const subpage of entry.expand.subpages) {
          subpage.delay = i * 100;
          i++;
        }
      }
    }
    state.menuEntryCount = i;
    return entries;
  });

  const toggleMenu = () => {
    console.log("toggle");
    state.menuIsOpen = !state.menuIsOpen;
  };

  const closeMenu = (slug) => {
    console.log("slug", slug);
    if (!slug) return;
    state.menuIsOpen = false;
  };

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    state.top = scrollTop;
  };

  onMounted(() => {
    if (process.client) {
      window.document.getElementById("content-container").addEventListener("scroll", handleScroll);
    }
  });
  onUnmounted(() => {
    if (process.client) {
      window.document
        .getElementById("content-container")
        .removeEventListener("scroll", handleScroll);
    }
  });
</script>

<template>
  <div>
    <div
      :class="[
        state.menuIsOpen
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'scale-110 opacity-0 pointer-events-none',
      ]"
      class="fixed z-30 bg-white top-0 left-0 w-full h-full transform transition-all select-none"
    >
      <div class="max-container w-full">
        <div class="flex items-center justify-between py-4 mb-10">
          <div class="font-heading text-lg text-coffee">
            <NuxtLink to="/"> Eileen George </NuxtLink>
          </div>

          <button
            aria-label="Menü öffnen"
            @click="toggleMenu"
            class="flex items-center justify-center rounded p-1"
          >
            <nuxt-icon name="icon-cross" class="text-3xl text-red" />
          </button>
        </div>

        <div class="flex flex-col items-start gap-6">
          <div class="flex flex-col items-start gap-4">
            <div
              v-for="(menuEntry, index) in menuEntries"
              v-show="menuEntry.inMenu"
              class="relative"
              @mouseleave="state.hoverIndex = null"
            >
              <NuxtLink
                @click="closeMenu(menuEntry.slug)"
                :to="menuEntry.slug === 'index' ? '/' : menuEntry.slug"
                :key="'menuEntry' + index"
                :style="[{ transitionDelay: `${menuEntry.delay}ms` }]"
                :class="[
                  { hidden: !menuEntry.slug },
                  state.menuIsOpen ? 'transition-all opacity-100' : 'opacity-0',
                ]"
                class="select-none flex items-center transition-all px-3 py-1 rounded duration-300"
              >
                <span>
                  {{ menuEntry.title }}
                </span>
              </NuxtLink>
              <!-- <nuxt-icon name="icon-triangle_up" class="block text-2xl -mb-3 text-white" /> -->
              <div class="flex flex-col gap-3">
                <NuxtLink
                  @click="closeMenu(menuEntry)"
                  v-for="(subpage, i) in menuEntry.expand.subpages"
                  :to="subpage.slug === 'index' ? '/' : subpage.slug"
                  :key="index + 'subpage' + i"
                  :style="[{ transitionDelay: `${subpage.delay}ms` }]"
                  :class="[state.menuIsOpen ? 'transition-all opacity-100' : 'opacity-0']"
                  class="whitespace-nowrap last:border-b-0 px-3 py-1 hover:bg-white hover:bg-opacity-5 rounded transition-all"
                >
                  <!-- <span class="opacity-20">
                    — 
                  </span> -->
                  {{ subpage.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <NuxtLink
            @click="closeMenu('buchen')"
            to="/buchen"
            :style="[{ transitionDelay: `${(state.menuEntryCount + 1) * 100}ms` }]"
            :class="[state.menuIsOpen ? 'transition-all opacity-100' : 'opacity-0']"
            class="border-2 border-gold rounded flex items-center px-3 py-2 duration-300"
          >
            <div class="font-bold">Buchen</div>
            <div
              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
            >
              <nuxt-icon name="icon-caret-right" class="text-sm text-coffee" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      :class="[
        state.top > 0 ? 'bg-white shadow-xl shadow-coffee/5' : 'shadow-sm',
        authStore.token ? 'absolute' : 'fixed',
      ]"
      class="top-0 left-0 w-full z-20 text-white transition duration-100"
    >
      <div class="max-container w-full">
        <div
          :class="[state.top > 0 ? 'py-4 lg:py-4' : 'py-4 lg:py-6']"
          class="flex items-center justify-between transition-all duration-150"
        >
          <div class="font-heading text-lg lg:text-2xl text-coffee">
            <NuxtLink to="/"> Eileen George </NuxtLink>
          </div>

          <div class="lg:hidden">
            <button
              aria-label="Menü öffnen"
              @click="toggleMenu"
              class="flex items-center justify-center rounded p-1"
            >
              <nuxt-icon name="icon-menu" class="text-2xl text-coffee" />
            </button>
          </div>
          <div class="hidden lg:flex items-center gap-4 text-coffee">
            <div
              v-for="(menuEntry, index) in menuEntries"
              v-show="menuEntry.inMenu"
              class="relative"
              @mouseleave="state.hoverIndex = null"
            >
              <NuxtLink
                :to="menuEntry.slug === 'index' ? '/' : menuEntry.slug"
                @mouseenter="state.hoverIndex = index"
                :key="'menuEntry' + index"
                class="flex select-none items-center transition-all px-3 py-1 rounded"
              >
                <div>
                  {{ menuEntry.title }}
                </div>
                <div v-if="menuEntry.subpages.length > 0" class="ml-1">
                  <nuxt-icon name="icon-triangle_down" />
                </div>
              </NuxtLink>
              <div
                :class="[
                  menuEntry.subpages.length > 0 && state.hoverIndex === index
                    ? 'select-auto opacity-100 bottom-0'
                    : 'select-none opacity-0 bottom-2',
                ]"
                class="absolute left-1 transform translate-y-full flex flex-col items-center -ml-3 transition-all"
              >
                <!-- <nuxt-icon name="icon-triangle_up" class="block text-2xl -mb-3 text-white" /> -->
                <div
                  class="bg-sand bg-opacity-100 flex flex-col rounded shadow-lg px-2 py-2 mt-3 gap-2"
                >
                  <NuxtLink
                    v-for="(subpage, i) in menuEntry.expand.subpages"
                    :to="subpage.slug === 'index' ? '/' : subpage.slug"
                    :key="index + 'subpage' + i"
                    class="whitespace-nowrap last:border-b-0 px-3 py-1 hover:bg-white hover:bg-opacity-5 rounded transition-all"
                  >
                    {{ subpage.title }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="hidden lg:block">
            <NuxtLink
              to="/buchen"
              class="bg-salmon rounded-full text-white flex items-center px-5 py-2 shadow-md shadow-coffee/10"
            >
              <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px" class="">Buchen</div>
              <!-- <div
                  class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
                >
                  <nuxt-icon name="icon-caret-right" class="text-sm text-coffee" />
                </div> -->
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
