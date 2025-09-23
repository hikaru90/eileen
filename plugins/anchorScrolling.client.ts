export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { scrollToAnchor } = useScrollTo()

  // Handle route changes with hash
  router.afterEach((to, from) => {
    if (to.hash) {
      // Wait for the DOM to update
      nextTick(() => {
        setTimeout(() => {
          scrollToAnchor(to.hash)
        }, 100)
      })
    }
  })

  // Handle initial page load with hash
  onMounted(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Wait for the page to fully render
      setTimeout(() => {
        scrollToAnchor(window.location.hash)
      }, 350)
    }
  })

  // Handle clicks on anchor links within the same page
  const handleAnchorClick = (event: Event) => {
    const target = event.target as HTMLElement
    const link = target.closest('a[href^="#"], a[href*="#"]')

    if (link) {
      const href = link.getAttribute('href')
      if (href && href.includes('#')) {
        const hash = href.split('#')[1]
        if (hash) {
          event.preventDefault()
          scrollToAnchor(hash)

          // Update the URL hash without triggering navigation
          if (typeof window !== 'undefined') {
            window.history.replaceState(null, '', `${window.location.pathname}#${hash}`)
          }
        }
      }
    }
  }

  // Add click listener when the plugin initializes
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleAnchorClick)
  }
})