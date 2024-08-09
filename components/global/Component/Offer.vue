<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "offer").content,
      },
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

</script>

<template>
  <div class="py-16 md:py-24 relative">
    <div
      style="
        background-image: radial-gradient(
          circle,
          #FAF1DF 0%,
          transparent 60%
        );
      "
      class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2"
    ></div>
    <div class="max-container">
      <div class="flex items-center justify-center">
        <IntersectonPop>
        <h2
          class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"
        >
          {{ props.component.content.heading }}
        </h2>
      </IntersectonPop>
      </div>

      <div class="flex flex-col md:flex-row itmes-stretch justify-center gap-16 relative">
        <div
          v-for="(offer, index) in props.component.content.offers"
          :key="'slide' + index"
          class="w-full md:w-1/2 md:max-w-[390px] shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden border border-coffee border-opacity-10"
        >
          <div :style="[{ backgroundImage: `url(${getCurrentImageUrl(offer.image)})` }]" class="w-full h-52 bg-cover">

          </div>

          <div class="bg-white px-10 py-12 h-full">
            <h3 class="font-heading text-xl mb-1.5">
              {{ offer.name }}
            </h3>
            <div class=" mb-2">
              {{ offer.type }}
            </div>

            <div class="border border-coffee border-opacity-20 rounded-full inline-flex items-center text-xs px-2 gap-1 mb-10 -ml-0.5">
              <nuxt-icon name="icon-camera" class="text-xs text-green opacity-80" /> online verfügbar
            </div>

            <div class="min-h-[60px] mb-10">
              {{ offer.description }}
            </div>

            <div class="flex items-end gap-4 mb-6">
              <div class="text-2xl">
                {{ offer.price }} €
              </div>
              <div class="mb-[2px]">
                {{ offer.duration }}
              </div>
            </div>

            <NuxtLink v-if="offer.name === 'Find Your Way Home'"
                :to="`mailto:kontakt@eileengeorge.de?subject=Auf Warteliste eintragen - ${offer.name}`"
                class="bg-salmon rounded-full text-white inline-flex items-center px-5 py-2 shadow-md"
              >
                <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px" class="">
                  Auf Warteliste eintragen
                </div>
              </NuxtLink>
              <NuxtLink v-else
                :to="`mailto:kontakt@eileengeorge.de?subject=Terminvereinbarung - ${offer.name}`"
                class="bg-salmon rounded-full text-white inline-flex items-center px-5 py-2 shadow-md"
              >
                <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px" class="">
                  Termin vereinbaren
                </div>
              </NuxtLink>
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
