import{_ as M}from"./DYqNPgwz.js";import{f as I,h as P,i as j,s as T,r as O,l as z,o as i,c as a,A as _,B as k,n as t,a as o,d as B,F as L,x as V,b as R,t as N,z as A,y as G,u as q,m as W,v as S,q as H,D as J}from"./COIFjB77.js";import{d as C}from"./F1WjrixK.js";const X=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  import WaveSurfer from "wavesurfer.js";\r
  import { waitForDOM, setCookie } from "~/lib/helpers";\r
\r
  const { pb } = usePocketbase();\r
\r
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
    audios: [],\r
    mail: "",\r
    subscriptionPending: false,\r
    subscriptionSubmitted: false,\r
    errors: [],\r
    successes: [],\r
  });\r
\r
  const getCurrentFileUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "mp3",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
  const createAudioInstance = (index, container, file) => {\r
    console.log("createAudioInstance", index);\r
    const audioInstance = WaveSurfer.create({\r
      container: container,\r
      height: 28,\r
      width: "auto",\r
      splitChannels: false,\r
      normalize: true,\r
      waveColor: "#D2C4B5",\r
      progressColor: "#814515",\r
      cursorColor: "#44B57A",\r
      cursorWidth: 1,\r
      barWidth: 3,\r
      barGap: 9,\r
      barRadius: 9,\r
      barHeight: 1,\r
      barAlign: "",\r
      fillParent: true,\r
      url: file,\r
      mediaControls: false,\r
      autoplay: false,\r
      interact: true,\r
      dragToSeek: true,\r
      hideScrollbar: false,\r
      audioRate: 1,\r
      autoScroll: true,\r
      autoCenter: true,\r
      sampleRate: 8000,\r
    });\r
    audioInstance.on("audioprocess", function () {\r
      if (audioInstance.isPlaying()) {\r
        let totalTime = audioInstance.getDuration();\r
        let currentTime = audioInstance.getCurrentTime();\r
        let remainingTime = totalTime - currentTime;\r
\r
        // state.audios[index].times.total = totalTime.toFixed(1)\r
        state.audios[index].isPlaying = true;\r
        state.audios[index].times.current = currentTime.toFixed(1);\r
        state.audios[index].times.remaining = remainingTime.toFixed(1);\r
      } else {\r
        state.audios[index].isPlaying = false;\r
      }\r
    });\r
    audioInstance.on("ready", function () {\r
      const totalTime = audioInstance.getDuration();\r
      state.audios[index].times.total = totalTime.toFixed(1);\r
    });\r
    state.audios.push({\r
      instance: audioInstance,\r
      times: { total: 0, current: 0, remaining: 0 },\r
      isPlaying: false,\r
    });\r
  };\r
  const formatTime = (seconds) => {\r
    var minutes = Math.floor(seconds / 60);\r
    var remainingSeconds = Math.floor(seconds % 60);\r
\r
    // Add leading zero if necessary\r
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;\r
\r
    return minutes + ":" + remainingSeconds;\r
  };\r
  const togglePlayPause = (index) => {\r
    state.audios[index].instance.playPause();\r
  };\r
  const addError = (error) => {\r
    state.errors.push(error);\r
    setTimeout(() => {\r
      clearErrors();\r
    }, 3000);\r
  };\r
  const clearErrors = () => {\r
    state.errors = [];\r
  };\r
  \r
  const addSuccess = (success) => {\r
    setCookie("subscribed", true);\r
    state.successes.push(success);\r
    state.mail = "";\r
    setTimeout(() => {\r
      clearSuccesses();\r
    }, 3000);\r
  };\r
  const clearSuccesses = () => {\r
    state.successes = [];\r
  };\r
  const isValidEmail = (email) => {\r
    // Check if the string contains '@' and '.'\r
    if (email.includes("@") && email.includes(".")) {\r
      // Split the email address by '@'\r
      const parts = email.split("@");\r
      // Check if there are exactly two parts\r
      if (parts.length === 2) {\r
        // Check if the second part (domain) contains '.'\r
        if (parts[1].includes(".")) {\r
          return true;\r
        }\r
      }\r
    }\r
    return false;\r
  };\r
  const subscribe = async () => {\r
    if (!state.mail) {\r
      addError("Bitte gib eine E-Mail ein.");\r
      return;\r
    }\r
    if (!isValidEmail(state.mail)) {\r
      addError("Bitte gib eine gültige E-Mail Adresse ein.");\r
      return;\r
    }\r
    if (!state.subscriptionPending) {\r
      state.subscriptionPending = true;\r
\r
      try {\r
        const resultList = await pb.collection("subscriptions").getList(1, 50, {\r
          filter: \`mail = "\${state.mail}"\`,\r
        });\r
        if (resultList.items.length > 0) {\r
          addError("Diese E-Mail Adresse ist bereits registriert.");\r
          state.subscriptionPending = false;\r
          return;\r
        }\r
\r
        const res = await pb.collection("subscriptions").create({\r
          mail: state.mail,\r
        });\r
\r
        addSuccess("Du hast Dich erfolgreich eingetragen.");\r
        state.subscriptionPending = false;\r
        return true;\r
      } catch (err) {\r
        console.log("err", err);\r
        state.subscriptionPending = false;\r
      }\r
\r
      setTimeout(() => {\r
        state.subscriptionPending = false;\r
      }, 1000);\r
    }\r
  };\r
  const mountAudios = () => {\r
    for (const audio of Object.entries(props.component.content.audios)) {\r
      const index = audio[0];\r
      const value = audio[1];\r
      const containerSelector = "#audio" + index;\r
      createAudioInstance(index, containerSelector, getCurrentFileUrl(value.file));\r
    }\r
  };\r
\r
  onMounted(async () => {\r
    if (process.client) {\r
      waitForDOM("audio0", mountAudios);\r
    }\r
  });\r
<\/script>\r
\r
<template>\r
  <div class="py-16 md:py-24 relative">\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <IntersectonPop>\r
          <h2\r
            class="shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
        </IntersectonPop>\r
      </div>\r
\r
      <div class="flex flex-col items-center gap-8 relative mb-32">\r
        <div\r
          v-for="(audio, index) in props.component.content.audios"\r
          :key="'audio' + index"\r
          class="w-full md:w-1/2 md:max-w-[500px] shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10"\r
        >\r
          <div\r
            class="mb-4 font-heading text-lg lg:text-xl flex items-center gap-4 border-b border-coffee border-opacity-10 px-6 py-3"\r
          >\r
            {{ audio.name }}\r
          </div>\r
          <div class="px-6 pt-1 pb-5">\r
            <div class="relative w-full h-full">\r
              <div\r
                v-if="state.audios.length > 0"\r
                class="absolute left-0 top-1/2 transform -translate-y-1/2"\r
              >\r
                {{ formatTime(Number(state.audios[index]?.times.total)) }}\r
              </div>\r
              <div\r
                :id="'audio' + index"\r
                class="inline-block ml-[60px] h-7 w-[calc(100%-100px)] overflow-hidden"\r
              ></div>\r
              <button\r
                v-if="state.audios?.length > 0"\r
                @click="togglePlayPause(index)"\r
                class="inline-flex ml-[4px] w-[32px] h-[32px] items-center justify-center border border-coffee border-opacity-30 align-top rounded-lg"\r
              >\r
                <nuxt-icon\r
                  v-if="state.audios[index]?.isPlaying"\r
                  name="icon-pause"\r
                  class="text-4xl"\r
                />\r
                <nuxt-icon v-else name="icon-play" class="text-4xl" />\r
              </button>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <div class="flex justify-center relative mb-12">\r
        <div\r
          style="background-image: radial-gradient(circle, #faf1df 0%, transparent 60%)"\r
          class="absolute left-1/2 top-1/2 -z-10 w-[1600px] h-[1600px] transform -translate-x-1/2 -translate-y-1/2"\r
        ></div>\r
        <div class="max-w-lg text-2xl font-heading text-center">\r
          {{ props.component.content.description }}\r
        </div>\r
      </div>\r
\r
      <div class="relative">\r
        <form @submit.prevent="subscribe" class="flex items-center gap-4 justify-center">\r
          <input\r
            type="text"\r
            v-model="state.mail"\r
            :placeholder="props.component.content.placeholder"\r
            class="px-5 py-2 shadow-xl shadow-coffee/5 rounded-full flex-grow max-w-[300px] border border-coffee border-opacity-10"\r
          />\r
          <button\r
            @click="subscribe"\r
            :class="[{ 'pointer-events-none cursor-default': state.subscriptionPending }]"\r
            class="shadow-xl shadow-coffee/20 bg-salmon px-5 py-2 rounded-full text-white flex-shrink-0 flex items-center justify-center"\r
          >\r
            <div v-show="!state.subscriptionPending">\r
              {{ props.component.content.cta }}\r
            </div>\r
            <div v-show="state.subscriptionPending" class="animate-spin">\r
              <nuxt-icon name="icon-pending" class="text-2xl text-white" />\r
            </div>\r
          </button>\r
          <input type="submit" class="hidden" />\r
        </form>\r
        <div\r
          v-for="(error, index) in state.errors"\r
          :key="index"\r
          class="absolute w-full top-full flex flex-col items-center mt-4"\r
        >\r
          <div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg">\r
            {{ error }}\r
          </div>\r
        </div>\r
        <div\r
          v-for="(success, index) in state.successes"\r
          :key="index"\r
          class="absolute w-full top-full flex flex-col items-center mt-4"\r
        >\r
          <div class="bg-green px-3 py-1 text-white rounded-lg">\r
            {{ success }}\r
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
`,K=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"})),Y=`<script setup lang="ts">\r
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
          class="w-full lg:w-2/3 border-2 rounded border-green bg-green bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"\r
        >\r
          Vielen Dank für Deine Buchung. <br />\r
          Ich melde mich zeitnah per E-Mail bei Dir.\r
        </div>\r
      </div>\r
      <div v-else class="flex justify-center my-20">\r
        <div\r
          class="w-full lg:w-2/3 border-2 rounded border-red bg-red bg-opacity-40 inline-block px-6 py-4 mb-10 text-center"\r
        >\r
          Bei der Übermittlung Deiner Daten ist leider ein Fehler aufgetreten. <br />Versuch es\r
          bitte erneut. Sollte das Problem weiterhin bestehen, schreib mir bitte eine Mail an\r
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
            :class="[state.currentStep === step.id ? 'bg-salmon/60' : 'bg-darkOffwhite']"\r
            class="w-full h-[5px] rounded relative"\r
          >\r
            <div\r
              :class="[\r
                state.currentStep === step.id\r
                  ? 'bg-salmon'\r
                  : 'bg-darkOffwhite',\r
              ]"\r
              class="w-5 h-5 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"\r
            >\r
              <nuxt-icon v-if="stepIsValid(step.id)" name="icon-check" class="text-xl" />\r
            </div>\r
          </div>\r
          <div\r
            :class="[state.currentStep === step.id ? 'text-coffee' : 'text-lightGrey']"\r
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
`,Z=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"})),Q=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  import { waitForDOM } from "~/lib/helpers";\r
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
  const state = reactive({\r
    selectedIndex: 0,\r
    enrichedBlocks: [],\r
  });\r
\r
  const getHeightFromWidthAndTextWidth = (text) => {\r
    if (process.client) {\r
      try {\r
        const tempDiv = document.createElement("div");\r
        tempDiv.style.visibility = "hidden";\r
        tempDiv.innerText = text;\r
        document.getElementById("text-container").appendChild(tempDiv);\r
        const height = tempDiv.offsetHeight;\r
        document.getElementById("text-container").removeChild(tempDiv);\r
\r
        return height;\r
      } catch (err) {\r
        console.log("err", err);\r
        return 0;\r
      }\r
    }\r
  };\r
\r
  const enrichBlocks = () => {\r
    const array = JSON.parse(JSON.stringify(props.component.content.blocks));\r
    const enriched = array.map((block) => {\r
      return {\r
        heading: block.heading,\r
        text: block.text,\r
        height: getHeightFromWidthAndTextWidth(block.text),\r
      };\r
    });\r
    state.enrichedBlocks = enriched;\r
  };\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  onMounted(async () => {\r
    waitForDOM("text-container", enrichBlocks);\r
\r
    // getHeightFromWidthAndTextWidth(JSON.parse(JSON.stringify(props.component.content.blocks))[0].text)\r
  });\r
  onUnmounted(() => {});\r
<\/script>\r
\r
<template>\r
  <div :class="[{ '-mt-24': props.isFirst }]" class="relative overflow-visible">\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="flex flex-col lg:flex-row gap-10">\r
        <div class="my-20">\r
          <!-- mobile -->\r
          <div\r
            v-for="(block, index) in props.component.content.blocks"\r
            :key="'block' + index"\r
            class="lg:hidden"\r
          >\r
            <IntersectonPop>\r
              <div class="shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-2xl mb-6">\r
                {{ block.heading }}\r
              </div>\r
            </IntersectonPop>\r
            <p\r
              class="markdown mb-10"\r
              v-html="$mdRenderer.set({ html: true }).render(block.text)"\r
            ></p>\r
          </div>\r
\r
          <!-- desktop -->\r
          <div class="hidden lg:block">\r
            <div class="flex flex-row gap-16">\r
              <div>\r
                <div\r
                  v-for="(block, index) in props.component.content.blocks"\r
                  :key="'block' + index"\r
                >\r
                  <button\r
                    @click="state.selectedIndex = index"\r
                    :class="[\r
                      index === state.selectedIndex\r
                        ? 'text-salmon border-coffee/20'\r
                        : 'text-salmon/60 border-transparent',\r
                    ]"\r
                    class="font-heading text-lg sm:text-xl md:text-2xl mb-2 whitespace-nowrap relative hover:text-salmon hover:border-coffee/10 transition py-2 px-5 border rounded-full"\r
                  >\r
                    {{ block.heading }}\r
                    <!-- <div\r
                      v-show="index === state.selectedIndex"\r
                      class="absolute top-1/2 -left-2 transform -translate-x-full -translate-y-1/2 w-2 h-2 mt-0.5 rounded-full bg-coffee"\r
                    ></div> -->\r
                  </button>\r
                </div>\r
              </div>\r
              <div id="text-container" class="leading-loose">\r
                <p\r
                  v-if="state.enrichedBlocks.length > 0"\r
                  :style="{ height: \`\${state.enrichedBlocks[state.selectedIndex].height}px\` }"\r
                  class="markdown transition-all duration-300"\r
                  v-html="\r
                    $mdRenderer\r
                      .set({ html: true })\r
                      .render(state.enrichedBlocks[state.selectedIndex].text)\r
                  "\r
                ></p>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style lang="scss">\r
  .markdown {\r
    p {\r
      @apply mb-4;\r
    }\r
  }\r
  .animate-height {\r
    animation: 600ms ease-in both height;\r
  }\r
\r
  @keyframes height {\r
    0% {\r
      max-height: 0px;\r
    }\r
    100% {\r
      max-height: 2000px;\r
    }\r
  }\r
</style>\r
`,ee=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"})),re=`<script setup lang="ts">\r
  import useBrevo from "~~/composables/useBrevo";\r
  import defaults from "~/lib/defaults";\r
\r
  const { sendMail } = useBrevo();\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "contact").content,\r
      },\r
    }\r
  );\r
\r
  const state = reactive({\r
    form: [\r
      {\r
        name: "firstName",\r
        validation: "required",\r
        label: "Vorname",\r
        type: "text",\r
        value: "",\r
        class: "w-full lg:w-1/2",\r
        error: "",\r
      },\r
      {\r
        name: "lastName",\r
        validation: "required",\r
        label: "Nachname",\r
        type: "text",\r
        value: "",\r
        class: "w-full lg:w-1/2",\r
        error: "",\r
      },\r
      {\r
        name: "mail",\r
        validation: "required",\r
        label: "E-Mail",\r
        type: "text",\r
        value: "",\r
        class: "w-full lg:w-1/2",\r
        error: "",\r
      },\r
      {\r
        name: "phone",\r
        validation: "",\r
        label: "Telefonnummer",\r
        type: "text",\r
        value: "",\r
        class: "w-full lg:w-1/2",\r
        error: "",\r
      },\r
      {\r
        name: "message",\r
        validation: "required",\r
        label: "Nachricht",\r
        type: "textarea",\r
        value: "",\r
        class: "w-full",\r
        error: "",\r
      },\r
    ],\r
    pending: false,\r
    submitted: false,\r
    success: false,\r
  });\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
\r
  const validateForm = () => {\r
    let errors = [];\r
    for (let input of state.form) {\r
      if (input.validation === "required") {\r
        if (!input.value) {\r
          input.error = "Fülle bitte dieses Feld aus.";\r
          errors.push(1);\r
        } else input.error = "";\r
      }\r
    }\r
    if (errors.length > 0) return false;\r
    return true;\r
  };\r
\r
  const getFormData = () => {\r
    let result = {};\r
    state.form.forEach((field) => {\r
      result[field.name] = field.value;\r
    });\r
    return result;\r
  };\r
\r
  const handleSubmit = async () => {\r
    state.pending = true;\r
    try {\r
      const formIsValid = validateForm();\r
      if (!formIsValid) return;\r
\r
      await sendMail("contactForm", props.component.content?.recipient, getFormData());\r
      state.pending = false;\r
      state.submitted = true;\r
      state.success = true;\r
    } catch (err) {\r
      console.log("error sending contact form", err);\r
      state.pending = false;\r
      state.submitted = true;\r
      state.success = false;\r
    }\r
  };\r
<\/script>\r
\r
<template>\r
  <div class="mb-28">\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <IntersectonPop>\r
        <h2\r
          class="shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center"\r
        >\r
          {{ props.component.content?.heading }}\r
        </h2>\r
      </IntersectonPop>\r
      </div>\r
      <div class="flex flex-col lg:flex-row gap-16">\r
        <div\r
          :style="[\r
            { backgroundImage: \`url(\${getCurrentImageUrl(props.component.content.image)})\` },\r
          ]"\r
          class="flex-grow bg-cover shadow-2xl shadow-coffee/20 w-full h-60 lg:h-auto lg:w-1/3 rounded"\r
        ></div>\r
        <div class="-ml-[3%] -mr-[5%] lg:mx-auto w-auto lg:w-2/3">\r
          <div\r
            class="bg-white shadow-2xl shadow-coffee/20 py-5 px-10"\r
          >\r
            <template v-if="!state.submitted">\r
              <div class="flex flex-wrap -mx-3">\r
                <div\r
                  v-for="(input, index) in state.form"\r
                  :key="'formElement' + index"\r
                  :class="[input.class]"\r
                  class="px-2 mt-3"\r
                >\r
                  <label :for="'input' + index" class="text-sm block ml-1"\r
                    >{{ input.label }}\r
                    <template v-if="input.validation === 'required'"> </template>\r
                    <template v-else> (optional) </template>\r
                  </label>\r
                  <template v-if="input.type === 'text'">\r
                    <input\r
                      :id="'input' + index"\r
                      type="text"\r
                      v-model="input.value"\r
                      @input="validateForm"\r
                      :class="[input.error.length ? 'border !border-red' : '']"\r
                      class="input-class"\r
                    />\r
                  </template>\r
                  <template v-if="input.type === 'textarea'">\r
                    <textarea\r
                      :id="'input' + index"\r
                      v-model="input.value"\r
                      @input="validateForm"\r
                      class="input-class min-h-[200px]"\r
                      :class="[input.error ? 'border !border-red' : '']"\r
                    ></textarea>\r
                  </template>\r
                  <div\r
                    v-if="input.error"\r
                    class="mt-1 rounded text-red bg-lightRed/60 px-2 py-[2px] text-sm"\r
                  >\r
                    {{ input.error }}\r
                  </div>\r
                </div>\r
                <div class="flex justify-end w-full mr-3 mt-3">\r
                  <button\r
                    @click="handleSubmit"\r
                    class="bg-salmon rounded-full text-white flex items-center px-5 py-2 shadow-md shadow-coffee/10"\r
                  >\r
                    <div class="">Nachricht senden</div>\r
                  </button>\r
                </div>\r
              </div>\r
            </template>\r
            <template v-else>\r
                <div class="h-60 flex flex-col items-start justify-center">\r
                  <template v-if="state.pending">\r
                    <div class="animate-spin">\r
                      <nuxt-icon name="icon-pending" class="text-4xl text-black animate-spin" />\r
                    </div>\r
                  </template>\r
                  <template v-else>\r
                    <template v-if="state.success">\r
                      <div class="font-heading text-2xl mb-2">Vielen Dank!</div>\r
                      <p class="max-w-[24em]">\r
                        Deine Nachricht ist bei mir eingegangen. Ich melde mich sobald wie möglich bei Dir.\r
                      </p>\r
                    </template>\r
                    <template v-else>\r
                      <div class="font-heading text-2xl mb-2 text-red">Oh!</div>\r
                      <p class="max-w-[24em]">\r
                        Bei dem Versand Deiner Nachricht ist ein Fehler aufgetreten. Versuche es bitte erneut. Falls der Fehler bestehen bleibt, sende mir bitte eine E-Mail an <a href="mailto:kontakt@eileengeorge.de" class="underline">kontakt@eileengeorge.de</a>.\r
                      </p>\r
                    </template>\r
                  </template>\r
              </div>\r
            </template>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
  .input-class {\r
    @apply border border-gray-200 rounded px-3 py-1 w-full;\r
  }\r
</style>\r
`,ne=Object.freeze(Object.defineProperty({__proto__:null,default:re},Symbol.toStringTag,{value:"Module"})),te=`<template>\r
  <div class="max-container">\r
    <div class="p-20">Default Component</div>\r
  </div>\r
</template>\r
`,se=Object.freeze(Object.defineProperty({__proto__:null,default:te},Symbol.toStringTag,{value:"Module"})),oe=`<script setup lang="ts">\r
  import defaults from "~/lib/defaults";\r
  import { setCookie, getCookie } from "~/lib/helpers";\r
  const { pb } = usePocketbase();\r
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
  const downloads = await pb.collection("downloads").getFullList(200 /* batch size */);\r
\r
  const state = reactive({\r
    newsletterSignupOpen: false,\r
    mail: "",\r
    subscriptionPending: false,\r
    subscriptionSubmitted: false,\r
    errors: [],\r
    successes: [],\r
    userSubribed: false,\r
  });\r
\r
  const getCurrentImageUrl = (id, filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\`\${config.public.SERVER_URL}/api/files/downloads/\${id}/\${filename}\`, {\r
      format: "webp",\r
    });\r
    return imgUrl;\r
  };\r
\r
  const addError = (error) => {\r
    state.errors.push(error);\r
    setTimeout(() => {\r
      clearErrors();\r
    }, 3000);\r
  };\r
  const clearErrors = () => {\r
    state.errors = [];\r
  };\r
\r
  const addSuccess = (success) => {\r
    setCookie("subscribed", true);\r
    state.successes.push(success);\r
    state.mail = "";\r
    setTimeout(() => {\r
      clearSuccesses();\r
    }, 3000);\r
  };\r
  const clearSuccesses = () => {\r
    state.successes = [];\r
  };\r
  const isValidEmail = (email) => {\r
    // Check if the string contains '@' and '.'\r
    if (email.includes("@") && email.includes(".")) {\r
      // Split the email address by '@'\r
      const parts = email.split("@");\r
      // Check if there are exactly two parts\r
      if (parts.length === 2) {\r
        // Check if the second part (domain) contains '.'\r
        if (parts[1].includes(".")) {\r
          return true;\r
        }\r
      }\r
    }\r
    return false;\r
  };\r
  const subscribe = async () => {\r
    if (!state.mail) {\r
      addError("Bitte gib eine E-Mail ein.");\r
      return;\r
    }\r
    if (!isValidEmail(state.mail)) {\r
      addError("Bitte gib eine gültige E-Mail Adresse ein.");\r
      return;\r
    }\r
    if (!state.subscriptionPending) {\r
      state.subscriptionPending = true;\r
\r
      try {\r
        const resultList = await pb.collection("subscriptions").getList(1, 50, {\r
          filter: \`mail = "\${state.mail}"\`,\r
        });\r
        if (resultList.items.length > 0) {\r
          addError("Diese E-Mail Adresse ist bereits registriert.");\r
          state.subscriptionPending = false;\r
          return;\r
        }\r
\r
        const res = await pb.collection("subscriptions").create({\r
          mail: state.mail,\r
        });\r
\r
        addSuccess("Du hast Dich erfolgreich eingetragen.");\r
        state.subscriptionPending = false;\r
        state.userSubribed = true;\r
        state.newsletterSignupOpen = false;\r
        return true;\r
      } catch (err) {\r
        console.log("err", err);\r
        state.subscriptionPending = false;\r
      }\r
\r
      setTimeout(() => {\r
        state.subscriptionPending = false;\r
      }, 1000);\r
    }\r
  };\r
\r
  const downloadFile = async (id, filename) => {\r
    try {\r
      // const url = product.url\r
      const url = \`\${config.public.SERVER_URL}/api/files/downloads/\${id}/\${filename}\`;\r
      console.log("url", url);\r
      const res = await $fetch(url);\r
\r
      console.log("download res", res);\r
\r
      const blob = new Blob([res], { type: res.type });\r
      const a = document.createElement("a");\r
      a.setAttribute("href", URL.createObjectURL(blob));\r
      a.setAttribute("download", filename);\r
      a.setAttribute("target", "_blank");\r
      a.click();\r
      URL.revokeObjectURL(a.href);\r
    } catch (err) {\r
      console.log("error in downloading template", err);\r
    }\r
  };\r
\r
  const handleDownload = (id, filename) => {\r
    console.log("state.userSubribed", state.userSubribed);\r
    if (!state.userSubribed) {\r
      state.newsletterSignupOpen = true;\r
      return;\r
    }\r
    downloadFile(id, filename);\r
  };\r
\r
  onMounted(() => {\r
    const userSubribed = getCookie("subscribed");\r
    if (userSubribed) state.userSubribed = true;\r
  });\r
  onUnmounted(() => {});\r
<\/script>\r
\r
<template>\r
  <div class="py-16 md:py-24 relative">\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center">\r
        <div class="mt-10">\r
          <IntersectonPop>\r
            <h2\r
              v-if="props.component.content.heading"\r
              style="max-width: 15em"\r
              class="shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"\r
              v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"\r
            ></h2>\r
          </IntersectonPop>\r
        </div>\r
        <div class="flex-grow flex flex-col md:flex-row md:flex-wrap -mx-3">\r
          <div class="px-3 w-full md:w-1/2" v-for="(download, index) in downloads"\r
              :key="'audio' + index">\r
            <div\r
              v-if="state.newsletterSignupOpen"\r
              class="shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10 py-4 px-5"\r
            >\r
              <h3 class="font-heading text-lg md:text-2xl mb-4 mt-1 ml-1">Datei herunterladen</h3>\r
              <p class="pl-1">\r
                Um diese Datei herunterzuladen, gib bitte Deine E-Mail-Adresse ein. Damit trägst Du\r
                Dich gleichzeitig in meinen Newsletter ein. Ich verwende Deine Daten ausschließlich\r
                um neue Meditationen und Inspiration mit Dir zu teilen. Ich werde Deine\r
                E-Mail-Adresse nicht für andere Zwecke verwenden oder weitergeben, versprochen.\r
              </p>\r
              <div class="relative">\r
                <form\r
                  @submit.prevent="subscribe"\r
                  class="flex items-center gap-4 justify-start mt-5 mb-1"\r
                >\r
                  <input\r
                    type="text"\r
                    v-model="state.mail"\r
                    placeholder="E-Mail Adresse"\r
                    class="px-5 py-2 shadow-xl shadow-coffee/5 rounded-full flex-grow border border-coffee border-opacity-10"\r
                  />\r
                  <button\r
                    type="submit"\r
                    :class="[{ 'pointer-events-none cursor-default': state.subscriptionPending }]"\r
                    class="shadow-xl shadow-coffee/20 bg-salmon px-5 py-2 rounded-full text-white flex-shrink-0 flex items-center justify-center"\r
                  >\r
                    <div v-show="!state.subscriptionPending">Eintragen</div>\r
                    <div v-show="state.subscriptionPending" class="animate-spin">\r
                      <nuxt-icon name="icon-pending" class="text-2xl text-white" />\r
                    </div>\r
                  </button>\r
                  <input type="submit" class="hidden" />\r
                </form>\r
                <div v-for="(error, index) in state.errors" :key="index" class="w-full mt-4">\r
                  <div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg">\r
                    {{ error }}\r
                  </div>\r
                </div>\r
                <div v-for="(success, index) in state.successes" :key="index" class="mt-4">\r
                  <div class="bg-green px-3 py-1 text-white rounded-lg">\r
                    {{ success }}\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
            <div\r
              v-else\r
              \r
              class="shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10 flex h-full"\r
            >\r
            <!-- <div class="absolute top-2 left-2 px-2 py-0.5 bg-white/70 rounded z-10 text-sm">\r
              .{{ download.filetype }}\r
            </div> -->\r
              <div\r
                :style="[\r
                  {\r
                    backgroundImage: \`url(\${getCurrentImageUrl(download.id, download.thumbnail)})\`,\r
                  },\r
                ]"\r
                class="relative w-1/3 h-full bg-cover bg-center flex-grow-0 flex-shrink-0"\r
              ></div>\r
              <div>\r
                <div\r
                  class="mb-4 font-heading text-lg lg:text-xl gap-4 border-b border-coffee border-opacity-10 px-6 py-3 flex items-center justify-between"\r
                >\r
                  {{ download.name }}\r
                  <div class="font-body text-sm text-coffee/50">\r
                    {{ new Date(download.created).toLocaleDateString("de-DE") }}\r
                  </div>\r
                </div>\r
                <div class="px-6 pt-1 pb-5">\r
                  <div class="flex gap-10">\r
                    <div class="flex-grow">\r
                      <div class="pl-1">\r
                        {{ download.description }}\r
                      </div>\r
                      <button\r
                        @click="handleDownload(download.id, download.file)"\r
                        class="flex items-center justify-center flex-shrink-0 mt-4 mb-1"\r
                      >\r
                        <div\r
                          class="flex items-center justify-center gap-1 pl-3 pr-2 py-1 border border-grey/20 rounded-full hover:bg-salmon/80 text-coffee hover:text-white transition capitalize"\r
                        >\r
                        {{ download.filetype }}\r
                        Herunterladen\r
                          <nuxt-icon name="icon-download" class="text-2xl -ml-1" />\r
                        </div>\r
                      </button>\r
                    </div>\r
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
<style>\r
  .slide:last-child {\r
    .connector {\r
      display: none;\r
    }\r
  }\r
</style>\r
`,ie=Object.freeze(Object.defineProperty({__proto__:null,default:oe},Symbol.toStringTag,{value:"Module"})),le=`<script setup lang="ts">\r
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
        <IntersectonPop>\r
        <h2\r
          class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"\r
        >\r
          {{ props.component.content.heading }}\r
        </h2>\r
      </IntersectonPop>\r
      </div>\r
      <div class="flex flex-col gap-6">\r
        <FaqEntry v-for="(faq, index) in props.component.content?.faqs" :faq="faq" />\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
</style>\r
`,ae=Object.freeze(Object.defineProperty({__proto__:null,default:le},Symbol.toStringTag,{value:"Module"})),ce=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
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
    class="h-dvh lg:h-[900px] relative bg-[#F6F4F2] text-white overflow-visible"\r
  >\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center">\r
        <div class="mt-10">\r
          <IntersectonPop>\r
          <h2\r
            style="max-width: 15em"\r
            class="shiny-pop text-salmon font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"\r
            v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"\r
          >\r
          </h2>\r
        </IntersectonPop>\r
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
    <div class="w-full h-full absolute top-0 left-0 z-0">\r
      <div\r
        style="\r
          background-image: radial-gradient(\r
            circle at center,\r
            transparent 0%,\r
            #ffffff 100%\r
          );\r
          \r
        "\r
        class="w-full h-full opacity-100 absolute z-10"\r
      ></div>\r
      <div\r
        :style="[{ backgroundImage: \`url(\${getCurrentImageUrl(props.component.content.image)})\` }]"\r
        class="w-full h-full bg-cover bg-center opacity-80"\r
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
`,de=Object.freeze(Object.defineProperty({__proto__:null,default:ce},Symbol.toStringTag,{value:"Module"})),pe=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
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
  <div :class="[{ '-mt-24': props.isFirst}]" class="h-[300px] lg:h-[400px] relative text-white overflow-visible">\r
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">\r
    </div> -->\r
    <div class="max-container h-full relative z-10">\r
      <div class="h-full flex items-center justify-center">\r
        <div class="mt-10 mb-10">\r
          <IntersectonPop>\r
          <h2\r
            style="max-width: 15em"\r
            class="shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-5xl lg:text-6xl  text-center"\r
            v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"\r
          >\r
          </h2>\r
        </IntersectonPop>\r
          <div v-if="props.component.content.subline" class="text-coffee uppercase text-center text-xs sm:text-lg mt-6">\r
            {{ props.component.content.subline }}\r
          </div>\r
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
`,me=Object.freeze(Object.defineProperty({__proto__:null,default:pe},Symbol.toStringTag,{value:"Module"})),ue=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${props.component.content.image}\`,\r
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
        <IntersectonPop>\r
        <h2 class="shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-20">\r
          {{ props.component.content.heading }}\r
        </h2>\r
      </IntersectonPop>\r
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
`,fe=Object.freeze(Object.defineProperty({__proto__:null,default:ue},Symbol.toStringTag,{value:"Module"})),ge=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
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
      <IntersectonPop>\r
      <h2 class="shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-20">\r
        {{ props.component.content.heading }}\r
      </h2>\r
    </IntersectonPop>\r
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
`,ve=Object.freeze(Object.defineProperty({__proto__:null,default:ge},Symbol.toStringTag,{value:"Module"})),be=`<script setup lang="ts">\r
  import useBrevo from "~~/composables/useBrevo";\r
  import defaults from "~/lib/defaults";\r
\r
  const { sendMail } = useBrevo();\r
  const config = useRuntimeConfig();\r
\r
  const props = withDefaults(\r
    defineProps<{\r
      component?: object;\r
    }>(),\r
    {\r
      component: {\r
        content: defaults.find((el) => el.type === "map").content,\r
      },\r
    }\r
  );\r
\r
  const state = reactive({});\r
\r
  const getCurrentImageUrl = (filename) => {\r
    const img = useImage();\r
    const imgUrl = img(\r
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
      {\r
        format: "webp",\r
      }\r
    );\r
    return imgUrl;\r
  };\r
<\/script>\r
\r
<template>\r
  <div class="bg-white pb-24 text-coffee">\r
    <div class="max-container">\r
      <div class="flex flex-col lg:flex-row gap-10">\r
        <div class="w-full lg:w-1/3 flex flex-col gap-10 py-16 text-sm">\r
          <div class="flex items-start">\r
            <div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10">\r
              <nuxt-icon name="icon-marker" class="text-6xl text-coffee" />\r
            </div>\r
            <div\r
              v-html="$mdRenderer.set({ html: true }).render(props.component.content?.address)"\r
            ></div>\r
          </div>\r
          <div class="flex items-center">\r
            <div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10">\r
              <nuxt-icon name="icon-phone" class="text-6xl text-coffee" />\r
            </div>\r
            <div>\r
              <a :href="'tel:' + props.component.content?.phone" class="underline">{{\r
                props.component.content?.phone\r
              }}</a\r
              ><br />\r
              {{ props.component.content?.openinghours }}\r
            </div>\r
          </div>\r
          <div class="flex items-center">\r
            <div class="flex-shrink-0 mr-2 flex items-center justify-center w-20 h-10">\r
              <nuxt-icon name="icon-mail" class="text-5xl text-coffee" />\r
            </div>\r
            <div>\r
              <a :href="'mailto:' + props.component.content?.mail" class="underline">{{\r
                props.component.content?.mail\r
              }}</a>\r
            </div>\r
          </div>\r
        </div>\r
        <div class="w-full lg:w-2/3 flex flex-col lg:flex-row">\r
          <div class="w-full lg:w-1/2 h-80 lg:h-auto relative flex-grow-0 mb-4 lg:mb-0 lg:px-3">\r
            <iframe\r
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d287.4959587134769!2d9.380399237009717!3d54.79811157845696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b35d3f9dcb3963%3A0x6eec38a226cb1f32!2sWerkstra%C3%9Fe%205%2C%2024955%20Harrislee!5e0!3m2!1sen!2sde!4v1711322436183!5m2!1sen!2sde"\r
              class="overflow-hidden rounded w-full h-full"\r
              style="border: 0"\r
              allowfullscreen=""\r
              loading="lazy"\r
              referrerpolicy="no-referrer-when-downgrade"\r
            ></iframe>\r
          </div>\r
          <div\r
            :style="[\r
              { backgroundImage: \`url(\${getCurrentImageUrl(props.component?.content.image)})\` },\r
            ]"\r
            class="w-full lg:w-1/2 h-72 lg:h-auto bg-cover rounded lg:px-3"\r
          ></div>\r
        </div>\r
      </div>\r
    </div>\r
  </div>\r
</template>\r
\r
<style scoped lang="scss">\r
  .input-class {\r
    @apply border border-gray-200 rounded px-3 py-1 w-full;\r
  }\r
</style>\r
`,xe=Object.freeze(Object.defineProperty({__proto__:null,default:be},Symbol.toStringTag,{value:"Module"})),he=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
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
          <IntersectonPop>\r
          <h2\r
            class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
        </IntersectonPop>\r
\r
          <div class="flex flex-col lg:flex-row gap-16 items-center lg:items-start">\r
            <div class="max-w-[44rem]">\r
              <p class="markdown text-coffee" v-html="$mdRenderer.set({ html: true }).render(props.component.content.text)">\r
              </p>\r
              <NuxtLink :to="props.component.content.cta.link" class="inline-flex border border-salmon rounded-full text-coffee items-center px-5 py-2 shadow-md mt-3"> {{props.component.content.cta.text}} </NuxtLink>\r
            </div>\r
            <img :src="getCurrentImageUrl(props.component.content.image)" alt="Eileen George" class="w-full md:max-w-[380px] rounded-lg shadow-2xl shadow-coffee/30 -order-1 lg:order-1 flex-shrink-0">\r
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
`,ye=Object.freeze(Object.defineProperty({__proto__:null,default:he},Symbol.toStringTag,{value:"Module"})),we=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
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
          #FAF1DF 0%,\r
          transparent 60%\r
        );\r
      "\r
      class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2"\r
    ></div>\r
    <div class="max-container">\r
      <div class="flex items-center justify-center">\r
        <IntersectonPop>\r
        <h2\r
          class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"\r
        >\r
          {{ props.component.content.heading }}\r
        </h2>\r
      </IntersectonPop>\r
      </div>\r
\r
      <div class="flex flex-col md:flex-row itmes-stretch justify-center gap-16 relative">\r
        <div\r
          v-for="(offer, index) in props.component.content.offers"\r
          :key="'slide' + index"\r
          class="w-full md:w-1/2 md:max-w-[390px] shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden border border-coffee border-opacity-10"\r
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
                class="bg-salmon rounded-full text-white inline-flex items-center px-5 py-2 shadow-md"\r
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
`,_e=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"})),ke=`<script setup lang="ts">\r
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
      \`\${config.public.SERVER_URL}/api/files/\${props.component.collectionName}/\${props.component.id}/\${filename}\`,\r
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
      <div class="h-full flex items-center justify-center py-16 md:pt-32 md:pb-24">\r
        <div class="mt-10">\r
          <IntersectonPop>\r
          <h2\r
            class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-10 text-center text-salmon"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
        </IntersectonPop>\r
          <p class="text-coffee text-center max-w-[44rem]">\r
            {{ props.component.content.text }}\r
          </p>\r
        </div>\r
      </div>\r
    </div>\r
    <div\r
      class="w-24 h-24 sm:w-32 sm:h-32 lg:w-52 lg:h-52 absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl shadow-coffee/30"\r
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
`,Se=Object.freeze(Object.defineProperty({__proto__:null,default:ke},Symbol.toStringTag,{value:"Module"})),Ce=`<script setup lang="ts">\r
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
        <IntersectonPop>\r
        <h2 class="shiny-pop text-salmon font-bold text-lg md:text-xl lg:text-2xl mb-16">\r
          {{ props.component.content?.heading }}\r
        </h2>\r
      </IntersectonPop>\r
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
`,Ie=Object.freeze(Object.defineProperty({__proto__:null,default:Ce},Symbol.toStringTag,{value:"Module"})),Pe=`<script setup lang="ts">\r
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
    if (process.client) {\r
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
    if (process.client) state.vw = window.innerWidth;\r
    window.addEventListener("resize", handleResize);\r
  });\r
  onBeforeUnmount(() => {\r
    window.removeEventListener("resize", handleResize);\r
  });\r
<\/script>\r
\r
<template>\r
  <div class="py-16 md:py-24 relative">\r
    <div class="max-container !px-0 !md:px-3">\r
      <div class="flex items-center justify-center">\r
        <IntersectonPop>\r
          <h2\r
            class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center text-salmon"\r
          >\r
            {{ props.component.content.heading }}\r
          </h2>\r
        </IntersectonPop>\r
      </div>\r
\r
      <div\r
        id="carousel"\r
        @mousedown="startTracking"\r
        @mousemove="trackMovement"\r
        @mouseup="stopTracking"\r
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
                ? 'shadow-2xl shadow-coffee/10 scale-100'\r
                : 'shadow-sm shadow-coffee/10 scale-80',\r
            ]"\r
            class="bg-white px-8 pt-8 pb-12 h-full border border-coffee border-opacity-10 rounded-lg overflow-hidden transition-all duration-300 delay-100 transform"\r
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
          class="py-1 pl-1.5 pr-2.5 bg-salmon border-r border-orange border-opacity-30 text-white rounded-l-full hover:bg-opacity-90 transition shadow-md shadow-coffee/10"\r
        >\r
          <nuxt-icon name="icon-caret-left" class="text-2xl" />\r
        </button>\r
        <button\r
          @click="next"\r
          class="py-1 pr-1.5 pl-2.5 bg-salmon border-r border-orange border-opacity-30 text-white rounded-r-full hover:bg-opacity-90 transition shadow-md shadow-coffee/10"\r
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
`,je=Object.freeze(Object.defineProperty({__proto__:null,default:Pe},Symbol.toStringTag,{value:"Module"})),Te={class:"p-4"},Re=o("div",{class:"font-bold mb-2"}," Content löschen? ",-1),$e={class:"flex items-center justify-between mt-6"},De=["onClick"],Ue=I({__name:"ComponentSelector",setup(v){const{$event:b}=G(),c=P(),m=j(),{setComponentContent:x,setComponentContentType:u,saveContent:f,saveContentType:g}=c,{decapitalize:d}=m,{componentContent:h,componentType:$,componentContentType:p}=T(c),s=O({modalVisible:!1,componentTypeStore:""}),D=r=>{if(console.log("isDefaultComponentContent.value",w.value),!w.value){s.modalVisible=!0,s.componentTypeStore=r;return}y(r)},y=r=>{console.log("changeType"),s.modalVisible=!1,u(r),x(C.find(e=>e.type===d(r)).content),f(!0),setTimeout(()=>{g(!0),b("refresh")},500)},U=(r,e)=>{try{const l=JSON.stringify(r,Object.keys(r).sort()),n=JSON.stringify(e,Object.keys(e).sort());return l===n}catch{return!0}},w=z(()=>{const r=C.find(l=>l.type===d(p.value)).content,e=JSON.parse(JSON.stringify(h.value));return!!U(r,e)}),E=Object.keys(Object.assign({"/components/global/Component/Audio.vue":K,"/components/global/Component/BookingCalendar.vue":Z,"/components/global/Component/ClickableHeadings.vue":ee,"/components/global/Component/Contact.vue":ne,"/components/global/Component/Default.vue":se,"/components/global/Component/Downloads.vue":ie,"/components/global/Component/Faq.vue":ae,"/components/global/Component/HeroBig.vue":de,"/components/global/Component/HeroSmall.vue":me,"/components/global/Component/ImageList.vue":fe,"/components/global/Component/ImageRotation.vue":ve,"/components/global/Component/Map.vue":xe,"/components/global/Component/MyWork.vue":ye,"/components/global/Component/Offer.vue":_e,"/components/global/Component/PortraitText.vue":Se,"/components/global/Component/Prices.vue":Ie,"/components/global/Component/Testimonials.vue":je})).map(r=>{const e=r.split("/");return e[e.length-1].split(".")[0]});return(r,e)=>{const l=M;return i(),a("div",Te,[_(o("div",null,[Re,B(" Bist Du sicher, dass Du die Komponente austauschen möchtest? Der bisherige Content wird gelöscht. "),o("div",$e,[o("button",{onClick:e[0]||(e[0]=n=>t(s).modalVisible=!1),class:"border border-red border-opacity-30 rounded px-2"}," Abbrechen "),o("button",{onClick:e[1]||(e[1]=n=>y(t(s).componentTypeStore)),class:"border bg-green border-green border-opacity-30 rounded px-4 py-1"}," Ja ")])],512),[[k,t(s).modalVisible]]),(i(!0),a(L,null,V(t(E),(n,F)=>_((i(),a("div",{key:"component"+F},[o("button",{onClick:Me=>D(n),class:A(["flex w-full items-center gap-2",[{"bg-white bg-opacity-20 rounded":t(p)===n}]])},[R(l,{name:`icon-${n}`,style:{"font-size":"60px"},class:"text-lightBlue"},null,8,["name"]),o("div",null,N(n),1)],10,De)])),[[k,!t(s).modalVisible]])),128))])}}}),Ee={key:0},Fe={key:1},Le=I({__name:"Component",props:{selectedMode:{default:0}},emits:["setContentType"],setup(v,{emit:b}){const c=P();q();const{setComponentType:m}=c,{componentCss:x,componentContentType:u}=T(c),f=j(),{capitalize:g}=f,d=v;return W(()=>{m("component")}),(h,$)=>{const p=Ue;return i(),a("div",null,[d.selectedMode===0?(i(),a("div",Ee,[R(p,{class:"border-b border-darkOffwhite border-opacity-20"})])):S("",!0),d.selectedMode===1?(i(),a("div",Fe,[(i(),H(J("Sidebar"+t(g)(t(u)))))])):S("",!0)])}}});export{Le as default};
