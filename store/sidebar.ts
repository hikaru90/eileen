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
    viewport: 0,
    componentId: undefined,
    componentName: "",
    componentCss: [],
    componentType: undefined,
    componentContentType: undefined,
    componentContent: undefined,
  }),
  actions: {
    setViewport(payload: number){
      this.viewport = payload
    },
    setComponentId(payload: string) {
      this.componentId = payload;
    },
    setComponentName(payload: string) {
      this.componentName = payload;
    },
    setComponentCss(payload) {
      this.componentCss = payload;
    },
    setComponentType(payload) {
      this.componentType = payload;
    },
    setComponentContentType(payload) {
      this.componentContentType = payload.type;
      this.saveContentType(payload.collection)
    },
    setComponentContent(payload) {
      this.componentContent = payload;
    },
    setProperty(property, value) {
      const entry = this.componentCss[this.viewport]?.find((entry) => entry.hasOwnProperty(property));
      if (entry) {
        entry[property] = value;
      } else {
        let newValue = {};
        newValue[property] = value;
        this.componentCss[this.viewport]?.push(newValue);
      }
      this.saveCssClasses()
    },
    deleteProperty(property) {
      const entry = this.componentCss[this.viewport]?.find((entry) => entry.hasOwnProperty(property));
      if (entry) {
        delete entry[property]
      }
      const newValue = this.componentCss[this.viewport].filter(value => {
        const entry = Object.keys(value).length !== 0
        console.log('entry',entry);
        return entry
      });
      this.componentCss[this.viewport] = newValue
      this.saveCssClasses()
    },
    async saveContentType(collection) {
      try {
        console.log("save componentContentType");
        const record = await pb
          .collection(collection)
          .update(this.componentId, { type: this.componentContentType });
        return record;
      } catch (err) {
        console.log("error saving componentContentType", err);
      }
    },
    async saveContent() {
      try {
        console.log("save componentContent");
        const record = await pb
          .collection("blocks")
          .update(this.componentId, { content: this.componentContent });
        return record;
      } catch (err) {
        console.log("error saving componentContent", err);
      }
    },
    async saveCssClasses() {
      try {
        console.log("save componentCss");
        const record = await pb
          .collection("blocks")
          .update(this.componentId, { cssClasses: this.componentCss });
        return record;
      } catch (err) {
        console.log("error saving componentCss", err);
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
