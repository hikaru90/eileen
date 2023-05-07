import { defineStore } from "pinia";
const { pb } = usePocketbase();

export const useValidationStore = defineStore("validationStore", {
  state: () => ({}),
  actions: {
    // setComponentId(payload: string) {
    //   this.componentId = payload;
    // },
    isHexColor(payload:string) {
      // Check if string starts with '#' and has 3 or 6 characters
      if (payload[0] === "#" && (payload.length === 4 || payload.length === 7)) {
        const hex = payload.slice(1);
        return [...hex].every((char) => /[0-9a-f]/i.test(char));
      }
      return false;
    },
  },
});
