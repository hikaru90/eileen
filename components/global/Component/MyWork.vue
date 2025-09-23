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
      content: defaults.find((el) => el.type === "portraitText").content,
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

onMounted(() => { });
onUnmounted(() => { });
</script>

<template>
  <div
    :class="[{ '-mt-24': props.isFirst }]"
    class="relative text-white overflow-visible"
  >
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center py-16 md:py-24 w-full">
        <div class="mt-10 w-full">
          <IntersectonPop>
            <h2 class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon">
              {{ props.component.content.heading }}
            </h2>
          </IntersectonPop>

          <div class="flex-grow flex w-full">
            <div
              class="flex-grow flex items-stretch justify-center flex-col lg:flex-row gap-16 lg:items-start relative"
            >
              <div class="max-w-[36rem]">
                <p
                  class="markdown text-coffee"
                  v-html="$mdRenderer.set({ html: true }).render(props.component.content.text)"
                >
                </p>
                <NuxtLink
                  :to="props.component.content.cta.link"
                  class="inline-flex border border-salmon rounded-full text-coffee items-center px-5 py-2 shadow-md mt-3"
                > {{ props.component.content.cta.text }} </NuxtLink>
              </div>
              <div class="relative h-full bg-contain bg-left bg-no-repeat aspect-[0.7]">
                <div :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]" class="h-full w-full bg-cover bg-center rounded-lg shadow-2xl shadow-coffee/30">
                </div>
                <!-- <img
                  :src=""
                  alt="Eileen George"
                  class="h-full max-h-[550px] rounded-lg shadow-2xl shadow-coffee/30 -order-1 lg:order-1 flex-shrink-0"
                > -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.markdown {
  p {
    @apply mb-4;
  }
}
</style>
