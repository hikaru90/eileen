import PocketBase from 'pocketbase'

export default function usePocketBase() {
  let serverUrl: string

  if (process.server) {
    serverUrl = process.env.SERVER_URL!
  } else {
    serverUrl = (window as any).__NUXT__?.config?.public?.SERVER_URL!
  }

  const pb = new PocketBase(serverUrl)

  return {
    pb
  }
}