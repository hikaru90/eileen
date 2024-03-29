// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: "node-server",
  },

  devServer: {
    port: 5000,
  },

  typescript: {
    shim: false,
    typeCheck: false,
  },

  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: "de",
      },
      charset: "utf-8",
    },
  },

  css: ["~/assets/styles/style.scss"],

  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt", "nuxt-icons", "@nuxt/image"],

  plugins: ["~/plugins/piniaStore", { src: "~/plugins/markdown-it", ssr: false }],

  tailwindcss: {
    exposeConfig: true,
  },

  runtimeConfig: {
    // The private keys which are only available within server-side
    // apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    // GITHUB_ACTIONS_TOKEN: process.env.GITHUB_ACTIONS_TOKEN,
    public: {
      ENV: process.env.ENV,
      SERVER_URL: process.env.SERVER_URL,
      BREVO_API_KEY: process.env.BREVO_API_KEY,
    },
  },
});
