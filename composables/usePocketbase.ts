import { ref } from 'vue'
import PocketBase from 'pocketbase'

export default function usePocketBase() {
  const pb = new PocketBase('http://164.90.225.18');

  return {
    pb
  }
}