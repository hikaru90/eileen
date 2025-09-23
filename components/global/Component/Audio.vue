<script setup lang="ts">
  import defaults from "~/lib/defaults";
  import WaveSurfer from "wavesurfer.js";
  import { waitForDOM, setCookie } from "~/lib/helpers";

  const { pb } = usePocketbase();

  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "offer").content,
      },
    }
  );

  const state = reactive({
    audios: [],
    mail: "",
    subscriptionPending: false,
    subscriptionSubmitted: false,
    errors: [],
    successes: [],
  });

  const getCurrentFileUrl = (filename) => {
    const img = useImage();
    const imgUrl = img(
      `${config.public.SERVER_URL}/api/files/${props.component.collectionName}/${props.component.id}/${filename}`,
      {
        format: "mp3",
      }
    );
    return imgUrl;
  };
  const createAudioInstance = (index, container, file) => {
    console.log("createAudioInstance", index);
    const audioInstance = WaveSurfer.create({
      container: container,
      height: 28,
      width: "auto",
      splitChannels: false,
      normalize: true,
      waveColor: "#D2C4B5",
      progressColor: "#814515",
      cursorColor: "#44B57A",
      cursorWidth: 1,
      barWidth: 3,
      barGap: 9,
      barRadius: 9,
      barHeight: 1,
      barAlign: "",
      fillParent: true,
      url: file,
      mediaControls: false,
      autoplay: false,
      interact: true,
      dragToSeek: true,
      hideScrollbar: false,
      audioRate: 1,
      autoScroll: true,
      autoCenter: true,
      sampleRate: 8000,
    });
    audioInstance.on("audioprocess", function () {
      if (audioInstance.isPlaying()) {
        let totalTime = audioInstance.getDuration();
        let currentTime = audioInstance.getCurrentTime();
        let remainingTime = totalTime - currentTime;

        // state.audios[index].times.total = totalTime.toFixed(1)
        state.audios[index].isPlaying = true;
        state.audios[index].times.current = currentTime.toFixed(1);
        state.audios[index].times.remaining = remainingTime.toFixed(1);
      } else {
        state.audios[index].isPlaying = false;
      }
    });
    audioInstance.on("ready", function () {
      const totalTime = audioInstance.getDuration();
      state.audios[index].times.total = totalTime.toFixed(1);
    });
    state.audios.push({
      instance: audioInstance,
      times: { total: 0, current: 0, remaining: 0 },
      isPlaying: false,
    });
  };
  const formatTime = (seconds) => {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if necessary
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return minutes + ":" + remainingSeconds;
  };
  const togglePlayPause = (index) => {
    state.audios[index].instance.playPause();
  };
  const addError = (error) => {
    state.errors.push(error);
    setTimeout(() => {
      clearErrors();
    }, 3000);
  };
  const clearErrors = () => {
    state.errors = [];
  };
  
  const addSuccess = (success) => {
    setCookie("subscribed", true);
    state.successes.push(success);
    state.mail = "";
    setTimeout(() => {
      clearSuccesses();
    }, 3000);
  };
  const clearSuccesses = () => {
    state.successes = [];
  };
  const isValidEmail = (email) => {
    // Check if the string contains '@' and '.'
    if (email.includes("@") && email.includes(".")) {
      // Split the email address by '@'
      const parts = email.split("@");
      // Check if there are exactly two parts
      if (parts.length === 2) {
        // Check if the second part (domain) contains '.'
        if (parts[1].includes(".")) {
          return true;
        }
      }
    }
    return false;
  };
  const subscribe = async () => {
    if (!state.mail) {
      addError("Bitte gib eine E-Mail ein.");
      return;
    }
    if (!isValidEmail(state.mail)) {
      addError("Bitte gib eine gültige E-Mail Adresse ein.");
      return;
    }
    if (!state.subscriptionPending) {
      state.subscriptionPending = true;

      try {
        const response = await fetch("/api/mail/addSubscriber", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: state.mail,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to subscribe");
        }

        addSuccess("Du hast Dich erfolgreich eingetragen.");
        state.subscriptionPending = false;
        return true;
      } catch (err) {
        console.log("err", err);
        addError("Fehler beim Eintragen. Bitte versuche es erneut.");
        state.subscriptionPending = false;
      }
    }
  };
  const mountAudios = () => {
    for (const audio of Object.entries(props.component.content.audios)) {
      const index = audio[0];
      const value = audio[1];
      const containerSelector = "#audio" + index;
      createAudioInstance(index, containerSelector, getCurrentFileUrl(value.file));
    }
  };

  onMounted(async () => {
    if (process.client) {
      waitForDOM("audio0", mountAudios);
    }
  });
</script>

<template>
  <div class="py-16 md:py-24 relative">
    <div class="max-container">
      <div class="flex items-center justify-center">
        <IntersectonPop>
          <h2
            class="shiny-pop text-salmon font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-16 text-center"
          >
            {{ props.component.content.heading }}
          </h2>
        </IntersectonPop>
      </div>

      <div class="flex flex-col items-center gap-8 relative mb-32">
        <div
          v-for="(audio, index) in props.component.content.audios"
          :key="'audio' + index"
          class="w-full md:w-1/2 md:max-w-[500px] shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10"
        >
          <div
            class="mb-4 font-heading text-lg lg:text-xl flex items-center gap-4 border-b border-coffee border-opacity-10 px-6 py-3"
          >
            {{ audio.name }}
          </div>
          <div class="px-6 pt-1 pb-5">
            <div class="relative w-full h-full">
              <div
                v-if="state.audios.length > 0"
                class="absolute left-0 top-1/2 transform -translate-y-1/2"
              >
                {{ formatTime(Number(state.audios[index]?.times.total)) }}
              </div>
              <div
                :id="'audio' + index"
                class="inline-block ml-[60px] h-7 w-[calc(100%-100px)] overflow-hidden"
              ></div>
              <button
                v-if="state.audios?.length > 0"
                @click="togglePlayPause(index)"
                class="inline-flex ml-[4px] w-[32px] h-[32px] items-center justify-center border border-coffee border-opacity-30 align-top rounded-lg"
              >
                <nuxt-icon
                  v-if="state.audios[index]?.isPlaying"
                  name="icon-pause"
                  class="text-4xl"
                />
                <nuxt-icon v-else name="icon-play" class="text-4xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center relative mb-12">
        <div
          style="background-image: radial-gradient(circle, #faf1df 0%, transparent 60%)"
          class="absolute left-1/2 top-1/2 -z-10 w-[1600px] h-[1600px] transform -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div class="max-w-lg text-2xl font-heading text-center">
          {{ props.component.content.description }}
        </div>
      </div>

      <div class="relative">
        <form @submit.prevent="subscribe" class="flex items-center gap-4 justify-center">
          <input
            type="text"
            v-model="state.mail"
            :placeholder="props.component.content.placeholder"
            class="px-5 py-2 shadow-xl shadow-coffee/5 rounded-full flex-grow max-w-[300px] border border-coffee border-opacity-10"
          />
          <button
            @click="subscribe"
            :class="[{ 'pointer-events-none cursor-default': state.subscriptionPending }]"
            class="shadow-xl shadow-coffee/20 bg-salmon px-5 py-2 rounded-full text-white flex-shrink-0 flex items-center justify-center"
          >
            <div v-show="!state.subscriptionPending">
              {{ props.component.content.cta }}
            </div>
            <div v-show="state.subscriptionPending" class="animate-spin">
              <nuxt-icon name="icon-pending" class="text-2xl text-white" />
            </div>
          </button>
          <input type="submit" class="hidden" />
        </form>
        <div
          v-for="(error, index) in state.errors"
          :key="index"
          class="absolute w-full top-full flex flex-col items-center mt-4"
        >
          <div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg">
            {{ error }}
          </div>
        </div>
        <div
          v-for="(success, index) in state.successes"
          :key="index"
          class="absolute w-full top-full flex flex-col items-center mt-4"
        >
          <div class="bg-green-500/60 px-3 py-1 text-white rounded-lg">
            {{ success }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .slide:last-child {
    .connector {
      display: none;
    }
    .slideParagraph {
      @apply mb-0;
    }
  }
</style>
