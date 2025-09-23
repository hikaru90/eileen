<script setup lang="ts">
  import defaults from "~/lib/defaults";
  import { setCookie, getCookie } from "~/lib/helpers";
  const { pb } = usePocketbase();
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
      isFirst?: boolean;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "heroBig").content,
      },
      isFirst: false,
    }
  );

  const downloads = await pb.collection("downloads").getFullList(200 /* batch size */);

  const state = reactive({
    newsletterSignupOpen: false,
    mail: "",
    subscriptionPending: false,
    subscriptionSubmitted: false,
    errors: [],
    successes: [],
    userSubribed: false,
  });

  const getCurrentImageUrl = (id, filename) => {
    const img = useImage();
    const imgUrl = img(`${config.public.SERVER_URL}/api/files/downloads/${id}/${filename}`, {
      format: "webp",
    });
    return imgUrl;
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
        state.userSubribed = true;
        state.newsletterSignupOpen = false;
        return true;
      } catch (err) {
        console.log("err", err);
        addError("Fehler beim Eintragen. Bitte versuche es erneut.");
        state.subscriptionPending = false;
      }
    }
  };

  const downloadFile = async (id, filename) => {
    try {
      // const url = product.url
      const url = `${config.public.SERVER_URL}/api/files/downloads/${id}/${filename}`;
      console.log("url", url);
      const res = await $fetch(url);

      console.log("download res", res);

      const blob = new Blob([res], { type: res.type });
      const a = document.createElement("a");
      a.setAttribute("href", URL.createObjectURL(blob));
      a.setAttribute("download", filename);
      a.setAttribute("target", "_blank");
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.log("error in downloading template", err);
    }
  };

  const handleDownload = (id, filename) => {
    console.log("state.userSubribed", state.userSubribed);
    if (!state.userSubribed) {
      state.newsletterSignupOpen = true;
      return;
    }
    downloadFile(id, filename);
  };

  onMounted(() => {
    const userSubribed = getCookie("subscribed");
    if (userSubribed) state.userSubribed = true;
  });
  onUnmounted(() => {});
</script>

<template>
  <div class="py-16 md:py-24 relative">
    <!-- <div class="absolute z-20 bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/3 rounded-full w-5 h-5 bg-gradient-to-b from-gold via-lightGold to-darkGold">
    </div> -->
    <div class="max-container h-full relative z-10">
      <div class="h-full flex items-center justify-center">
        <div class="mt-10">
          <IntersectonPop>
            <h2
              v-if="props.component.content.heading"
              style="max-width: 15em"
              class="shiny-pop text-salmon font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl mb-10 lg:mb-20 text-center"
              v-html="$mdRenderer.set({ html: true }).render(props.component.content.heading)"
            ></h2>
          </IntersectonPop>
        </div>
        <div class="flex-grow flex flex-col md:flex-row md:flex-wrap -mx-3">
          <div class="px-3 w-full md:w-1/2" v-for="(download, index) in downloads"
              :key="'audio' + index">
            <div
              v-if="state.newsletterSignupOpen"
              class="shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10 py-4 px-5"
            >
              <h3 class="font-heading text-lg md:text-2xl mb-4 mt-1 ml-1">Datei herunterladen</h3>
              <p class="pl-1">
                Um diese Datei herunterzuladen, gib bitte Deine E-Mail-Adresse ein. Damit trägst Du
                Dich gleichzeitig in meinen Newsletter ein. Ich verwende Deine Daten ausschließlich
                um neue Meditationen und Inspiration mit Dir zu teilen. Ich werde Deine
                E-Mail-Adresse nicht für andere Zwecke verwenden oder weitergeben, versprochen.
              </p>
              <div class="relative">
                <form
                  @submit.prevent="subscribe"
                  class="flex items-center gap-4 justify-start mt-5 mb-1"
                >
                  <input
                    type="text"
                    v-model="state.mail"
                    placeholder="E-Mail Adresse"
                    class="px-5 py-2 shadow-xl shadow-coffee/5 rounded-full flex-grow border border-coffee border-opacity-10"
                  />
                  <button
                    type="submit"
                    :class="[{ 'pointer-events-none cursor-default': state.subscriptionPending }]"
                    class="shadow-xl shadow-coffee/20 bg-salmon px-5 py-2 rounded-full text-white flex-shrink-0 flex items-center justify-center"
                  >
                    <div v-show="!state.subscriptionPending">Eintragen</div>
                    <div v-show="state.subscriptionPending" class="animate-spin">
                      <nuxt-icon name="icon-pending" class="text-2xl text-white" />
                    </div>
                  </button>
                  <input type="submit" class="hidden" />
                </form>
                <div v-for="(error, index) in state.errors" :key="index" class="w-full mt-4">
                  <div class="bg-lightRed px-3 py-1 text-darkRed rounded-lg">
                    {{ error }}
                  </div>
                </div>
                <div v-for="(success, index) in state.successes" :key="index" class="mt-4">
                  <div class="bg-green/600px-3 py-1 text-white rounded-lg">
                    {{ success }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else
              
              class="shadow-2xl shadow-coffee/10 rounded-lg overflow-hidden bg-white relative border border-coffee border-opacity-10 flex h-full"
            >
            <!-- <div class="absolute top-2 left-2 px-2 py-0.5 bg-white/70 rounded z-10 text-sm">
              .{{ download.filetype }}
            </div> -->
              <div
                :style="[
                  {
                    backgroundImage: `url(${getCurrentImageUrl(download.id, download.thumbnail)})`,
                  },
                ]"
                class="relative w-1/3 h-full bg-cover bg-center flex-grow-0 flex-shrink-0"
              ></div>
              <div>
                <div
                  class="mb-4 font-heading text-lg lg:text-xl gap-4 border-b border-coffee border-opacity-10 px-6 py-3 flex items-center justify-between"
                >
                  {{ download.name }}
                  <div class="font-body text-sm text-coffee/50">
                    {{ new Date(download.created).toLocaleDateString("de-DE") }}
                  </div>
                </div>
                <div class="px-6 pt-1 pb-5">
                  <div class="flex gap-10">
                    <div class="flex-grow">
                      <div class="pl-1">
                        {{ download.description }}
                      </div>
                      <button
                        @click="handleDownload(download.id, download.file)"
                        class="flex items-center justify-center flex-shrink-0 mt-4 mb-1"
                      >
                        <div
                          class="flex items-center justify-center gap-1 pl-3 pr-2 py-1 border border-grey/20 rounded-full hover:bg-salmon/80 text-coffee hover:text-white transition capitalize"
                        >
                        {{ download.filetype }}
                        Herunterladen
                          <nuxt-icon name="icon-download" class="text-2xl -ml-1" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .slide:last-child {
    .connector {
      display: none;
    }
  }
</style>
