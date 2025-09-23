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
      content: defaults.find((el) => el.type === "heroSmallExtended").content,
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
    class="relative text-white overflow-visible pt-32 pb-24"
  >
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center">
        <div class="my-10">
          <IntersectonPop>
            <h2
              style="max-width: 15em"
              class="shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-5xl lg:text-6xl  text-center"
              v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"
            >
            </h2>
          </IntersectonPop>
          <div
            v-if="props.component.content.subline"
            class="text-coffee uppercase text-center text-xs sm:text-lg mt-6 max-w-[27em]"
          >
            {{ props.component.content.subline }}
          </div>



          <div class="flex items-center justify-center gap-4 mt-24">
            <div
              v-if="props.component.content.date"
              class="text-coffee flex items-center justify-center opacity-80 gap-1 bg-white rounded-lg px-2 py-1"
            >
              <nuxt-icon
                name="icon-info"
                class="text-grey-800 opacity-80"
              />
              <span class="text-base sm:text-base">
                {{ props.component.content.date }}
              </span>
            </div>
            <div
              v-if="props.component.content.subline2"
              class="text-coffee text-center text-xs sm:text-base opacity-80 bg-white rounded-lg px-2 py-1 flex items-center gap-2"
            >
              <!-- <nuxt-icon name="icon-camera" class="text-xs text-green-600 opacity-80" /> -->
              {{ props.component.content.subline2 }}
            </div>
          </div>
          <div
            v-if="props.component.content.linkTitle && props.component.content.linkTarget"
            class="mt-8 text-center"
          >
            <NuxtLink
              :to="props.component.content.linkTarget"
              class="inline-flex items-center gap-2 bg-salmon text-white px-6 py-3 rounded-full hover:bg-salmon/90 transition-colors"
            >
              {{ props.component.content.linkTitle }}
              <nuxt-icon
                name="icon-arrow_down"
                class="text-lg"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full absolute top-0 left-0">
      <div
        style="
          background-image: radial-gradient(
            circle,
            rgb(250, 244, 216) 0%,
            #FBF9F7 60%,
            #f9f3ec 100%
          );
          mix-blend-mode: multiply;
        "
        class="w-full h-full opacity-20 absolute"
      ></div>
      <div
        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"
        class="w-full h-full bg-cover bg-center opacity-70"
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