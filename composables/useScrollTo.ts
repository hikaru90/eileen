export const useScrollTo = () => {
  const scrollToAnchor = (targetId: string, offset: number = 100) => {
    // Remove the # if it's included
    const cleanId = targetId.replace('#', '')

    // Find the target element
    const targetElement = document.getElementById(cleanId)
    if (!targetElement) {
      console.warn(`Element with id "${cleanId}" not found`)
      return false
    }

    // Find the scroll container (now consistent across all layouts)
    const scrollContainer = document.getElementById('content-container')

    if (scrollContainer) {
      // Calculate position relative to the scroll container
      const containerRect = scrollContainer.getBoundingClientRect()
      const targetRect = targetElement.getBoundingClientRect()
      const currentScrollTop = scrollContainer.scrollTop

      // Calculate the target scroll position with offset
      const targetScrollTop = currentScrollTop + targetRect.top - containerRect.top - offset

      // Smooth scroll within the container
      scrollContainer.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      })

      console.log('Scrolling to:', cleanId, 'at position:', targetScrollTop)
      return true
    } else {
      console.warn('content-container not found, falling back to window scroll')
      // Fallback to window scrolling
      const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      })

      return true
    }
  }

  const scrollToTop = () => {
    const scrollContainer = document.getElementById('content-container')

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return {
    scrollToAnchor,
    scrollToTop
  }
}