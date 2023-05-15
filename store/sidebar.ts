import { defineStore } from "pinia";
import EventBus from "~/plugins/mitt";
const { pb } = usePocketbase();

export const useSidebarStore = defineStore("sidebarStore", {
  state: () => ({
    viewports: [
      { id: 0, name: "mobile", value: 0, icon: "icon-mobile" },
      { id: 1, name: "sm", value: 640, icon: "icon-mobile+" },
      { id: 2, name: "md", value: 768, icon: "icon-tablet" },
      { id: 3, name: "lg", value: 1024, icon: "icon-laptop" },
      { id: 4, name: "xl", value: 1366, icon: "icon-desktop" },
    ],
    viewport: 0,
    componentIsMaxContainer: undefined,
    componentId: undefined,
    componentName: "",
    componentCss: [],
    componentType: undefined,
    componentContentType: undefined,
    componentContent: undefined,
    componentFiles: undefined,
  }),
  actions: {
    setViewport(payload: number) {
      this.viewport = payload;
    },
    setComponentId(payload: string) {
      this.componentId = payload;
    },
    setComponentIsMAxContainer(payload: boolean){
      this.componentIsMaxContainer = payload
    },
    setComponentName(payload: string) {
      this.componentName = payload;
    },
    setComponentCss(payload) {
      this.componentCss = payload;
    },
    setComponentType(payload) {
      console.log("setComponentType");
      this.componentType = payload;
    },
    setComponentContentType(payload) {
      console.log("payload", payload);
      this.componentContentType = payload;
    },
    setComponentContent(payload) {
      this.componentContent = payload;
    },
    setComponentFiles(payload: string) {
      this.componentFiles = payload;
    },
    setProperty(property, value) {
      const entry = this.componentCss[this.viewport]?.find((entry) =>
        entry.hasOwnProperty(property)
      );
      if (entry) {
        entry[property] = value;
      } else {
        let newValue = {};
        newValue[property] = value;
        this.componentCss[this.viewport]?.push(newValue);
      }
      this.saveCssClasses();
    },
    deleteProperty(property) {
      const entry = this.componentCss[this.viewport]?.find((entry) =>
        entry.hasOwnProperty(property)
      );
      if (entry) {
        delete entry[property];
      }
      const newValue = this.componentCss[this.viewport].filter((value) => {
        const entry = Object.keys(value).length !== 0;
        console.log("entry", entry);
        return entry;
      });
      this.componentCss[this.viewport] = newValue;
      this.saveCssClasses();
    },
    async deleteFile(filename){
      try {
        console.log("delete file");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, {
            'files-': [filename],
        });
          EventBus.emit('refresh')
        return record;
      } catch (err) {
        console.log("error saving componentContentType", err);
      }
    },
    async saveContentType() {
      try {
        console.log("save componentContentType");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { type: this.componentContentType });
          EventBus.emit('refresh')
        return record;
      } catch (err) {
        console.log("error saving componentContentType", err);
      }
    },
    async saveIsMaxContainer() {
      try {
        console.log("save isMaxContainer");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { isMaxContainer: this.componentIsMaxContainer });
          EventBus.emit('refresh')
        return record;
      } catch (err) {
        console.log("error saving isMaxContainer", err);
      }
    },
    async saveContent() {
      try {
        console.log("save content");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { content: this.componentContent });
          EventBus.emit('refresh')
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
