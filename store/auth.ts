import { defineStore } from "pinia";
const { pb } = usePocketbase();

export const useAuthStore = defineStore("authStore",{
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email: string, password: string) {
      console.log('email',email);
      console.log('password',password);
      
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

        if(process.client){
          const authData = await pb.collection("users").authRefresh();
          if(pb.authStore.isValid){
            this.user = pb.authStore.model;
            this.token = pb.authStore.token;
          }
          // console.log(pb.authStore.token);
          // console.log(pb.authStore.model.id);
        }
      }catch(err){
        
      }
    },
    logout() {
      console.log('logging out');
      if(process.client){
        window.localStorage.removeItem("pocketbase_auth");
        this.user = null;
        this.token = null;
      }
    },
  },
});
