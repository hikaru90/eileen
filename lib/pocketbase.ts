import PocketBase from 'pocketbase'

export function getPocketBase(): PocketBase {
  const serverUrl = 'https://backend.eileengeorge.de'
  return new PocketBase(serverUrl)
}

// For backward compatibility with the composable
export default function usePocketBase() {
  return {
    pb: getPocketBase()
  }
}
