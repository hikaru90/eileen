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
    limitBackgroundToMaxContainer: undefined,
    componentId: undefined,
    componentName: "",
    componentCss: [],
    componentType: undefined,
    componentContentType: undefined,
    componentContent: undefined,
    componentFiles: undefined,
    componentChildren: undefined,
  }),
  actions: {
    setViewport(payload: number) {
      this.viewport = payload;
    },
    setComponentId(payload: string) {
      this.componentId = payload;
    },
    setComponentIsMaxContainer(payload: boolean) {
      this.componentIsMaxContainer = payload;
    },
    setComponentBackgroundToMaxContainer(payload: boolean) {
      this.limitBackgroundToMaxContainer = payload;
    },
    setComponentName(payload: string) {
      this.componentName = payload;
    },
    setComponentCss(payload) {
      this.componentCss = payload;
    },
    setComponentChildren(payload) {
      this.componentChildren = payload;
    },
    setComponentType(payload) {
      this.componentType = payload;
    },
    setComponentContentType(payload) {
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
        return entry;
      });
      this.componentCss[this.viewport] = newValue;
      this.saveCssClasses();
    },
    async deleteFile(filename) {
      try {
        console.log("delete file");
        const record = await pb.collection(this.componentType + "s").update(this.componentId, {
          "files-": [filename],
        });
        EventBus.emit("refresh");
        return record;
      } catch (err) {
        console.log("error saving componentContentType", err);
      }
    },
    async saveContentType(skipRefresh) {
      try {
        console.log("save componentContentType");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { type: this.componentContentType });
          if(!skipRefresh) EventBus.emit("refresh");
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
        EventBus.emit("refresh");
        return record;
      } catch (err) {
        console.log("error saving isMaxContainer", err);
      }
    },
    async saveLimitToMaxContainer() {
      try {
        console.log("save limitToMaxContainer");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { limitBackgroundToMaxContainer: this.limitBackgroundToMaxContainer });
        EventBus.emit("refresh");
        return record;
      } catch (err) {
        console.log("error saving limitBackgroundToMaxContainer", err);
      }
    },
    async saveComponentChildren() {
      try {
        console.log("save componentChildren");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { blocks: this.componentChildren.map((child) => child.id) });
        EventBus.emit("refresh");
        return record;
      } catch (err) {
        console.log("error saving componentChildren", err);
      }
    },
    async saveContent(skipRefresh) {
      try {
        console.log("save content");
        const record = await pb
          .collection(this.componentType + "s")
          .update(this.componentId, { content: this.componentContent });
        if(!skipRefresh) EventBus.emit("refresh");
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
