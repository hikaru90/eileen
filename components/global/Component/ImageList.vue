<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "imageList").content,
      },
    }
  );

  const state = reactive({});

  const currentImageUrl = computed(() => {
    return `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${props.component.content.image}`;
  });
</script>

<template>
  <div class="mb-36 mt-24">
    <div class="max-container">
      <div class="flex items-center justify-center">
        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-20">
          {{ props.component.content.heading }}
        </h2>
      </div>
      <div class="flex flex-col lg:flex-row lg:items-stretch justify-center">
        <div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0">
          <div
            :style="[{ backgroundImage: `url(${currentImageUrl})` }]"
            class="h-60 lg:h-full lg:w-[500px] lg:mr-10 relative bg-cover bg-center rounded"
          ></div>
        </div>
        <div class="w-full lg:w-1/2">
          <div class="">
            <div
              v-for="(item, index) in props.component.content.list"
              :key="'slide' + index"
              class="slide flex items-start gap-4 transition-opacity delay-300 relative -ml-2 lg:ml-0"
            >
              <div
                style="width: 1px"
                class="connector h-full absolute top-2 left-[7px] bg-gold mb-1 -z-10"
              ></div>
              <div class="slideParagraph mb-6 flex">
                <div class="w-4 h-4 bg-gold rounded-full flex-shrink-0"></div>
                <div class="ml-4 -mt-[5px]">
                  <h3 class="inline-block bg-gold rounded px-2 mb-[5px] text-sm">
                    {{ item.type }}
                  </h3>
                  <div class="">
                    {{ item.place }}
                  </div>
                  <div class="font-bold">
                    {{ item.name }}
                  </div>
                </div>
              </div>
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
    .slideParagraph {
      @apply mb-0;
    }
  }
</style>
