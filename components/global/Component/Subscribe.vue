<script setup lang="ts">
  import defaults from "~/lib/defaults";
  const config = useRuntimeConfig();

  const props = withDefaults(
    defineProps<{
      component?: object;
    }>(),
    {
      component: {
        content: defaults.find((el) => el.type === "subscribe").content,
      },
    }
  );

  const state = reactive({
    name: "",
    email: "",
    isSubmitting: false,
    isSuccess: false,
    errorMessage: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Reset states
    state.errorMessage = "";
    state.isSuccess = false;

    // Validation
    if (!state.name.trim()) {
      state.errorMessage = "Bitte geben Sie Ihren Namen ein.";
      return;
    }

    if (!state.email.trim()) {
      state.errorMessage = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
      return;
    }

    if (!validateEmail(state.email)) {
      state.errorMessage = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      return;
    }

    state.isSubmitting = true;

    try {
      const response = await fetch("/api/mail/addSubscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          name: state.name,
          groupId: props.component.content.groupId,
        }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      state.isSuccess = true;
      state.name = "";
      state.email = "";
    } catch (error) {
      console.error("Subscription error:", error);
      state.errorMessage = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
    } finally {
      state.isSubmitting = false;
    }
  };

</script>

<template>
  <div id="anmelden" class="my-28">
    <div class="max-container relative">
      <div
      style="
        background-image: radial-gradient(
          circle,
          #FAF1DF 0%,
          transparent 60%
        );
      "
      class="absolute left-1/2 top-1/2 -z-10 w-[2000px] h-[2000px] transform -translate-x-1/2 -translate-y-1/2"
    ></div>
      <div class="max-w-2xl mx-auto text-center">
        <IntersectonPop>
          <h2
            class="shiny-pop font-heading text-lg sm:text-xl md:text-3xl lg:text-4xl mb-6 text-center text-salmon"
          >
            {{ props.component.content.heading }}
          </h2>
        </IntersectonPop>

        <p v-if="props.component.content.description" class="text-gray-600 mb-8 leading-relaxed">
          {{ props.component.content.description }}
        </p>

        <!-- Success Message -->
        <div v-if="state.isSuccess" class="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
          <p class="text-green-800 font-medium">
            Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet.
          </p>
        </div>

        <!-- Error Message -->
        <div v-if="state.errorMessage" class="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <p class="text-red-800">{{ state.errorMessage }}</p>
        </div>

        <!-- Subscription Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                v-model="state.name"
                type="text"
                placeholder="Name"
                :disabled="state.isSubmitting"
                class="w-full px-4 py-3 border border-coffee/40 rounded-lg focus:ring-2 focus:ring-salmon focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <input
                v-model="state.email"
                type="email"
                placeholder="E-Mail Adresse"
                :disabled="state.isSubmitting"
                class="w-full px-4 py-3 border border-coffee/40 rounded-lg focus:ring-2 focus:ring-salmon focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div class="pt-2">
            <button
              type="submit"
              :disabled="state.isSubmitting"
              class="inline-flex items-center gap-2 bg-salmon text-white px-8 py-3 rounded-full hover:bg-salmon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <span v-if="state.isSubmitting">Wird angemeldet...</span>
              <span v-else>{{ props.component.content.buttonText || 'Newsletter abonnieren' }}</span>
              <nuxt-icon v-if="!state.isSubmitting" name="icon-arrow_right" class="" />
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>