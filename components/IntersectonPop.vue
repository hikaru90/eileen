<script setup lang="ts">
  import { waitForDOM } from "~/lib/helpers";

  const element = ref(null);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  };

  
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animation");
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);

  const addListener = () => {
    const watchedElement = element.value.querySelector(".shiny-pop");
    if(watchedElement){
      observer.observe(watchedElement);
    }
  }

  onMounted(() => {
    waitForDOM("watchedElement",addListener)
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<template>
  <div ref="element" id="watchedElement">
    <slot />
  </div>
</template>
