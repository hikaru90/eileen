<script setup lang="ts">
  import defaults from "~/lib/defaults";

  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "map").content,
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
  <div class="bg-white pb-24 text-coffee">
    <div class="max-container">
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="w-full flex gap-10 py-8 text-sm justify-around">
          <div class="flex items-center">
            <div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10">
              <nuxt-icon name="icon-marker" class="text-6xl text-coffee" />
            </div>
            <div
              v-html="$mdRenderer.set({ html: true }).render(props.component.content?.address)"
            ></div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10">
              <nuxt-icon name="icon-phone" class="text-6xl text-coffee" />
            </div>
            <div>
              <a :href="'tel:' + props.component.content?.phone" class="underline">{{
                props.component.content?.phone
              }}</a
              ><br />
              {{ props.component.content?.openinghours }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10">
              <nuxt-icon name="icon-mail" class="text-5xl text-coffee" />
            </div>
            <div>
              <a :href="'mailto:' + props.component.content?.mail" class="underline">{{
                props.component.content?.mail
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .input-class {
    @apply border border-gray-200 rounded px-3 py-1 w-full;
  }
</style>
