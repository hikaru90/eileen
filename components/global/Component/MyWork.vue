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
      <div class="h-full flex items-center justify-center py-16 md:py-24">
        <div class="mt-10">
          <h2
            class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"
          >
            {{ props.component.content.heading }}
          </h2>

          <div class="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
            <p class="markdown text-coffee max-w-[44rem]" v-html="$mdRenderer.set({ html: true }).render(props.component.content.text)">
            </p>
            <img :src="getCurrentImageUrl(props.component.content.image)" alt="Eileen George" class="w-full md:max-w-[300px] rounded-lg shadow-2xl -order-1 lg:order-1 flex-shrink-0">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .markdown{
    p{
      @apply mb-4;
    }
  }
</style>
