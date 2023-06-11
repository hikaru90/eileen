import { ref } from 'vue'
import PocketBase from 'pocketbase'

export default function usePocketBase() {
  const pb = new PocketBase('http://dimplegoertz.de')

  return {
    pb
  }
}