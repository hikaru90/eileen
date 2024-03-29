<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "prices").content,
      },
    }
  );
</script>

<template>
  <div class="mt-28 mb-40">
    <div class="max-container">
      <div class="flex flex-col items-center justify-center mb-10">
        <IntersectonPop>
        <h2 class="shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-16">
          {{ props.component.content?.heading }}
        </h2>
      </IntersectonPop>
      </div>
      <div class="flex flex-col md:flex-row gap-32 items-center justify-center mb-32">
        <div v-for="(card, index) in props.component.content?.prices" class="relative">
          <nuxt-img format="webp"
            :src="`/postit-${(index + 1) % 4}.png`"
            alt="postit"
            style="width: 170%; height: 155%; left: -35%; top: -17%; max-width: none"
            class="block absolute -z-10"
          />
          <div class="font-bold">
            {{ card.name }}
          </div>
          <div style="padding-bottom: 2px" class="mb-2">{{ card.duration }} Minuten</div>
          <div class="font-bold text-3xl">{{ card.price.toLocaleString("de-DE") }} €</div>
          <div class="mb-16 text-sm">
            {{ card.description }}
          </div>
          <NuxtLink
            :to="card.cta.link"
            :title="card.cta.text"
            class="inline-flex items-center border-2 border-gold rounded px-4 py-3"
          >
            <div>
              {{ card.cta.text }}
            </div>
            <div
              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"
            >
              <nuxt-icon :name="card.cta.icon" class="text-sm text-coffee" />
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="flex items-center justify-center">

        <p style="max-width: 36em" class="text-center text-sm">
          {{ props.component.content?.subline }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
