<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { login } = authStore;

  let email = "alexbueckner@gmail.com";
  let password = "dif6rixa3";
</script>

<template>
  <div class="flex items-center justify-center">
    <form @submit.prevent="login(email, password)" class="flex flex-col">
      <input
        v-model="email"
        type="email"
        required
        placeholder="Email"
        class="border border-grey rounded-sm mb-2"
      />
      <input
        v-model="password"
        type="password"
        required
        placeholder="Password"
        class="border border-grey rounded-sm mb-2"
      />
      <button type="submit" class="bg-green rounded-sm">Log In</button>
    </form>
  </div>
</template>
