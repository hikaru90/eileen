import { ref } from 'vue'
import PocketBase from 'pocketbase'

export default function usePocketBase() {
  const pb = new PocketBase('http://167.172.96.210')

  return {
    pb
  }
}