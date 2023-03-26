import { markRaw } from 'vue'

export default defineNuxtPlugin(({ $pinia, $router }) => {
  if (process.client) {
    $pinia.use(({ store }) => { store.router = markRaw($router) })
  } 
})