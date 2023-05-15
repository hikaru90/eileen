<script setup lang="ts">
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: {
          heading: "Mein Angebot",
          slides: [
            {
              text: "Paartherapie",
              link: "/angebot/paarthreapie",
              icon: "icon-arrow_right",
              description: "Für ein gutes Miteinander und eine erfüllte Partnerschaft.",
              image: "solar_energy_a2mPxBJIkJ.jpg",
            },
          ],
        },
      },
    }
  );

  const state = reactive({
    donutSize: 0.15,
    timeout: 5000,
    currentSlide: 0,
    interval: undefined,
  });

  const getCurrentImageUrl = (filename) => {
    return `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`;
  };

  const startInterval = (startingSlide) => {
    if (startingSlide) state.currentSlide = startingSlide;
    state.interval = setInterval(() => {
      state.currentSlide = (state.currentSlide + 1) % props.component.content.slides.length;
    }, state.timeout);
  };
  const stopInterval = () => {
    clearInterval(state.interval);
  };

  onMounted(() => {
    startInterval();
  });
  onUnmounted(() => {
    stopInterval();
  });
</script>

<template>
  <div class="max-container">
    <div class="mb-24">
      <div class="flex items-center justify-center">
        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-10">
          {{ props.component.content.heading }}
        </h2>
      </div>
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="h-40 lg:h-auto mb-10 relative w-full lg:w-1/2 lg:mr-10 bg-cover">
          <div
            v-for="(slide, index) in props.component.content.slides"
            :key="'image' + index"
            :style="[
              { backgroundImage: `url(${getCurrentImageUrl(slide.image)})` },
              {
                animation:
                  index === state.currentSlide
                    ? `fadeInOut ${state.timeout}ms forwards infinite`
                    : '',
              },
            ]"
            class="absolute top-0 left-0 w-full h-full ease-in rounded-md opacity-0"
          ></div>
        </div>
        <div class="lg:w-1/2">
          <div
            v-for="(slide, index) in props.component.content.slides"
            :key="'slide' + index"
            class="slide flex items-start gap-4 transition-opacity delay-300 relative -ml-2 lg:ml-0"
            :class="[index === state.currentSlide ? 'opacity-100' : 'opacity-60']"
          >
            <div
              class="w-5 h-5 lg:w-6 lg:h-6 mt-1px flex-shrink-0 rounded-full flex items-center justify-center"
            >
              <div class="w-full my-0 mx-auto transform -rotate-90">
                <svg viewBox="0 0 40 40" class="donut w-full h-full">
                  <circle class="transform-center fill-gold" cx="20" cy="20" r="12"></circle>
                  <circle
                    :style="[
                      {
                        animation:
                          index === state.currentSlide
                            ? `donut1 ${state.timeout}ms forwards infinite`
                            : '',
                      },
                    ]"
                    class="transform-center stroke-gold"
                    cx="20"
                    cy="20"
                    r="15"
                    fill="transparent"
                    stroke-width="10"
                    stroke-dasharray="0 94.2"
                    stroke-dashoffset="0"
                  ></circle>
                </svg>
              </div>
            </div>
            <div
              style="width: 1px"
              class="connector h-full absolute top-1 left-[9px] lg:left-3 bg-gold mb-1"
            ></div>
            <div>
              <a :href="slide.link" class="flex items-center gap-2 mb-2">
                <h3 class="font-bold lg:text-lg">
                  {{ slide.text }}
                </h3>
                <div
                  class="w-4 h-4 bg-black rounded-full flex items-center justify-center text-gold"
                >
                  <nuxt-icon :name="slide.icon" class="text-md" />
                </div>
              </a>
              <p class="mb-8">
                {{ slide.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .slide:last-child {
    .connector {
      display: none;
    }
  }
</style>
