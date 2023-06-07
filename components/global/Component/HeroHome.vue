<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "heroHome").content,
      },
    }
  );

  const state = reactive({});

  const getCurrentImageUrl = (filename) => {
    return `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`;
  };

  onMounted(() => {});
  onUnmounted(() => {});
</script>

<template>
  <div class="h-[400px] lg:h-[900px] relative text-white overflow-visible">
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-start">
        <div class="mt-10 sm:ml-10 md:ml-20">
          <h2
            style="max-width: 15em"
            class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10"
          >
            {{ props.component.content.heading }}
          </h2>
          <NuxtLink
            :to="props.component.content.cta.link"
            :title="props.component.content.cta.text"
            class="inline-flex items-center border-2 border-gold rounded text-offwhite px-4 py-3"
          >
            <div style="text-shadow: rgba(0,0,0,0.8) 0 0 40px;">
              {{ props.component.content.cta.text }}
            </div>
            <div
              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
            >
              <nuxt-icon :name="props.component.content.cta.icon" class="text-sm text-black" />
            </div>
          </NuxtLink>
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
        class="w-full h-full bg-cover bg-[60%] lg:bg-bottom"
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
