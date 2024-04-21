import { defineStore } from "pinia";
import EventBus from "~/lib/mitt";
const { pb } = usePocketbase();

export const useContentStore = defineStore("contentStore", {
  state: () => ({
    debugVisible: false,
    windowWidth: 0,
    page: {},
  }),
  actions: {
    // async login(email: string, password: string) {
    // },
    setWindowWidth(payload: number) {
      this.windowWidth = payload;
    },
    setPage(payload: object) {
      this.page = payload;
    },
    async savePage() {
      let temp = JSON.parse(JSON.stringify(this.page));
      delete temp.id;
      delete temp.collectionId;
      delete temp.collectionName;
      delete temp.created;
      delete temp.updated;
      delete temp.expand;
      try {
        console.log("save page");
        console.log("this.page.collectionName", this.page.collectionName);
        const record = await pb.collection(this.page.collectionName).update(this.page.id, temp);
        EventBus.emit("refresh");
        return record;
      } catch (err) {
        console.log("error saving page", err);
      }
    },
    slugify(payload: string) {
      const slugArray = [];
      const alphanumericRegex = /^[a-z0-9]+$/i;
      const words = payload.trim().split(" ");
      for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();
        let slug = "";
        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          if (alphanumericRegex.test(char)) {
            slug += char;
          } else if (char === " ") {
            slug += "-";
          }
        }
        if (slug.length > 0) {
          slugArray.push(slug);
        }
      }
      return slugArray.join("-");
    },
    decapitalize(payload:string) {
      return payload.charAt(0).toLowerCase() + payload.slice(1);
    },
    capitalize(payload: string) {
      return payload.charAt(0).toUpperCase() + payload.slice(1);
    },
    moveUp(array: [], index: number) {
      if (index === 0) {
        return;
      }
      const temp = array[index];
      array[index] = array[index - 1];
      array[index - 1] = temp;
    },
    moveDown(array: [], index: number) {
      if (index === array.length - 1) {
        return;
      }
      const temp = array[index];
      array[index] = array[index + 1];
      array[index + 1] = temp;
    },
  },
});
