import { defineStore } from "pinia";
import { getPocketBase } from "~/lib/pocketbase";

export const useAuthStore = defineStore("authStore",{
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
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

      // Save auth state to localStorage
      if (process.client) {
        localStorage.setItem('pocketbase_auth', JSON.stringify({
          token: pb.authStore.token,
          model: pb.authStore.model
        }));
      }

      // Navigate back to previous page or home
      const router = useRouter();
      router.go(-1);
    },
    async refresh(){
      try{
        const pb = getPocketBase();
        if(process.client){
          // Check if we have a token in localStorage first
          const storedAuth = localStorage.getItem('pocketbase_auth');
          if(storedAuth){
            try {
              const authData = JSON.parse(storedAuth);
              pb.authStore.save(authData.token, authData.model);
              // Update store state
              this.user = pb.authStore.model;
              this.token = pb.authStore.token;
            } catch(e) {
              console.log('Failed to parse stored auth data');
            }
          }
          
          // Try to refresh if we have a valid token
          if(pb.authStore.isValid){
            const authData = await pb.collection("users").authRefresh();
            if(pb.authStore.isValid){
              this.user = pb.authStore.model;
              this.token = pb.authStore.token;
              // Update localStorage
              localStorage.setItem('pocketbase_auth', JSON.stringify({
                token: pb.authStore.token,
                model: pb.authStore.model
              }));
            }
          }
        }
      }catch(err: any){
        console.log('Auth refresh failed:', err);
        // Only logout if the token is actually invalid, not on network errors
        if(err.status === 400 || err.status === 401) {
          this.logout();
        }
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
        // Navigate to login page
        const router = useRouter();
        router.push('/login');
      }
    },
  },
});
