import { ref } from 'vue'
import PocketBase from 'pocketbase'

export default function usePocketBase() {
  const pb = new PocketBase('https://167.172.96.210')

  return {
    pb
  }
}