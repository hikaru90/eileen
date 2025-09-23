<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "tiles").content,
      },
    }
  );

</script>

<template>
  <div class="my-28">
    <div class="max-container relative">
      <div
      style="
        background-image: radial-gradient(
          circle,
          #FAF1DF 0%,
          transparent 50%
        );
      "
      class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2"
    ></div>
      <div class="flex items-center justify-center">
        <IntersectonPop>
        <h2
          class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"
        >
          {{ props.component.content.heading }}
        </h2>
      </IntersectonPop>
      </div>
      <div class="flex flex-wrap -mx-4 gap-y-8 items-stretch">
        <div
          v-for="(tile, index) in props.component.content?.tiles"
          :key="'tile-' + index"
          class="w-full md:w-1/2 text-left px-4 relative"
        >
          <div class="border-t border-coffee border-opacity-10 shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden border bg-white h-full p-4">

            <h3 class="text-xl font-semibold mb-4 text-coffee">
              {{ tile.title }}
            </h3>
            <p class=" leading-relaxed">
              {{ tile.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>