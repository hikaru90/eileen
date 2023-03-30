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

  runtimeConfig: {
    // The private keys which are only available within server-side
    // apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      isDev: process.env.ISDEV
    }
  }

})
