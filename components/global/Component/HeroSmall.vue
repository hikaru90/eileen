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
        content: defaults.find((el) => el.type === "heroSmall").content,
      },
      isFirst: false,
    }
  );

  const state = reactive({});

  const getCurrentImageUrl = (filename) => {
    const img = useImage();
    const imgUrl = img(
      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,
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
  <div :class="[{ '-mt-24': props.isFirst}]" class="h-[300px] lg:h-[400px] relative text-white overflow-visible">
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center">
        <div class="mt-10 mb-10">
          <h2
            style="max-width: 15em"
            class="text-coffee font-heading text-2xl sm:text-5xl md:text-5xl lg:text-6xl  text-center"
            v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"
          >
          </h2>
          <div v-if="props.component.content.subline" class="text-coffee uppercase text-center text-xs sm:text-lg mt-6">
            {{ props.component.content.subline }}
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
