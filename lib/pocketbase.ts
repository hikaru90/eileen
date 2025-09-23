import PocketBase from 'pocketbase'

// Create a singleton instance
let pbInstance: PocketBase | null = null

export function getPocketBase(): PocketBase {
  if (!pbInstance) {

    let serverUrl: string
    if (process.server) {
      serverUrl = process.env.SERVER_URL!
    } else {
      serverUrl = (window as any).__NUXT__?.config?.public?.SERVER_URL!
    }

    pbInstance = new PocketBase(serverUrl)
    
    // Restore auth state from localStorage if available
    if (process.client) {
      const storedAuth = localStorage.getItem('pocketbase_auth')
      if (storedAuth) {
        try {
          const authData = JSON.parse(storedAuth)
          pbInstance.authStore.save(authData.token, authData.model)
        } catch (e) {
          console.log('Failed to restore auth state:', e)
        }
      }
    }
  }
  return pbInstance
}

// For backward compatibility with the composable
export default function usePocketBase() {
  return {
    pb: getPocketBase()
  }
}
