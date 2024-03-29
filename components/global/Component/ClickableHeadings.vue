<script setup lang="ts">
  import defaults from "~/lib/defaults";
  import { waitForDOM } from "~/lib/helpers";
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

  const state = reactive({
    selectedIndex: 0,
    enrichedBlocks: [],
  });

  const getHeightFromWidthAndTextWidth = (text) => {
    if (process.client) {
      try {
        const tempDiv = document.createElement("div");
        tempDiv.style.visibility = "hidden";
        tempDiv.innerText = text;
        document.getElementById("text-container").appendChild(tempDiv);
        const height = tempDiv.offsetHeight;
        document.getElementById("text-container").removeChild(tempDiv);

        return height;
      } catch (err) {
        console.log("err", err);
        return 0;
      }
    }
  };

  const enrichBlocks = () => {
    const array = JSON.parse(JSON.stringify(props.component.content.blocks));
    const enriched = array.map((block) => {
      return {
        heading: block.heading,
        text: block.text,
        height: getHeightFromWidthAndTextWidth(block.text),
      };
    });
    state.enrichedBlocks = enriched;
  };

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

  onMounted(async () => {
    waitForDOM("text-container", enrichBlocks);

    // getHeightFromWidthAndTextWidth(JSON.parse(JSON.stringify(props.component.content.blocks))[0].text)
  });
  onUnmounted(() => {});
</script>

<template>
  <div :class="[{ '-mt-24': props.isFirst }]" class="relative overflow-visible">
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="my-20">
          <!-- mobile -->
          <div
            v-for="(block, index) in props.component.content.blocks"
            :key="'block' + index"
            class="lg:hidden"
          >
            <IntersectonPop>
              <div class="shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-2xl mb-6">
                {{ block.heading }}
              </div>
            </IntersectonPop>
            <p
              class="markdown mb-10"
              v-html="$mdRenderer.set({ html: true }).render(block.text)"
            ></p>
          </div>

          <!-- desktop -->
          <div class="hidden lg:block">
            <div class="flex flex-row gap-16">
              <div>
                <div
                  v-for="(block, index) in props.component.content.blocks"
                  :key="'block' + index"
                >
                  <button
                    @click="state.selectedIndex = index"
                    :class="[
                      index === state.selectedIndex
                        ? 'text-salmon border-coffee/20'
                        : 'text-salmon/60 border-transparent',
                    ]"
                    class="font-heading text-lg sm:text-xl md:text-2xl mb-2 whitespace-nowrap relative hover:text-salmon hover:border-coffee/10 transition py-2 px-5 border rounded-full"
                  >
                    {{ block.heading }}
                    <!-- <div
                      v-show="index === state.selectedIndex"
                      class="absolute top-1/2 -left-2 transform -translate-x-full -translate-y-1/2 w-2 h-2 mt-0.5 rounded-full bg-coffee"
                    ></div> -->
                  </button>
                </div>
              </div>
              <div id="text-container" class="leading-loose">
                <p
                  v-if="state.enrichedBlocks.length > 0"
                  :style="{ height: `${state.enrichedBlocks[state.selectedIndex].height}px` }"
                  class="markdown transition-all duration-300"
                  v-html="
                    $mdRenderer
                      .set({ html: true })
                      .render(state.enrichedBlocks[state.selectedIndex].text)
                  "
                ></p>
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
  .animate-height {
    animation: 600ms ease-in both height;
  }

  @keyframes height {
    0% {
      max-height: 0px;
    }
    100% {
      max-height: 2000px;
    }
  }
</style>
