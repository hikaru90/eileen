import { ref } from 'vue'
import PocketBase from 'pocketbase'

export default function usePocketBase() {
  const pb = new PocketBase('https://backend.dimplegoertz.de:8443');

  return {
    pb
  }
}