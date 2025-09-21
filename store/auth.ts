import { defineStore } from "pinia";
import { getPocketBase } from "~/lib/pocketbase";

export const useAuthStore = defineStore("authStore",{
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
      console.log('email',email);
      console.log('password',password);
      
      const pb = getPocketBase();
      const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
      
      if(!pb.authStore.isValid){
        throw 'Error loggin user in'
      }
      
      // Save the user and token in the store
      this.user = pb.authStore.model;
      this.token = pb.authStore.token;

      this.router.go(-1)
      // //setCookie
      // const cookie = useCookie("pocketbase_auth");
      // cookie.value = pb.authStore.token;
    },
    async refresh(){
      try{
        const pb = getPocketBase();
        if(process.client && pb.authStore.isValid){
          const authData = await pb.collection("users").authRefresh();
          if(pb.authStore.isValid){
            this.user = pb.authStore.model;
            this.token = pb.authStore.token;
          }
        }
      }catch(err){
        console.log('Auth refresh failed:', err);
        // If refresh fails, clear the auth state
        this.logout();
      }
    },
    logout() {
      console.log('logging out');
      if(process.client){
        const pb = getPocketBase();
        // Clear PocketBase auth store
        pb.authStore.clear();
        // Clear local storage
        window.localStorage.removeItem("pocketbase_auth");
        // Clear Pinia store
        this.user = null;
        this.token = null;
      }
    },
  },
});
