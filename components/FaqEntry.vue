<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      faq: object;
    }>(),
    {
    }
  );

  const state = reactive({
    isOpen: false,
  })
</script>

<template>
  <div class="bg-white shadow-lg rounded border border-grey border-opacity-10">
    <button aria-label="FAQ Frage öffnen" @click="state.isOpen = !state.isOpen" class="w-full flex items-center justify-between p-4 md:p-6 lg:px-8 lg:py-6">
      <span class="text-left mr-5">
        {{ faq.question }}
      </span>
      <div class="w-5 h-5 rounded-full bg-gradient-to-b from-gold via-lightGold to-darkGold">
        <nuxt-icon v-if="state.isOpen" name="icon-minus" class="text-xl" />
        <nuxt-icon v-else name="icon-plus" class="text-xl" />
      </div>
    </button>
    <div :style="[{ 'maxHeight': state.isOpen ? '1500px' : '0px' }]" class="overflow-hidden transition-all ">
      <div v-html="$mdRenderer.render(faq.answer)" class="p-4 md:px-6 md:pt-4 md:pb-8 lg:px-8 lg:pt-6 lg:pb-10 border-t border-grey border-opacity-10 leading-relaxed">
      </div>
    </div>
  </div>
</template>
