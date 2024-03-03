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
  <div :class="[{ '-mt-24': props.isFirst }]" class="relative text-white overflow-visible">
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center py-16 md:pt-32 md:pb-24">
        <div class="mt-10">
          <h2
            class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-coffee"
          >
            {{ props.component.content.heading }}
          </h2>
          <p class="text-coffee text-center max-w-[44rem]">
            {{ props.component.content.text }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="w-32 h-32 md:w-52 md:h-52 absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl shadow-coffee/30"
    >
      <div
        style="
          background-image: radial-gradient(
            circle,
            rgb(250, 244, 216) 0%,
            #fbf9f7 60%,
            #f9f3ec 100%
          );
          mix-blend-mode: multiply;
        "
        class="w-full h-full opacity-20 absolute"
      ></div>
      <div
        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"
        class="-left-[1px] -right-[1px] -top-[1px] -bottom-[1px] bg-cover bg-center absolute"
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
