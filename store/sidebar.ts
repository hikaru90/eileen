import { defineStore } from "pinia";
const { pb } = usePocketbase();

export const useSidebarStore = defineStore("sidebarStore",{
  state: () => ({
    componentName: '',
    componentData: {},
  }),
  actions: {
    setSidebarComponent(payload: string){
      this.componentName = payload
    },
    setSidebarData(payload: object){
      this.componentData = payload
    },
    async safelistDynamicClasses(){
      try{
        await fetch("/nuxtapi/saveTailwindClasses");
      }catch(err){
        console.log('error saving talwind classes from sidebarStore');
      }
    },
  },
});
