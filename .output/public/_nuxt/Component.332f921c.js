import{_ as I}from"./nuxt-icon.vue.0e32e4d5.js";import{d as $}from"./defaults.e990b211.js";import{a as h,k as y,V as w,s as k,o as n,f as e,F as R,j,v as U,u as i,i as _,h as T,t as F,W as z,m as D,q as E,l as b,c as B,Y as L}from"./entry.91aa836d.js";const M=`<script setup lang="ts">\r
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
          Vielen Dank für Ihre Buchung. <br />\r
          Ich melde mich zeitnah per E-Mail bei Ihnen.\r
          <!-- Sie haben soeben eine Zusammenfassung Ihrer Daten per E-Mail erhalten. -->\r
        </div>\r
      </div>\r
      <div v-else class="flex justify-center my-20">\r
        <div\r
          class="w-full lg:w-2/3 font-bold border-2 rounded border-red bg-red bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"\r
        >\r
          Bei der Übermittlung Ihrer Daten ist leider ein Fehler aufgetreten. <br />Versuchen Sie es\r
          bitte erneut. Sollte das Problem weiterhin bestehen, schreiben Sie mir bitte eine Mail an\r
          <a href="mailto:kontakt@eileengeorge.de" class="underline">kontakt@eileengeorge.de</a>.\r
        </div>\r
      </div>\r
    </template>\r
    <template v-else>\r
      <div class="flex items-center justify-center gap-10">\r
        <button\r
          aria-label="Schritt auswählen"\r
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
`,P=`<template>\r
  <div class="max-container">\r
    <div class="p-20">Default Component</div>\r
  </div>\r
</template>\r
`,V=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "faq").content,\r
      },\r
    }\r
  );\r
\r
<\/script>\r
\r
<template>\r
  <div class="my-28">\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-16">\r
          {{ props.component.content?.heading }}\r
        </h2>\r
      </div>\r
      <div class="flex flex-col gap-2">\r
        <FaqEntry v-for="(faq, index) in props.component.content?.faqs" :faq="faq" />\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
</style>\r
`,G=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
      isFirst?: boolean;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "heroBig").content,\r
      },\r
      isFirst: false,\r
    }\r
  );\r
\r
  const state = reactive({});\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  onMounted(() => {});\r
  onUnmounted(() => {});\r
<\/script>\r
\r
<template>\r
  <div\r
    :class="[{ '-mt-24': props.isFirst }]"\r
    class="h-[400px] lg:h-[900px] relative bg-[#F6F4F2] text-white overflow-visible"\r
  >\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center">\r
        <div class="mt-10">\r
          <h2\r
            style="max-width: 15em"\r
            class="text-coffee font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"\r
            v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"\r
          >\r
          </h2>\r
          <p class="text-coffee uppercase text-center text-xs sm:text-lg" v-html="$mdRenderer.set({ html: true }).render(props.component.content.subline)"></p>\r
          <!-- <NuxtLink\r
            :to="props.component.content.cta.link"\r
            :title="props.component.content.cta.text"\r
            class="inline-flex items-center border-2 border-gold rounded text-offwhite px-4 py-3"\r
          >\r
            <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px">\r
              {{ props.component.content.cta.text }}\r
            </div>\r
            <div\r
              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"\r
            >\r
              <nuxt-icon :name="props.component.content.cta.icon" class="text-sm text-coffee" />\r
            </div>\r
          </NuxtLink> -->\r
        </div>\r
      </div>\r
    </div>\r
    <div class="w-full h-full absolute top-0 left-0">\r
      <div\r
        style="\r
          background-image: radial-gradient(\r
            circle,\r
            rgb(250, 244, 216) 0%,\r
            #FBF9F7 60%,\r
            #f9f3ec 100%\r
          );\r
          mix-blend-mode: multiply;\r
        "\r
        class="w-full h-full opacity-20 absolute"\r
      ></div>\r
      <div\r
        :style="[{ backgroundImage: \`url(\${getCurrentImageUrl(props.component.content.image)})\` }]"\r
        class="w-full h-full bg-cover bg-center opacity-70"\r
      ></div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
  .slide:last-child {\r
    .connector {\r
      display: none;\r
    }\r
  }\r
</style>\r
`,N=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
      isFirst?: boolean;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "heroSmall").content,\r
      },\r
      isFirst: false,\r
    }\r
  );\r
\r
  const state = reactive({});\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  onMounted(() => {});\r
  onUnmounted(() => {});\r
<\/script>\r
\r
<template>\r
  <div :class="[{ '-mt-24': props.isFirst}]" class="h-[400px] lg:h-[600px] relative text-white overflow-visible">\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center">\r
        <div class="mt-10 ">\r
          <h2\r
            style="max-width: 15em; text-shadow: rgba(0,0,0,0.8) 0 0 80px;"\r
            class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10 border-2 border-gold px-5 py-3 rounded text-center"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
        </div>\r
      </div>\r
    </div>\r
    <div class="w-full h-full absolute top-0 left-0">\r
      <div\r
        style="\r
          background-image: radial-gradient(\r
            circle,\r
            rgba(2, 55, 41, 1) 0%,\r
            rgba(0, 31, 31, 1) 60%,\r
            rgba(53, 65, 30, 1) 100%\r
          );\r
          mix-blend-mode: multiply;\r
        "\r
        class="w-full h-full opacity-20 absolute"\r
      ></div>\r
      <div\r
        :style="[{ backgroundImage: \`url(\${getCurrentImageUrl(props.component.content.image)})\` }]"\r
        class="w-full h-full bg-cover bg-[60%] lg:bg-center"\r
      ></div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
  .slide:last-child {\r
    .connector {\r
      display: none;\r
    }\r
  }\r
</style>\r
`,q=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "imageList").content,\r
      },\r
    }\r
  );\r
\r
  const state = reactive({});\r
\r
  const currentImageUrl = computed(() => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${props.component.content.image}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  });\r
<\/script>\r
\r
<template>\r
  <div class="mb-36 mt-24">\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-20">\r
          {{ props.component.content.heading }}\r
        </h2>\r
      </div>\r
      <div class="flex flex-col lg:flex-row lg:items-stretch justify-center">\r
        <div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0">\r
          <div\r
            :style="[{ backgroundImage: \`url(\${currentImageUrl})\` }]"\r
            class="h-60 lg:h-full lg:w-[500px] lg:mr-10 relative bg-cover bg-center rounded"\r
          ></div>\r
        </div>\r
        <div class="w-full lg:w-1/2">\r
          <div class="">\r
            <div\r
              v-for="(item, index) in props.component.content.list"\r
              :key="'slide' + index"\r
              class="slide flex items-start gap-4 transition-opacity delay-300 relative -ml-2 lg:ml-0"\r
            >\r
              <div\r
                style="width: 1px"\r
                class="connector h-full absolute top-2 left-[7px] bg-gold mb-1 -z-10"\r
              ></div>\r
              <div class="slideParagraph mb-6 flex">\r
                <div class="w-4 h-4 bg-gold rounded-full flex-shrink-0"></div>\r
                <div class="ml-4 -mt-[5px]">\r
                  <h3 class="inline-block bg-gold rounded px-2 mb-[5px] text-sm">\r
                    {{ item.type }}\r
                  </h3>\r
                  <div class="">\r
                    {{ item.place }}\r
                  </div>\r
                  <div class="font-bold">\r
                    {{ item.name }}\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
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
`,O=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "imageRotation").content,\r
      },\r
    }\r
  );\r
\r
  const state = reactive({\r
    donutSize: 0.15,\r
    timeout: 8000,\r
    currentSlide: 0,\r
    interval: undefined,\r
  });\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  const startInterval = (startingSlide) => {\r
    if (startingSlide) state.currentSlide = startingSlide;\r
    state.interval = setInterval(() => {\r
      state.currentSlide = (state.currentSlide + 1) % props.component.content.slides.length;\r
    }, state.timeout);\r
  };\r
  const stopInterval = () => {\r
    clearInterval(state.interval);\r
  };\r
\r
  onMounted(() => {\r
    startInterval();\r
  });\r
  onUnmounted(() => {\r
    stopInterval();\r
  });\r
<\/script>\r
\r
<template>\r
  <div class="mb-36">\r
    <div class="flex items-center justify-center">\r
      <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-20">\r
        {{ props.component.content.heading }}\r
      </h2>\r
    </div>\r
    <div class="flex flex-col lg:flex-row lg:items-center justify-center">\r
      <div class="w-full lg:w-1/2 lg:flex lg:justify-end mb-20 lg:mb-0">\r
        <div class="h-60 sm:h-80 lg:h-96 lg:w-[500px] lg:mr-10 relative bg-cover">\r
          <div\r
            v-for="(slide, index) in props.component.content.slides"\r
            :key="'image' + index"\r
            :style="[\r
              { backgroundImage: \`url(\${getCurrentImageUrl(slide.image)})\` },\r
              {\r
                animation:\r
                  index === state.currentSlide\r
                    ? \`fadeInOut \${state.timeout}ms forwards infinite\`\r
                    : '',\r
              },\r
            ]"\r
            class="bg-cover bg-center absolute top-0 left-0 w-full h-full ease-in lg:rounded-md opacity-0"\r
          ></div>\r
        </div>\r
      </div>\r
      <div class="w-full lg:w-1/2 p-10 lg:p-0">\r
        <div class="sm:ml-10">\r
          <div\r
            v-for="(slide, index) in props.component.content.slides"\r
            :key="'slide' + index"\r
            class="slide flex items-start gap-4 transition-opacity relative -ml-2 lg:ml-0"\r
            :class="[index === state.currentSlide ? 'opacity-100' : 'opacity-40']"\r
          >\r
            <div\r
              class="w-6 h-6 mt-[2px] flex-shrink-0 rounded-full flex items-center justify-center"\r
            >\r
              <div class="w-full my-0 mx-auto transform -rotate-90">\r
                <svg viewBox="0 0 40 40" class="donut w-full h-full">\r
                  <linearGradient id="gold" x1="1" x2="0" y1="0" y2="0">\r
                    <stop offset="0%" stop-color="#E3C879" />\r
                    <stop offset="50%" stop-color="#FBF48A" />\r
                    <stop offset="100%" stop-color="#9B6C1C" />\r
                  </linearGradient>\r
                  <circle class="transform-center" fill="#e3c879" cx="20" cy="20" r="12"></circle>\r
                  <circle\r
                    :style="[\r
                      {\r
                        animation:\r
                          index === state.currentSlide\r
                            ? \`donut1 \${state.timeout}ms forwards infinite\`\r
                            : '',\r
                      },\r
                    ]"\r
                    class="transform-center stroke-gold"\r
                    cx="20"\r
                    cy="20"\r
                    r="15"\r
                    fill="transparent"\r
                    stroke-width="10"\r
                    stroke-dasharray="0 94.2"\r
                    stroke-dashoffset="0"\r
                  ></circle>\r
                </svg>\r
              </div>\r
            </div>\r
            <div\r
              style="width: 1px"\r
              class="connector h-full absolute top-2 left-[9px] lg:left-3 bg-gold mb-1 -z-10"\r
            ></div>\r
            <div class="slideParagraph mb-10">\r
              <a :href="slide.link" class="flex items-center gap-2 mb-2">\r
                <h3 class="font-bold lg:text-xl">\r
                  {{ slide.text }}\r
                </h3>\r
                <div\r
                  class="w-4 h-4 bg-lightGrey rounded-full flex items-center justify-center text-white"\r
                >\r
                  <nuxt-icon :name="slide.icon" class="text-sm" />\r
                </div>\r
              </a>\r
              <p style="max-width: 19em" class="">\r
                {{ slide.description }}\r
              </p>\r
            </div>\r
          </div>\r
        </div>\r
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
`,X=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
      isFirst?: boolean;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "portraitText").content,\r
      },\r
      isFirst: false,\r
    }\r
  );\r
\r
  const state = reactive({});\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  onMounted(() => {});\r
  onUnmounted(() => {});\r
<\/script>\r
\r
<template>\r
  <div :class="[{ '-mt-24': props.isFirst }]" class="relative text-white overflow-visible">\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center py-16 md:py-24">\r
        <div class="mt-10">\r
          <h2\r
            class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
\r
          <div class="flex flex-col lg:flex-row gap-16 items-center lg:items-start">\r
            <p class="markdown text-coffee max-w-[44rem]" v-html="$mdRenderer.set({ html: true }).render(props.component.content.text)">\r
            </p>\r
            <img :src="getCurrentImageUrl(props.component.content.image)" alt="Eileen George" class="w-full md:max-w-[300px] rounded-lg shadow-2xl shadow-coffee/30 -order-1 lg:order-1 flex-shrink-0">\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style lang="scss">\r
  .markdown{\r
    p{\r
      @apply mb-4;\r
    }\r
  }\r
</style>\r
`,W=`<script setup lang="ts">\r
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
  const state = reactive({});\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
<\/script>\r
\r
<template>\r
  <div class="py-16 md:py-24 relative">\r
    <div\r
      style="\r
        background-image: radial-gradient(\r
          circle,\r
          #FEF1D0 0%,\r
          transparent 60%\r
        );\r
      "\r
      class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2"\r
    ></div>\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <h2\r
          class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-coffee"\r
        >\r
          {{ props.component.content.heading }}\r
        </h2>\r
      </div>\r
\r
      <div class="flex flex-col md:flex-row itmes-stretch justify-center gap-16 relative">\r
        <div\r
          v-for="(offer, index) in props.component.content.offers"\r
          :key="'slide' + index"\r
          class="w-full md:w-1/2 md:max-w-[390px] shadow-2xl shadow-coffee/30 rounded-lg overflow-hidden"\r
        >\r
          <div :style="[{ backgroundImage: \`url(\${getCurrentImageUrl(offer.image)})\` }]" class="w-full h-52 bg-cover">\r
\r
          </div>\r
\r
          <div class="bg-white px-10 py-12 h-full">\r
            <h3 class="font-heading text-xl mb-1.5">\r
              {{ offer.name }}\r
            </h3>\r
            <div class=" mb-2">\r
              {{ offer.type }}\r
            </div>\r
\r
            <div class="border border-coffee border-opacity-20 rounded-full inline-flex items-center text-xs px-2 gap-1 mb-10 -ml-0.5">\r
              <nuxt-icon name="icon-camera" class="text-xs text-green opacity-80" /> online verfügbar\r
            </div>\r
\r
            <div class="min-h-[60px] mb-10">\r
              {{ offer.description }}\r
            </div>\r
\r
            <div class="flex items-end gap-4 mb-6">\r
              <div class="text-2xl">\r
                {{ offer.price }} €\r
              </div>\r
              <div class="mb-[2px]">\r
                {{ offer.duration }}\r
              </div>\r
            </div>\r
\r
            <NuxtLink\r
                to="/buchen"\r
                class="bg-coffee rounded-full text-white inline-flex items-center px-5 py-2 shadow-md"\r
              >\r
                <div style="text-shadow: rgba(0, 0, 0, 0.8) 0 0 40px" class="">\r
                  Buchen\r
                </div>\r
              </NuxtLink>\r
          </div>\r
\r
        </div>\r
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
`,A=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
      isFirst?: boolean;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "portraitText").content,\r
      },\r
      isFirst: false,\r
    }\r
  );\r
\r
  const state = reactive({});\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  onMounted(() => {});\r
  onUnmounted(() => {});\r
<\/script>\r
\r
<template>\r
  <div :class="[{ '-mt-24': props.isFirst }]" class="relative text-white overflow-visible">\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center py-16 md:py-24">\r
        <div class="mt-10">\r
          <h2\r
            class="font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-coffee"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
          <p class="text-coffee text-center max-w-[44rem]">\r
            {{ props.component.content.text }}\r
          </p>\r
        </div>\r
      </div>\r
    </div>\r
    <div\r
      class="w-32 h-32 md:w-40 md:h-40 absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl shadow-coffee/30"\r
    >\r
      <div\r
        style="\r
          background-image: radial-gradient(\r
            circle,\r
            rgb(250, 244, 216) 0%,\r
            #fbf9f7 60%,\r
            #f9f3ec 100%\r
          );\r
          mix-blend-mode: multiply;\r
        "\r
        class="w-full h-full opacity-20 absolute"\r
      ></div>\r
      <div\r
        :style="[{ backgroundImage: \`url(\${getCurrentImageUrl(props.component.content.image)})\` }]"\r
        class="-left-[1px] -right-[1px] -top-[1px] -bottom-[1px] bg-cover bg-center absolute"\r
      ></div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
  .slide:last-child {\r
    .connector {\r
      display: none;\r
    }\r
  }\r
</style>\r
`,H=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "prices").content,\r
      },\r
    }\r
  );\r
<\/script>\r
\r
<template>\r
  <div class="mt-28 mb-40">\r
    <div class="max-container">\r
      <div class="flex flex-col items-center justify-center mb-10">\r
        <h2 class="font-bold text-lg md:text-xl lg:text-2xl mb-16">\r
          {{ props.component.content?.heading }}\r
        </h2>\r
      </div>\r
      <div class="flex flex-col md:flex-row gap-32 items-center justify-center mb-32">\r
        <div v-for="(card, index) in props.component.content?.prices" class="relative">\r
          <nuxt-img format="webp"\r
            :src="\`/postit-\${(index + 1) % 4}.png\`"\r
            alt="postit"\r
            style="width: 170%; height: 155%; left: -35%; top: -17%; max-width: none"\r
            class="block absolute -z-10"\r
          />\r
          <div class="font-bold">\r
            {{ card.name }}\r
          </div>\r
          <div style="padding-bottom: 2px" class="mb-2">{{ card.duration }} Minuten</div>\r
          <div class="font-bold text-3xl">{{ card.price.toLocaleString("de-DE") }} €</div>\r
          <div class="mb-16 text-sm">\r
            {{ card.description }}\r
          </div>\r
          <NuxtLink\r
            :to="card.cta.link"\r
            :title="card.cta.text"\r
            class="inline-flex items-center border-2 border-gold rounded px-4 py-3"\r
          >\r
            <div>\r
              {{ card.cta.text }}\r
            </div>\r
            <div\r
              class="flex items-center justify-center bg-gradient-to-b from-gold via-lightGold to-darkGold rounded-full ml-2 w-4 h-4"\r
            >\r
              <nuxt-icon :name="card.cta.icon" class="text-sm text-coffee" />\r
            </div>\r
          </NuxtLink>\r
        </div>\r
      </div>\r
      <div class="flex items-center justify-center">\r
\r
        <p style="max-width: 36em" class="text-center text-sm">\r
          {{ props.component.content?.subline }}\r
        </p>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss"></style>\r
`,Y=`<script setup lang="ts">\r
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
    if (true) {\r
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
    console.log("flickedLeft", state.flickedLeft);\r
    if (state.flickedLeft) next();\r
    if (state.flickedRight) prev();\r
  };\r
\r
  const handleResize = () => {\r
    state.vw = window.innerWidth;\r
  };\r
  onMounted(() => {\r
    if (true) state.vw = window.innerWidth;\r
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
        @touchstart="startTracking"\r
        @touchmove="trackMovement"\r
        @touchend="stopTracking"\r
        @touchcancel="stopTracking"\r
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
`,Z={class:"p-4"},J=["onClick"],K=h({__name:"ComponentSelector",setup(f){const a=y(),s=w(),{setComponentContent:o,setComponentContentType:c,saveContent:u,saveContentType:d}=a,{decapitalize:m}=s,{componentContent:g,componentContentType:v}=k(a),x=r=>{c(r),o($.find(t=>t.type===m(r)).content),u(!0),setTimeout(()=>{d(!0),z.emit("refresh")},500)},p=Object.keys(Object.assign({"/components/global/Component/BookingCalendar.vue":M,"/components/global/Component/Default.vue":P,"/components/global/Component/Faq.vue":V,"/components/global/Component/HeroBig.vue":G,"/components/global/Component/HeroSmall.vue":N,"/components/global/Component/ImageList.vue":q,"/components/global/Component/ImageRotation.vue":O,"/components/global/Component/MyWork.vue":X,"/components/global/Component/Offer.vue":W,"/components/global/Component/PortraitText.vue":A,"/components/global/Component/Prices.vue":H,"/components/global/Component/Testimonials.vue":Y})).map(r=>{const t=r.split("/");return t[t.length-1].split(".")[0]});return(r,t)=>{const S=I;return n(),e("div",Z,[(n(!0),e(R,null,j(i(p),(l,C)=>(n(),e("button",{key:"component"+C,onClick:en=>x(l),class:U(["flex w-full items-center gap-2",[{"bg-white bg-opacity-20 rounded":i(v)===l}]])},[_(S,{name:`icon-${l}`,style:{"font-size":"60px"},class:"text-lightBlue"},null,8,["name"]),T("div",null,F(l),1)],10,J))),128))])}}}),Q={key:0},nn={key:1},on=h({__name:"Component",props:{selectedMode:{default:0}},emits:["setContentType"],setup(f,{emit:a}){const s=f,o=y();D();const{setComponentType:c}=o,{componentCss:u,componentContentType:d}=k(o),m=w(),{capitalize:g}=m;return E(()=>{c("component")}),(v,x)=>{const p=K;return n(),e("div",null,[s.selectedMode===0?(n(),e("div",Q,[_(p,{class:"border-b border-darkOffwhite border-opacity-20"})])):b("",!0),s.selectedMode===1?(n(),e("div",nn,[(n(),B(L("Sidebar"+i(g)(i(d)))))])):b("",!0)])}}});export{on as default};
