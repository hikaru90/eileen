import { defineStore } from "pinia";
const { pb } = usePocketbase();

export const useSidebarStore = defineStore("sidebarStore", {
  state: () => ({
    viewports: [
      { name: "mobile", value: null },
      { name: "mobile+", value: 500 },
      { name: "table", value: 768 },
      { name: "laptop", value: 1024 },
      { name: "desktop", value: 1366 },
    ],
    componentId: undefined,
    componentName: "",
    componentCss: [],
  }),
  actions: {
    setComponentId(payload: string) {
      this.componentId = payload;
    },
    setComponentName(payload: string) {
      this.componentName = payload;
    },
    setComponentCss(payload) {
      this.componentCss = payload;
    },
    async saveBlock() {
      try {
        console.log("save block");
        const record = await pb
          .collection("blocks")
          .update(this.componentId, { cssClasses: this.componentCss });
        return record;
      } catch (err) {
        console.log("error saving block", err);
      }
    },
    async safelistDynamicClasses() {
      try {
        await fetch("/nuxtapi/saveTailwindClasses");
      } catch (err) {
        console.log("error saving talwind classes from sidebarStore");
      }
    },
  },
});
