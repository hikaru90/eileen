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
  <div :class="[{ '-mt-24': props.isFirst}]" class="h-[400px] lg:h-[600px] relative text-white overflow-visible">
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center">
        <div class="mt-10 ">
          <h2
            style="max-width: 15em; text-shadow: rgba(0,0,0,0.8) 0 0 80px;"
            class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10 border-2 border-gold px-5 py-3 rounded text-center"
          >
            {{ props.component.content.heading }}
          </h2>
        </div>
      </div>
    </div>
    <div class="w-full h-full absolute top-0 left-0">
      <div
        style="
          background-image: radial-gradient(
            circle,
            rgba(2, 55, 41, 1) 0%,
            rgba(0, 31, 31, 1) 60%,
            rgba(53, 65, 30, 1) 100%
          );
          mix-blend-mode: multiply;
        "
        class="w-full h-full opacity-20 absolute"
      ></div>
      <div
        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"
        class="w-full h-full bg-cover bg-[60%] lg:bg-center"
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
