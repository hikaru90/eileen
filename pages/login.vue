<script setup>
  import { useRouter } from "vue-router";
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();
  const { login } = authStore;

  const state = reactive({
    email: '',
    password: '',
    error: '',
  })

  definePageMeta({
    layout: "blank",
  });

  const handleLogin = async () => {
    try{
      const res = await login(state.email, state.password)
      console.log('res', res);
    }catch(err){
      state.error = 'Fehlerhafter Login'
      setTimeout(() => {
        state.error = ''
      }, 2000);
      console.log('error loggin in', err);
    }
  }

</script>

<template>
  <div class="flex flex-col items-center justify-center flex-grow">
    <div class="relative flex flex-col">
      <form @submit.prevent="handleLogin" class="flex flex-col gap-2">
        <input
        v-model="state.email"
        type="email"
        required
        placeholder="E-Mail"
        class="border border-grey border-opacity-20 rounded px-3 py-2"
        />
        <input
        v-model="state.password"
        type="password"
        required
        placeholder="Passwort"
        class="border border-grey border-opacity-20 rounded px-3 py-2"
        />
        <button type="submit" class="bg-green-500/60 rounded px-3 py-2">Einloggen</button>
      </form>
      <div v-if="state.error" class="bg-lightRed text-red rounded px-3 py-0.5 mt-3 w-full absolute -bottom-3 transform translate-y-full left-0">
        {{state.error}}
      </div>
    </div>
  </div>
</template>
