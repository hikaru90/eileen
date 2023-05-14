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
    },
    capitalize(payload: string){
      return payload.charAt(0).toUpperCase() + payload.slice(1);
    },
    moveUp(array: [], index: number){
      if (index === 0) {
        return;
      }
      const temp = array[index];
      array[index] = array[index - 1];
      array[index - 1] = temp;
    },
    moveDown(array: [], index: number){
      if (index === array.length - 1) {
        return;
      }
      const temp = array[index];
      array[index] = array[index + 1];
      array[index + 1] = temp;
    },

  },
});
