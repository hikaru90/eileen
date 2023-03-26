// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "node-server",
  },

  typescript: {
    shim: false,
    typeCheck: false,
  },

  css: ['~/assets/styles/style.scss'],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt", "nuxt-icons"],

  plugins: ["~/plugins/piniaStore"],

  tailwindcss: {
    exposeConfig: true,
  },

})
