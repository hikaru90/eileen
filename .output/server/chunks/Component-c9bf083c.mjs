import _sfc_main$2 from './nuxt-icon-19667aae.mjs';
import { useSSRContext, defineComponent, createVNode, resolveDynamicComponent, unref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { b as useSidebarStore, d as usePocketBase, s as storeToRefs, e as useContentStore } from './server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
import 'vue-router';
import 'h3';
import 'ufo';
import 'markdown-it';
import 'mitt';
import 'defu';
import 'pocketbase';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const __vite_glob_0_0 = `<script setup lang="ts">\r
  import useBrevo from "~~/composables/useBrevo";\r
\r
  const { sendMail } = useBrevo();\r
\r
  const props = defineProps<{\r
    component: object;\r
  }>();\r
\r
  const state = reactive({\r
    currentStep: 0,\r
    steps: [\r
      { id: 0, name: "Terminfindung" },\r
      { id: 1, name: "Buchung" },\r
    ],\r
    selectedTimeslot: undefined,\r
    formValues: undefined,\r
    formSubmitted: false,\r
    success: undefined,\r
  });\r
\r
  const selectTimeslot = (timeslot: object) => {\r
    state.selectedTimeslot = timeslot;\r
    state.currentStep = 1;\r
  };\r
\r
  const stepIsValid = (stepId) => {\r
    if (stepId === 0) {\r
      if (state.selectedTimeslot != undefined) return true;\r
      return false;\r
    }\r
    if (stepId === 1) {\r
      if (state.formValues != undefined) return true;\r
      return false;\r
    }\r
  };\r
\r
  const validateAndSelectStep = (targetStepId) => {\r
    if (targetStepId === 0) {\r
      state.currentStep = 0;\r
    }\r
    if (targetStepId === 1) {\r
      if (stepIsValid(0)) {\r
        state.currentStep = 1;\r
      }\r
    }\r
  };\r
\r
  const handleFormSubmit = async (payload) => {\r
    try {\r
      console.log("payload", payload);\r
      if (payload.success === false) {\r
        console.log("state.success = false;", (state.success = false));\r
        state.success = false;\r
      } else {\r
        console.log("state.success = true;", (state.success = true));\r
\r
        const formData = {\r
          ...payload.formValues,\r
          timeslot: state.selectedTimeslot,\r
        };\r
        console.log("formData", formData);\r
\r
        await sendMail('bookingRequestUser', payload.formValues.mail, formData);\r
        await sendMail('bookingRequestOwner', 'kontakt@eileengeorge.de', formData);\r
        await sendMail('bookingRequestOwner', 'alexbueckner@gmail.com', formData);\r
        state.success = true;\r
      }\r
      state.formSubmitted = true;\r
    } catch (err) {\r
      console.error("Error sending Mail", err);\r
    }\r
  };\r
<\/script>\r
\r
<template>\r
  <div class="max-container">\r
    <template v-if="state.formSubmitted">\r
      <div v-if="state.success" class="flex justify-center my-20">\r
        <div\r
          class="w-full lg:w-2/3 font-bold border-2 rounded border-green bg-green bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"\r
        >\r
          Vielen Dank f\xFCr Ihre Buchung. <br />\r
          Ich melde mich zeitnah per E-Mail bei Ihnen.\r
          <!-- Sie haben soeben eine Zusammenfassung Ihrer Daten per E-Mail erhalten. -->\r
        </div>\r
      </div>\r
      <div v-else class="flex justify-center my-20">\r
        <div\r
          class="w-full lg:w-2/3 font-bold border-2 rounded border-red bg-red bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"\r
        >\r
          Bei der \xDCbermittlung Ihrer Daten ist leider ein Fehler aufgetreten. <br />Versuchen Sie es\r
          bitte erneut. Sollte das Problem weiterhin bestehen, schreiben Sie mir bitte eine Mail an\r
          <a href="mailto:kontakt@eileengeorge.de" class="underline">kontakt@eileengeorge.de</a>.\r
        </div>\r
      </div>\r
    </template>\r
    <template v-else>\r
      <div class="flex items-center justify-center gap-10">\r
        <button\r
          aria-label="Schritt ausw\xE4hlen"\r
          @click="validateAndSelectStep(step.id)"\r
          v-for="(step, index) in state.steps"\r
          :key="'step' + index"\r
          class="flex flex-col gap-4 items-center justify-center w-1/3 py-10"\r
        >\r
          <div\r
            :class="[state.currentStep === step.id ? 'bg-gold' : 'bg-darkOffwhite']"\r
            class="w-full h-[5px] rounded relative"\r
          >\r
            <div\r
              :class="[\r
                state.currentStep === step.id\r
                  ? 'bg-gradient-to-b from-gold via-lightGold to-darkGold'\r
                  : 'bg-darkOffwhite',\r
              ]"\r
              class="w-5 h-5 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"\r
            >\r
              <nuxt-icon v-if="stepIsValid(step.id)" name="icon-check" class="text-xl" />\r
            </div>\r
          </div>\r
          <div\r
            :class="[state.currentStep === step.id ? 'text-coffee font-bold' : 'text-lightGrey']"\r
            class=""\r
          >\r
            {{ step.name }}\r
          </div>\r
        </button>\r
      </div>\r
      <BookingCalendarDate\r
        v-show="state.currentStep === 0"\r
        @selectTimeslot="selectTimeslot"\r
        :component="props.component"\r
        :selectedTimeslot="state.selectedTimeslot"\r
      />\r
      <BookingCalendarForm\r
        v-show="state.currentStep === 1"\r
        @formSubmitted="handleFormSubmit"\r
        :selectedTimeslot="state.selectedTimeslot"\r
      />\r
    </template>\r
  </div>\r
</template>\r
`;
const __vite_glob_0_1 = '<template>\r\n  <div class="max-container">\r\n    <div class="p-20">Default Component</div>\r\n  </div>\r\n</template>\r\n';
const __vite_glob_0_2 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "faq").content,\r\n      },\r\n    }\r\n  );\r\n\r\n<\/script>\r\n\r\n<template>\r\n  <div class="my-28">\r\n    <div class="max-container">\r\n      <div class="flex items-center justify-center">\r\n        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-16">\r\n          {{ props.component.content?.heading }}\r\n        </h2>\r\n      </div>\r\n      <div class="flex flex-col gap-2">\r\n        <FaqEntry v-for="(faq, index) in props.component.content?.faqs" :faq="faq" />\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n</style>\r\n';
const __vite_glob_0_3 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n      isFirst?: boolean;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "heroBig").content,\r\n      },\r\n      isFirst: false,\r\n    }\r\n  );\r\n\r\n  const state = reactive({});\r\n\r\n  const getCurrentImageUrl = (filename) => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  };\r\n\r\n  onMounted(() => {});\r\n  onUnmounted(() => {});\r\n<\/script>\r\n\r\n<template>\r\n  <div\r\n    :class="[{ \'-mt-24\': props.isFirst }]"\r\n    class="h-[400px] lg:h-[900px] relative bg-[#F6F4F2] text-white overflow-visible"\r\n  >\r\n    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r\n    </div> -->\r\n    <div class="max-container h-full relative z-10">\r\n      <div class="h-full flex items-center justify-center">\r\n        <div class="mt-10">\r\n          <h2\r\n            style="max-width: 15em"\r\n            class="text-coffee font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"\r\n            v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"\r\n          >\r\n          </h2>\r\n          <p class="text-coffee uppercase text-center text-xs sm:text-lg" v-html="$mdRenderer.set({ html: true }).render(props.component.content.subline)"></p>\r\n          <!-- <NuxtLink\r\n            :to="props.component.content.cta.link"\r\n            :title="props.component.content.cta.text"\r\n            class="inline-flex items-center border-2 border-gold rounded text-offwhite px-4 py-3"\r\n          >\r\n            <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px">\r\n              {{ props.component.content.cta.text }}\r\n            </div>\r\n            <div\r\n              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"\r\n            >\r\n              <nuxt-icon :name="props.component.content.cta.icon" class="text-sm text-coffee" />\r\n            </div>\r\n          </NuxtLink> -->\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="w-full h-full absolute top-0 left-0">\r\n      <div\r\n        style="\r\n          background-image: radial-gradient(\r\n            circle,\r\n            rgb(250, 244, 216) 0%,\r\n            #FBF9F7 60%,\r\n            #f9f3ec 100%\r\n          );\r\n          mix-blend-mode: multiply;\r\n        "\r\n        class="w-full h-full opacity-20 absolute"\r\n      ></div>\r\n      <div\r\n        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"\r\n        class="w-full h-full bg-cover bg-center opacity-70"\r\n      ></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n  .slide:last-child {\r\n    .connector {\r\n      display: none;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_4 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n      isFirst?: boolean;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "heroSmall").content,\r\n      },\r\n      isFirst: false,\r\n    }\r\n  );\r\n\r\n  const state = reactive({});\r\n\r\n  const getCurrentImageUrl = (filename) => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  };\r\n\r\n  onMounted(() => {});\r\n  onUnmounted(() => {});\r\n<\/script>\r\n\r\n<template>\r\n  <div :class="[{ \'-mt-24\': props.isFirst}]" class="h-[400px] lg:h-[600px] relative text-white overflow-visible">\r\n    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r\n    </div> -->\r\n    <div class="max-container h-full relative z-10">\r\n      <div class="h-full flex items-center justify-center">\r\n        <div class="mt-10 ">\r\n          <h2\r\n            style="max-width: 15em; text-shadow: rgba(0,0,0,0.8) 0 0 80px;"\r\n            class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10 border-2 border-gold px-5 py-3 rounded text-center"\r\n          >\r\n            {{ props.component.content.heading }}\r\n          </h2>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="w-full h-full absolute top-0 left-0">\r\n      <div\r\n        style="\r\n          background-image: radial-gradient(\r\n            circle,\r\n            rgba(2, 55, 41, 1) 0%,\r\n            rgba(0, 31, 31, 1) 60%,\r\n            rgba(53, 65, 30, 1) 100%\r\n          );\r\n          mix-blend-mode: multiply;\r\n        "\r\n        class="w-full h-full opacity-20 absolute"\r\n      ></div>\r\n      <div\r\n        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"\r\n        class="w-full h-full bg-cover bg-[60%] lg:bg-center"\r\n      ></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n  .slide:last-child {\r\n    .connector {\r\n      display: none;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_5 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "imageList").content,\r\n      },\r\n    }\r\n  );\r\n\r\n  const state = reactive({});\r\n\r\n  const currentImageUrl = computed(() => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${props.component.content.image}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  });\r\n<\/script>\r\n\r\n<template>\r\n  <div class="mb-36 mt-24">\r\n    <div class="max-container">\r\n      <div class="flex items-center justify-center">\r\n        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-20">\r\n          {{ props.component.content.heading }}\r\n        </h2>\r\n      </div>\r\n      <div class="flex flex-col lg:flex-row lg:items-stretch justify-center">\r\n        <div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0">\r\n          <div\r\n            :style="[{ backgroundImage: `url(${currentImageUrl})` }]"\r\n            class="h-60 lg:h-full lg:w-[500px] lg:mr-10 relative bg-cover bg-center rounded"\r\n          ></div>\r\n        </div>\r\n        <div class="w-full lg:w-1/2">\r\n          <div class="">\r\n            <div\r\n              v-for="(item, index) in props.component.content.list"\r\n              :key="\'slide\' + index"\r\n              class="slide flex items-start gap-4 transition-opacity delay-300 relative -ml-2 lg:ml-0"\r\n            >\r\n              <div\r\n                style="width: 1px"\r\n                class="connector h-full absolute top-2 left-[7px] bg-gold mb-1 -z-10"\r\n              ></div>\r\n              <div class="slideParagraph mb-6 flex">\r\n                <div class="w-4 h-4 bg-gold rounded-full flex-shrink-0"></div>\r\n                <div class="ml-4 -mt-[5px]">\r\n                  <h3 class="inline-block bg-gold rounded px-2 mb-[5px] text-sm">\r\n                    {{ item.type }}\r\n                  </h3>\r\n                  <div class="">\r\n                    {{ item.place }}\r\n                  </div>\r\n                  <div class="font-bold">\r\n                    {{ item.name }}\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n  .slide:last-child {\r\n    .connector {\r\n      display: none;\r\n    }\r\n    .slideParagraph {\r\n      @apply mb-0;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_6 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "imageRotation").content,\r\n      },\r\n    }\r\n  );\r\n\r\n  const state = reactive({\r\n    donutSize: 0.15,\r\n    timeout: 8000,\r\n    currentSlide: 0,\r\n    interval: undefined,\r\n  });\r\n\r\n  const getCurrentImageUrl = (filename) => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  };\r\n\r\n  const startInterval = (startingSlide) => {\r\n    if (startingSlide) state.currentSlide = startingSlide;\r\n    state.interval = setInterval(() => {\r\n      state.currentSlide = (state.currentSlide + 1) % props.component.content.slides.length;\r\n    }, state.timeout);\r\n  };\r\n  const stopInterval = () => {\r\n    clearInterval(state.interval);\r\n  };\r\n\r\n  onMounted(() => {\r\n    startInterval();\r\n  });\r\n  onUnmounted(() => {\r\n    stopInterval();\r\n  });\r\n<\/script>\r\n\r\n<template>\r\n  <div class="mb-36">\r\n    <div class="flex items-center justify-center">\r\n      <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-20">\r\n        {{ props.component.content.heading }}\r\n      </h2>\r\n    </div>\r\n    <div class="flex flex-col lg:flex-row lg:items-center justify-center">\r\n      <div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0">\r\n        <div class="h-60 sm:h-80 lg:h-96 lg:w-[500px] lg:mr-10 relative bg-cover">\r\n          <div\r\n            v-for="(slide, index) in props.component.content.slides"\r\n            :key="\'image\' + index"\r\n            :style="[\r\n              { backgroundImage: `url(${getCurrentImageUrl(slide.image)})` },\r\n              {\r\n                animation:\r\n                  index === state.currentSlide\r\n                    ? `fadeInOut ${state.timeout}ms forwards infinite`\r\n                    : \'\',\r\n              },\r\n            ]"\r\n            class="bg-cover bg-center absolute top-0 left-0 w-full h-full ease-in lg:rounded-md opacity-0"\r\n          ></div>\r\n        </div>\r\n      </div>\r\n      <div class="w-full lg:w-1/2 p-10 lg:p-0">\r\n        <div class="sm:ml-10">\r\n          <div\r\n            v-for="(slide, index) in props.component.content.slides"\r\n            :key="\'slide\' + index"\r\n            class="slide flex items-start gap-4 transition-opacity relative -ml-2 lg:ml-0"\r\n            :class="[index === state.currentSlide ? \'opacity-100\' : \'opacity-40\']"\r\n          >\r\n            <div\r\n              class="w-6 h-6 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center"\r\n            >\r\n              <div class="w-full my-0 mx-auto transform -rotate-90">\r\n                <svg viewBox="0 0 40 40" class="donut w-full h-full">\r\n                  <linearGradient id="gold" x1="1" x2="0" y1="0" y2="0">\r\n                    <stop offset="0%" stop-color="#E3C879" />\r\n                    <stop offset="50%" stop-color="#FBF48A" />\r\n                    <stop offset="100%" stop-color="#9B6C1C" />\r\n                  </linearGradient>\r\n                  <circle class="transform-center" fill="#e3c879" cx="20" cy="20" r="12"></circle>\r\n                  <circle\r\n                    :style="[\r\n                      {\r\n                        animation:\r\n                          index === state.currentSlide\r\n                            ? `donut1 ${state.timeout}ms forwards infinite`\r\n                            : \'\',\r\n                      },\r\n                    ]"\r\n                    class="transform-center stroke-gold"\r\n                    cx="20"\r\n                    cy="20"\r\n                    r="15"\r\n                    fill="transparent"\r\n                    stroke-width="10"\r\n                    stroke-dasharray="0 94.2"\r\n                    stroke-dashoffset="0"\r\n                  ></circle>\r\n                </svg>\r\n              </div>\r\n            </div>\r\n            <div\r\n              style="width: 1px"\r\n              class="connector h-full absolute top-2 left-[9px] lg:left-3 bg-gold mb-1 -z-10"\r\n            ></div>\r\n            <div class="slideParagraph mb-10">\r\n              <a :href="slide.link" class="flex items-center gap-2 mb-2">\r\n                <h3 class="font-bold lg:text-xl">\r\n                  {{ slide.text }}\r\n                </h3>\r\n                <div\r\n                  class="w-4 h-4 bg-lightGrey rounded-full flex items-center justify-center text-white"\r\n                >\r\n                  <nuxt-icon :name="slide.icon" class="text-sm" />\r\n                </div>\r\n              </a>\r\n              <p style="max-width: 19em" class="">\r\n                {{ slide.description }}\r\n              </p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n  .slide:last-child {\r\n    .connector {\r\n      display: none;\r\n    }\r\n    .slideParagraph {\r\n      @apply mb-0;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_7 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n      isFirst?: boolean;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "portraitText").content,\r\n      },\r\n      isFirst: false,\r\n    }\r\n  );\r\n\r\n  const state = reactive({});\r\n\r\n  const getCurrentImageUrl = (filename) => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  };\r\n\r\n  onMounted(() => {});\r\n  onUnmounted(() => {});\r\n<\/script>\r\n\r\n<template>\r\n  <div :class="[{ \'-mt-24\': props.isFirst }]" class="relative text-white overflow-visible">\r\n    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r\n    </div> -->\r\n    <div class="max-container h-full relative z-10">\r\n      <div class="h-full flex items-center justify-center py-16 md:py-24">\r\n        <div class="mt-10">\r\n          <h2\r\n            class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"\r\n          >\r\n            {{ props.component.content.heading }}\r\n          </h2>\r\n\r\n          <div class="flex flex-col lg:flex-row gap-16 items-center lg:items-start">\r\n            <p class="markdown text-coffee max-w-[44rem]" v-html="$mdRenderer.set({ html: true }).render(props.component.content.text)">\r\n            </p>\r\n            <img :src="getCurrentImageUrl(props.component.content.image)" alt="Eileen George" class="w-full md:max-w-[300px] rounded-lg shadow-2xl shadow-coffee/30 -order-1 lg:order-1 flex-shrink-0">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style lang="scss">\r\n  .markdown{\r\n    p{\r\n      @apply mb-4;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_8 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "offer").content,\r\n      },\r\n    }\r\n  );\r\n\r\n  const state = reactive({});\r\n\r\n  const getCurrentImageUrl = (filename) => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  };\r\n\r\n<\/script>\r\n\r\n<template>\r\n  <div class="py-16 md:py-24 relative">\r\n    <div\r\n      style="\r\n        background-image: radial-gradient(\r\n          circle,\r\n          #FEF1D0 0%,\r\n          transparent 60%\r\n        );\r\n      "\r\n      class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2"\r\n    ></div>\r\n    <div class="max-container">\r\n      <div class="flex items-center justify-center">\r\n        <h2\r\n          class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"\r\n        >\r\n          {{ props.component.content.heading }}\r\n        </h2>\r\n      </div>\r\n\r\n      <div class="flex flex-col md:flex-row itmes-stretch justify-center gap-16 relative">\r\n        <div\r\n          v-for="(offer, index) in props.component.content.offers"\r\n          :key="\'slide\' + index"\r\n          class="w-full md:w-1/2 md:max-w-[390px] shadow-2xl shadow-coffee/30 rounded-lg overflow-hidden"\r\n        >\r\n          <div :style="[{ backgroundImage: `url(${getCurrentImageUrl(offer.image)})` }]" class="w-full h-52 bg-cover">\r\n\r\n          </div>\r\n\r\n          <div class="bg-white px-10 py-12 h-full">\r\n            <h3 class="font-heading text-xl mb-1.5">\r\n              {{ offer.name }}\r\n            </h3>\r\n            <div class=" mb-2">\r\n              {{ offer.type }}\r\n            </div>\r\n\r\n            <div class="border border-coffee border-opacity-20 rounded-full inline-flex items-center text-xs px-2 gap-1 mb-10 -ml-0.5">\r\n              <nuxt-icon name="icon-camera" class="text-xs text-green opacity-80" /> online verf\xFCgbar\r\n            </div>\r\n\r\n            <div class="min-h-[60px] mb-10">\r\n              {{ offer.description }}\r\n            </div>\r\n\r\n            <div class="flex items-end gap-4 mb-6">\r\n              <div class="text-2xl">\r\n                {{ offer.price }} \u20AC\r\n              </div>\r\n              <div class="mb-[2px]">\r\n                {{ offer.duration }}\r\n              </div>\r\n            </div>\r\n\r\n            <NuxtLink\r\n                to="/buchen"\r\n                class="bg-coffee rounded-full text-white inline-flex items-center px-5 py-2 shadow-md"\r\n              >\r\n                <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px" class="">\r\n                  Buchen\r\n                </div>\r\n              </NuxtLink>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n  .slide:last-child {\r\n    .connector {\r\n      display: none;\r\n    }\r\n    .slideParagraph {\r\n      @apply mb-0;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_9 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n      isFirst?: boolean;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "portraitText").content,\r\n      },\r\n      isFirst: false,\r\n    }\r\n  );\r\n\r\n  const state = reactive({});\r\n\r\n  const getCurrentImageUrl = (filename) => {\r\n    const img = useImage();\r\n    const imgUrl = img(\r\n      `${config.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,\r\n      {\r\n        format: "webp",\r\n      }\r\n    );\r\n    return imgUrl;\r\n  };\r\n\r\n  onMounted(() => {});\r\n  onUnmounted(() => {});\r\n<\/script>\r\n\r\n<template>\r\n  <div :class="[{ \'-mt-24\': props.isFirst }]" class="relative text-white overflow-visible">\r\n    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r\n    </div> -->\r\n    <div class="max-container h-full relative z-10">\r\n      <div class="h-full flex items-center justify-center py-16 md:py-24">\r\n        <div class="mt-10">\r\n          <h2\r\n            class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-coffee"\r\n          >\r\n            {{ props.component.content.heading }}\r\n          </h2>\r\n          <p class="text-coffee text-center max-w-[44rem]">\r\n            {{ props.component.content.text }}\r\n          </p>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div\r\n      class="w-32 h-32 md:w-40 md:h-40 absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl shadow-coffee/30"\r\n    >\r\n      <div\r\n        style="\r\n          background-image: radial-gradient(\r\n            circle,\r\n            rgb(250, 244, 216) 0%,\r\n            #fbf9f7 60%,\r\n            #f9f3ec 100%\r\n          );\r\n          mix-blend-mode: multiply;\r\n        "\r\n        class="w-full h-full opacity-20 absolute"\r\n      ></div>\r\n      <div\r\n        :style="[{ backgroundImage: `url(${getCurrentImageUrl(props.component.content.image)})` }]"\r\n        class="-left-[1px] -right-[1px] -top-[1px] -bottom-[1px] bg-cover bg-center absolute"\r\n      ></div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss">\r\n  .slide:last-child {\r\n    .connector {\r\n      display: none;\r\n    }\r\n  }\r\n</style>\r\n';
const __vite_glob_0_10 = '<script setup lang="ts">\r\n  import defaults from "~/lib/defaults";\r\n  const config = useRuntimeConfig();\r\n\r\n  const props = withDefaults(\r\n    defineProps<{\r\n      component?: object;\r\n    }>(),\r\n    {\r\n      component: {\r\n        content: defaults.find((el) => el.type === "prices").content,\r\n      },\r\n    }\r\n  );\r\n<\/script>\r\n\r\n<template>\r\n  <div class="mt-28 mb-40">\r\n    <div class="max-container">\r\n      <div class="flex flex-col items-center justify-center mb-10">\r\n        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-16">\r\n          {{ props.component.content?.heading }}\r\n        </h2>\r\n      </div>\r\n      <div class="flex flex-col md:flex-row gap-32 items-center justify-center mb-32">\r\n        <div v-for="(card, index) in props.component.content?.prices" class="relative">\r\n          <nuxt-img format="webp"\r\n            :src="`/postit-${(index + 1) % 4}.png`"\r\n            alt="postit"\r\n            style="width: 170%; height: 155%; left: -35%; top: -17%; max-width: none"\r\n            class="block absolute -z-10"\r\n          />\r\n          <div class="font-bold">\r\n            {{ card.name }}\r\n          </div>\r\n          <div style="padding-bottom: 2px" class="mb-2">{{ card.duration }} Minuten</div>\r\n          <div class="font-bold text-3xl">{{ card.price.toLocaleString("de-DE") }} \u20AC</div>\r\n          <div class="mb-16 text-sm">\r\n            {{ card.description }}\r\n          </div>\r\n          <NuxtLink\r\n            :to="card.cta.link"\r\n            :title="card.cta.text"\r\n            class="inline-flex items-center border-2 border-gold rounded px-4 py-3"\r\n          >\r\n            <div>\r\n              {{ card.cta.text }}\r\n            </div>\r\n            <div\r\n              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"\r\n            >\r\n              <nuxt-icon :name="card.cta.icon" class="text-sm text-coffee" />\r\n            </div>\r\n          </NuxtLink>\r\n        </div>\r\n      </div>\r\n      <div class="flex items-center justify-center">\r\n\r\n        <p style="max-width: 36em" class="text-center text-sm">\r\n          {{ props.component.content?.subline }}\r\n        </p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<style scoped lang="scss"></style>\r\n';
const __vite_glob_0_11 = `<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "offer").content,\r
      },\r
    }\r
  );\r
\r
  const state = reactive({\r
    vw: 0,\r
    sizes: [\r
      { width: 1024, count: 3 },\r
      { width: 768, count: 2 },\r
      { width: 0, count: 1 },\r
    ],\r
    currentSlide: 0,\r
    startX: 0,\r
    isTracking: false,\r
    flickedLeft: false,\r
    flickedRight: false,\r
  });\r
\r
  const visibleSlideCount = computed(() => {\r
    return state.sizes.find((size) => state.vw > size.width)?.count;\r
  });\r
\r
  const visibleSlides = computed(() => {\r
    let res = [];\r
    for (let i = 0; i < visibleSlideCount.value; i++) {\r
      res.push(state.currentSlide + i);\r
    }\r
    return res;\r
  });\r
\r
  const slideTranslation = computed(() => {\r
    if (false) {\r
      const singleTranslationWidth =\r
        ((-state.currentSlide * 1) / visibleSlideCount.value) *\r
          window.document.getElementById("carousel")?.clientWidth || 0;\r
      return singleTranslationWidth;\r
    }\r
  });\r
\r
  const prev = () => {\r
    if (state.currentSlide > 0) state.currentSlide--;\r
  };\r
  const next = () => {\r
    if (state.currentSlide + visibleSlideCount.value < props.component.content.testimonials.length)\r
      state.currentSlide++;\r
  };\r
\r
  const startTracking = (event) => {\r
    state.isTracking = true;\r
    state.startX = event.clientX;\r
  };\r
\r
  const trackMovement = (event) => {\r
    if (state.isTracking) {\r
      const deltaX = event.clientX - state.startX;\r
      if (deltaX > 0) {\r
        state.flickedRight = true;\r
        state.flickedLeft = false;\r
      } else if (deltaX < 0) {\r
        state.flickedLeft = true;\r
        state.flickedRight = false;\r
      }\r
    }\r
  };\r
\r
  const stopTracking = () => {\r
    state.isTracking = false;\r
    console.log('flickedLeft', state.flickedLeft);\r
    if(state.flickedLeft) next()\r
    if(state.flickedRight) prev()\r
  };\r
\r
  const handleResize = () => {\r
    state.vw = window.innerWidth;\r
  };\r
  onMounted(() => {\r
    if (false) state.vw = window.innerWidth;\r
    window.addEventListener("resize", handleResize);\r
  });\r
  onBeforeUnmount(() => {\r
    window.removeEventListener("resize", handleResize);\r
  });\r
<\/script>\r
\r
<template>\r
  <div class="py-16 md:py-24 relative">\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <h2\r
          class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"\r
        >\r
          {{ props.component.content.heading }}\r
        </h2>\r
      </div>\r
\r
      <div\r
        id="carousel"\r
        @mousedown="startTracking"\r
        @mousemove="trackMovement"\r
        @mouseup="stopTracking"\r
        :style="[{ transform: \`translate(\${slideTranslation}px,0)\` }]"\r
        class="flex flex-row itmes-stretch justify-start relative w-full transition duration-300 select-none cursor-grab"\r
      >\r
        <div\r
          v-for="(offer, index) in props.component.content.testimonials"\r
          :key="'slide' + index"\r
          :class="[\r
            \`slide\${index}\`,\r
            visibleSlideCount > 1 ? \`w-1/\${visibleSlideCount}\` : 'w-full',\r
            slideTranslation,\r
            visibleSlides.includes(index) ? 'opacity-100' : 'opacity-0',\r
          ]"\r
          class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-6 transition"\r
        >\r
          <div\r
            :class="[\r
              visibleSlides.includes(index)\r
                ? 'shadow-2xl shadow-coffee/20 scale-100'\r
                : 'shadow-sm shadow-coffee/20 scale-80',\r
            ]"\r
            class="bg-white px-8 pt-8 pb-12 h-full rounded-lg overflow-hidden transition-all duration-300 delay-100 transform"\r
          >\r
            <div class="flex items-center gap-1 justify-between mb-8">\r
              <h3 class="font-heading text-xl mb-1.5">\r
                {{ offer.name }}\r
              </h3>\r
              <div class="border-b border-coffee border-opacity-30 flex-grow"></div>\r
              <div class="">\r
                {{ new Date(offer.date).getFullYear() }}\r
              </div>\r
            </div>\r
\r
            <div class="">\r
              {{ offer.text }}\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="flex items-center justify-end gap-1px mr-6 mt-10 rounded-full">\r
        <button\r
          @click="prev"\r
          class="py-1 pl-1.5 pr-2.5 bg-coffee border-r border-orange border-opacity-30 text-white rounded-l-full hover:bg-opacity-90 transition shadow-md shadow-coffee/20"\r
        >\r
          <nuxt-icon name="icon-caret-left" class="text-2xl" />\r
        </button>\r
        <button\r
          @click="next"\r
          class="py-1 pr-1.5 pl-2.5 bg-coffee border-r border-orange border-opacity-30 text-white rounded-r-full hover:bg-opacity-90 transition shadow-md shadow-coffee/20"\r
        >\r
          <nuxt-icon name="icon-caret-right" class="text-2xl" />\r
        </button>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
  .slide:last-child {\r
    .connector {\r
      display: none;\r
    }\r
    .slideParagraph {\r
      @apply mb-0;\r
    }\r
  }\r
</style>\r
`;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ComponentSelector",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    useContentStore();
    const { componentContent, componentContentType } = storeToRefs(sidebarStore);
    const files = Object.keys(
      /* @__PURE__ */ Object.assign({ "/components/global/Component/BookingCalendar.vue": __vite_glob_0_0, "/components/global/Component/Default.vue": __vite_glob_0_1, "/components/global/Component/Faq.vue": __vite_glob_0_2, "/components/global/Component/HeroBig.vue": __vite_glob_0_3, "/components/global/Component/HeroSmall.vue": __vite_glob_0_4, "/components/global/Component/ImageList.vue": __vite_glob_0_5, "/components/global/Component/ImageRotation.vue": __vite_glob_0_6, "/components/global/Component/MyWork.vue": __vite_glob_0_7, "/components/global/Component/Offer.vue": __vite_glob_0_8, "/components/global/Component/PortraitText.vue": __vite_glob_0_9, "/components/global/Component/Prices.vue": __vite_glob_0_10, "/components/global/Component/Testimonials.vue": __vite_glob_0_11 })
    ).map((path) => {
      const array = path.split("/");
      return array[array.length - 1].split(".")[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_icon = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(files), (component, index) => {
        _push(`<button class="${ssrRenderClass([[{ "bg-white bg-opacity-20 rounded": unref(componentContentType) === component }], "flex w-full items-center gap-2"])}">`);
        _push(ssrRenderComponent(_component_nuxt_icon, {
          name: `icon-${component}`,
          style: { "font-size": "60px" },
          class: "text-lightBlue"
        }, null, _parent));
        _push(`<div>${ssrInterpolate(component)}</div></button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/input/ComponentSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Component",
  __ssrInlineRender: true,
  props: {
    selectedMode: { default: 0 }
  },
  emits: ["setContentType"],
  setup(__props, { emit }) {
    const props = __props;
    const sidebarStore = useSidebarStore();
    usePocketBase();
    const { componentCss, componentContentType } = storeToRefs(sidebarStore);
    const contentStore = useContentStore();
    const { capitalize } = contentStore;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputComponentSelector = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (props.selectedMode === 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_InputComponentSelector, { class: "border-b border-darkOffwhite border-opacity-20" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (props.selectedMode === 1) {
        _push(`<div>`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent("Sidebar" + unref(capitalize)(unref(componentContentType))), null, null), _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Sidebar/Component.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Component-c9bf083c.mjs.map
