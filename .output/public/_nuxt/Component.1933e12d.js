import{_ as I}from"./nuxt-icon.vue.3a191a4b.js";import{d as j}from"./defaults.3f415bf8.js";import{a as h,k as y,U as w,s as _,o as n,f as e,F as $,j as U,v as R,u as i,i as k,h as B,t as D,V as T,m as V,q as E,l as x,c as F,X as M}from"./entry.4f396710.js";const G=`<script setup lang="ts">\r
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
            :class="[state.currentStep === step.id ? 'text-black font-bold' : 'text-lightGrey']"\r
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
`,z=`<script setup lang="ts">\r
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
`,L=`<script setup lang="ts">\r
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
    class="h-[400px] lg:h-[900px] relative bg-black text-white overflow-visible"\r
  >\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-start">\r
        <div class="mt-10 sm:ml-10 md:ml-20">\r
          <h2\r
            style="max-width: 15em"\r
            class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-10"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
          <NuxtLink\r
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
              <nuxt-icon :name="props.component.content.cta.icon" class="text-sm text-black" />\r
            </div>\r
          </NuxtLink>\r
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
        class="w-full h-full bg-cover bg-[60%] lg:bg-bottom"\r
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
`,N=`<script setup lang="ts">\r
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
`,A=`<script setup lang="ts">\r
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
              <nuxt-icon :name="card.cta.icon" class="text-sm text-black" />\r
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
`,H={class:"p-4"},X=["onClick"],Z=h({__name:"ComponentSelector",setup(f){const a=y(),s=w(),{setComponentContent:l,setComponentContentType:c,saveContent:u,saveContentType:d}=a,{decapitalize:m}=s,{componentContent:g,componentContentType:v}=_(a),b=r=>{c(r),l(j.find(t=>t.type===m(r)).content),u(!0),setTimeout(()=>{d(!0),T.emit("refresh")},500)},p=Object.keys(Object.assign({"/components/global/Component/BookingCalendar.vue":G,"/components/global/Component/Default.vue":P,"/components/global/Component/Faq.vue":z,"/components/global/Component/HeroBig.vue":L,"/components/global/Component/HeroSmall.vue":q,"/components/global/Component/ImageList.vue":N,"/components/global/Component/ImageRotation.vue":O,"/components/global/Component/Prices.vue":A})).map(r=>{const t=r.split("/");return t[t.length-1].split(".")[0]});return(r,t)=>{const S=I;return n(),e("div",H,[(n(!0),e($,null,U(i(p),(o,C)=>(n(),e("button",{key:"component"+C,onClick:Q=>b(o),class:R(["flex w-full items-center gap-2",[{"bg-white bg-opacity-20 rounded":i(v)===o}]])},[k(S,{name:`icon-${o}`,style:{"font-size":"60px"},class:"text-lightBlue"},null,8,["name"]),B("div",null,D(o),1)],10,X))),128))])}}}),J={key:0},K={key:1},en=h({__name:"Component",props:{selectedMode:{default:0}},emits:["setContentType"],setup(f,{emit:a}){const s=f,l=y();V();const{setComponentType:c}=l,{componentCss:u,componentContentType:d}=_(l),m=w(),{capitalize:g}=m;return E(()=>{c("component")}),(v,b)=>{const p=Z;return n(),e("div",null,[s.selectedMode===0?(n(),e("div",J,[k(p,{class:"border-b border-darkOffwhite border-opacity-20"})])):x("",!0),s.selectedMode===1?(n(),e("div",K,[(n(),F(M("Sidebar"+i(g)(i(d)))))])):x("",!0)])}}});export{en as default};
