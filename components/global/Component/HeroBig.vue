<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
      isFirst?: boolean;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "heroBig").content,
      },
      isFirst: false,
    }
  );

  const state = reactive({});

  const getCurrentImageUrl = (filename) => {
    const img = useImage();
    const imgUrl = img(
      `${config.public.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,
      {
        format: "webp",
      }
    );
    return imgUrl;
  };

  onMounted(() => {});
  onUnmounted(() => {});
</script>

<template>
  <div
    :class="[{ '-mt-24': props.isFirst }]"
    class="h-dvh lg:h-[900px] relative bg-[#F6F4F2] text-white overflow-visible"
  >
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center">
        <div class="mt-10">
          <IntersectonPop>
          <h2
            style="max-width: 15em"
            class="shiny-pop text-salmon font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"
            v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"
          >
          </h2>
        </IntersectonPop>
          <p class="text-coffee uppercase text-center text-xs sm:text-lg" v-html="$mdRenderer.set({ html: true }).render(props.component.content.subline)"></p>
          <!-- <NuxtLink
            :to="props.component.content.cta.link"
            :title="props.component.content.cta.text"
            class="inline-flex items-center border-2 border-gold rounded text-offwhite px-4 py-3"
          >
            <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px">
              {{ props.component.content.cta.text }}
            </div>
            <div
              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
            >
              <nuxt-icon :name="props.component.content.cta.icon" class="text-sm text-coffee" />
            </div>
          </NuxtLink> -->
        </div>
      </div>
    </div>
    <div class="w-full h-full absolute top-0 left-0 z-0">
      <div
        style="
          background-image: radial-gradient(
            circle at center,
            transparent 0%,
            #ffffff 100%
          );
          
        "
        class="w-full h-full opacity-100 absolute z-10"
      ></div>
      <div
        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"
        class="w-full h-full bg-cover bg-center opacity-80"
      ></div>
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
