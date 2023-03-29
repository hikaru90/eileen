import { defineStore } from "pinia";
// const { pb } = usePocketbase();

export const useContentStore = defineStore("contentStore",{
  state: () => ({
    debugVisible: false,
  }),
  actions: {
    // async login(email: string, password: string) {
    // },
  },
});
