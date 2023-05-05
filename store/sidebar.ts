import { defineStore } from "pinia";
const { pb } = usePocketbase();

export const useSidebarStore = defineStore("sidebarStore", {
  state: () => ({
    viewports: [
      { id: 0, name: "mobile", value: 0, icon: "icon-mobile" },
      { id: 1, name: "mobile+", value: 500, icon: "icon-mobile+" },
      { id: 2, name: "tablet", value: 768, icon: "icon-tablet" },
      { id: 3, name: "laptop", value: 1024, icon: "icon-laptop" },
      { id: 4, name: "desktop", value: 1366, icon: "icon-desktop" },
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
