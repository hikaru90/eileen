<script setup lang="ts">
  const state = reactive({
    threshold: 500,
    visible: false,
  });

  const handleScroll = (event) => {
    const scrollPosition = document.querySelector("#content-container").scrollTop;
    if (scrollPosition > state.threshold) state.visible = true;
    else state.visible = false;
  };

  const scrollToTop = () => {
    if (process.client) {
      document.querySelector("#content-container").scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  onMounted(() => {
    if (process.client) {
      document.querySelector("#content-container").addEventListener("scroll", handleScroll);
    }
  });

  onBeforeUnmount(() => {
    if (process.client) {
      document.querySelector("#content-container").removeEventListener("scroll", handleScroll);
    }
  });
</script>

<template>
  <button
    @click="scrollToTop"
    :class="[state.visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"
    class="fixed bottom-4 md:bottom-6 right-5 md:right-10 flex items-center justify-center rounded-full shadow-xl bg-white p-2 md:p-4 border border-grey border-opacity-10 transition duration-500"
  >
    <!-- <div class="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-b from-gold via-lightGold to-darkGold"> -->
    <nuxt-icon name="icon-arrow_up" class="text-xl text-darkGrey" />
    <!-- </div> -->
  </button>
</template>
