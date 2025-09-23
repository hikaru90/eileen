import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html#Properties
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If the user is navigating back/forward, restore the scroll position
    if (savedPosition) {
      return savedPosition
    }

    // Don't handle hash scrolling here - let the plugin handle it
    if (to.hash) {
      return false
    }

    // Default: scroll to top of the container
    return new Promise((resolve) => {
      setTimeout(() => {
        const scrollContainer = document.getElementById('content-container')
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
        }
        resolve({ top: 0 })
      }, 50)
    })
  }
}