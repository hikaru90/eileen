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

  plugins: ["~/plugins/piniaStore", "~/plugins/mitt", { src: "~/plugins/markdown-it", ssr: false }],

  tailwindcss: {
    exposeConfig: true,
  },

  runtimeConfig: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    MAILERLITE_API_KEY: process.env.MAILERLITE_API_KEY,
    POCKETBASE_ADMIN_EMAIL: process.env.POCKETBASE_ADMIN_EMAIL,
    POCKETBASE_ADMIN_PASSWORD: process.env.POCKETBASE_ADMIN_PASSWORD,
    public: {
      BASE_URL: process.env.BASE_URL,
      ENV: process.env.ENV,
      SERVER_URL: process.env.SERVER_URL,
    },
  },
});
