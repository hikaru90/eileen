<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "faq").content,
      },
    }
  );

</script>

<template>
  <div class="my-28">
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
      <div class="flex flex-col gap-6">
        <FaqEntry v-for="(faq, index) in props.component.content?.faqs" :faq="faq" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
