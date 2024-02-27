<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "offer").content,
      },
    }
  );

  const state = reactive({
    vw: 0,
    sizes: [
      { width: 1024, count: 3 },
      { width: 768, count: 2 },
      { width: 0, count: 1 },
    ],
    currentSlide: 0,
    startX: 0,
    isTracking: false,
    flickedLeft: false,
    flickedRight: false,
  });

  const visibleSlideCount = computed(() => {
    return state.sizes.find((size) => state.vw > size.width)?.count;
  });

  const visibleSlides = computed(() => {
    let res = [];
    for (let i = 0; i < visibleSlideCount.value; i++) {
      res.push(state.currentSlide + i);
    }
    return res;
  });

  const slideTranslation = computed(() => {
    if (process.client) {
      const singleTranslationWidth =
        ((-state.currentSlide * 1) / visibleSlideCount.value) *
          window.document.getElementById("carousel")?.clientWidth || 0;
      return singleTranslationWidth;
    }
  });

  const prev = () => {
    if (state.currentSlide > 0) state.currentSlide--;
  };
  const next = () => {
    if (state.currentSlide + visibleSlideCount.value < props.component.content.testimonials.length)
      state.currentSlide++;
  };

  const startTracking = (event) => {
    state.isTracking = true;
    state.startX = event.clientX;
  };

  const trackMovement = (event) => {
    if (state.isTracking) {
      const deltaX = event.clientX - state.startX;
      if (deltaX > 0) {
        state.flickedRight = true;
        state.flickedLeft = false;
      } else if (deltaX < 0) {
        state.flickedLeft = true;
        state.flickedRight = false;
      }
    }
  };

  const stopTracking = () => {
    state.isTracking = false;
    console.log("flickedLeft", state.flickedLeft);
    if (state.flickedLeft) next();
    if (state.flickedRight) prev();
  };

  const handleResize = () => {
    state.vw = window.innerWidth;
  };
  onMounted(() => {
    if (process.client) state.vw = window.innerWidth;
    window.addEventListener("resize", handleResize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
</script>

<template>
  <div class="py-16 md:py-24 relative">
    <div class="max-container">
      <div class="flex items-center justify-center">
        <h2
          class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"
        >
          {{ props.component.content.heading }}
        </h2>
      </div>

      <div
        id="carousel"
        @mousedown="startTracking"
        @mousemove="trackMovement"
        @mouseup="stopTracking"
        @touchstart="startTracking"
        @touchmove="trackMovement"
        @touchend="stopTracking"
        @touchcancel="stopTracking"
        :style="[{ transform: `translate(${slideTranslation}px,0)` }]"
        class="flex flex-row itmes-stretch justify-start relative w-full transition duration-300 select-none cursor-grab"
      >
        <div
          v-for="(offer, index) in props.component.content.testimonials"
          :key="'slide' + index"
          :class="[
            `slide${index}`,
            visibleSlideCount > 1 ? `w-1/${visibleSlideCount}` : 'w-full',
            slideTranslation,
            visibleSlides.includes(index) ? 'opacity-100' : 'opacity-0',
          ]"
          class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-6 transition"
        >
          <div
            :class="[
              visibleSlides.includes(index)
                ? 'shadow-2xl shadow-coffee/20 scale-100'
                : 'shadow-sm shadow-coffee/20 scale-80',
            ]"
            class="bg-white px-8 pt-8 pb-12 h-full rounded-lg overflow-hidden transition-all duration-300 delay-100 transform"
          >
            <div class="flex items-center gap-1 justify-between mb-8">
              <h3 class="font-heading text-xl mb-1.5">
                {{ offer.name }}
              </h3>
              <div class="border-b border-coffee border-opacity-30 flex-grow"></div>
              <div class="">
                {{ new Date(offer.date).getFullYear() }}
              </div>
            </div>

            <div class="">
              {{ offer.text }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-1px mr-6 mt-10 rounded-full">
        <button
          @click="prev"
          class="py-1 pl-1.5 pr-2.5 bg-coffee border-r border-orange border-opacity-30 text-white rounded-l-full hover:bg-opacity-90 transition shadow-md shadow-coffee/20"
        >
          <nuxt-icon name="icon-caret-left" class="text-2xl" />
        </button>
        <button
          @click="next"
          class="py-1 pr-1.5 pl-2.5 bg-coffee border-r border-orange border-opacity-30 text-white rounded-r-full hover:bg-opacity-90 transition shadow-md shadow-coffee/20"
        >
          <nuxt-icon name="icon-caret-right" class="text-2xl" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .slide:last-child {
    .connector {
      display: none;
    }
    .slideParagraph {
      @apply mb-0;
    }
  }
</style>
