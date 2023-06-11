<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { login } = authStore;

  let email = "";
  let password = "";

  definePageMeta({
    layout: "blank",
  });

</script>

<template>
  <div class="flex items-center justify-center flex-grow">
    <form @submit.prevent="login(email, password)" class="flex flex-col gap-2">
      <input
        v-model="email"
        type="email"
        required
        placeholder="E-Mail"
        class="border border-grey border-opacity-20 rounded-sm px-3 py-2"
      />
      <input
        v-model="password"
        type="password"
        required
        placeholder="Passwort"
        class="border border-grey border-opacity-20 rounded-sm px-3 py-2"
      />
      <button type="submit" class="bg-green rounded-sm px-3 py-2">Einloggen</button>
    </form>
  </div>
</template>
