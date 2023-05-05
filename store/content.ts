import { defineStore } from "pinia";
// const { pb } = usePocketbase();

export const useContentStore = defineStore("contentStore",{
  state: () => ({
    debugVisible: false,
    windowWidth: 0,
  }),
  actions: {
    // async login(email: string, password: string) {
    // },
    setWindowWidth(payload: number){
      this.windowWidth = payload
    }
  },
});
