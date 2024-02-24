<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  import { groupBy, sortBy } from "~/lib/helpers";
  const authStore = useAuthStore();
  const { logout } = authStore;
  const { pb } = usePocketbase();
  const records = await pb.collection("pages").getFullList(200 /* batch size */, {
    sort: "-created",
    expand: "subpages",
  });

  const footerItems = computed(() => {
    const value = groupBy(
      records.filter((record) => record.footerGroup.length > 0),
      "footerGroup"
    ).sort((a, b) => (a[0].footerGroup > b[0].footerGroup ? 1 : -1));
    return value;
  });

</script>
<template>
  <footer
    style="background: linear-gradient(30deg, rgba(2, 55, 41, 1) 0%, rgba(0, 31, 31, 1) 60%)"
    class="text-lightGrey py-20"
  >
    <div class="max-container">
      <div class="flex flex-col md:flex-row justify-between gap-10">
        <div class="w-full md:w-1/5">
          <h2 class="font-bold opacity-60 mb-2 md:mb-6">
            Privatpraxis<br />
          </h2>
          <p style="line-height:37px;" class="">
            Eileen George<br />
            Paar- und Sexualtherapeutin & Beziehungscoach<br />
            Breitscheidstraße 33<br />
            70176 Stuttgart<br />
          </p>

        </div>
        <div class="" v-for="column in footerItems">
          <h2 class="font-bold opacity-60 mb-2 md:mb-6">
            {{ column[0].footerGroup }}
          </h2>
          <div class="flex flex-col gap-2 md:gap-4">
            <a v-for="link in column" :href="`/${link.slug}`" class="">
              {{ link.title }}
            </a>
          </div>
        </div>
      </div>
      <div class="mt-16 text-sm flex justify-between">
        <span class="opacity-60"> © {{ new Date().getFullYear() }} — Eileen George </span>
        <div>
          <button aria-label="Anmelden" v-if="authStore.token" @click="logout" class="text-red flex items-center">
            <nuxt-icon name="icon-cross" class="text-2xl" />
            Ausloggen
          </button>
          <a v-else href="/login" class="text-gold">
            <nuxt-icon name="icon-dashboard" class="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
